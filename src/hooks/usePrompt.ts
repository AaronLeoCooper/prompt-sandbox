import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback, useState } from "react";
import { OpenAIChatCompletion } from "../types";
import { isHtml, removeCodeFences, sanitiseHtml } from "../utils";

type PromptParams = {
  apiKey: string;
  projectId?: string;
};

type PromptReturn = {
  setPrompt: (prompt: string) => void;
  submitPrompt: () => void;
  prompt: string;
  response: string;
  loading: boolean;
  error?: string;
};

/**
 * Call OpenAI with the given prompt and return the response.
 */
export const usePrompt = ({
  apiKey,
  projectId,
}: PromptParams): PromptReturn => {
  const [prompt, setPrompt] = useLocalStorage("PromptSandbox_prompt", "");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const submitPrompt = useCallback(async () => {
    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "OpenAI-Organization": "org-9meuEnhXv3XCeb9GbqmPBUGs",
            ...(projectId ? { "OpenAI-Project": projectId } : {}),
          },
          body: JSON.stringify({
            model: "gpt-4-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are an expert in HTML and Tailwind CSS. You will respond to requests with pure HTML code, using Tailwind from a CDN for styling. Your responses should be pure HTML, not Markdown. If you can't answer the request with code, you may give the reason why with a concise sentence.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
          }),
        }
      );

      const data = (await response.json()) as OpenAIChatCompletion;
      const responseStr = removeCodeFences(data.choices[0].message.content);

      if (isHtml(responseStr)) {
        setResponse(sanitiseHtml(responseStr));
      } else {
        throw new Error(
          "The response did not contain pure HTML. Response: " + responseStr
        );
      }
    } catch (error: unknown) {
      const err = error as Error;

      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [apiKey, projectId, prompt]);

  return {
    setPrompt,
    submitPrompt,
    prompt,
    response,
    loading,
    error,
  };
};

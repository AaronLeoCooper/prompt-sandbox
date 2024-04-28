import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback, useState } from "react";
import { OpenAIChatCompletion, PromptConfig } from "../types";

type PromptParams = {
  apiKey: string;
  projectId?: string;
  promptConfig: PromptConfig;
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
  promptConfig,
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
            ...(projectId ? { "OpenAI-Project": projectId } : {}),
          },
          body: JSON.stringify({
            model: "gpt-4-turbo",
            messages: [
              {
                role: "system",
                content: promptConfig.systemPrompt,
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

      const formattedResponse = promptConfig.formatResponse(
        data.choices[0].message.content
      );
      setResponse(formattedResponse);
    } catch (error: unknown) {
      const err = error as Error;

      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [apiKey, projectId, prompt, promptConfig]);

  return {
    setPrompt,
    submitPrompt,
    prompt,
    response,
    loading,
    error,
  };
};

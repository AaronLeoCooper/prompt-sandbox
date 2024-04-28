import { FeatureConfig } from "./types";
import { isHtml, removeCodeFences, sanitiseHtml } from "./utils";

export const featureConfigs: FeatureConfig[] = [
  {
    title: "Designer",
    emoji: "🎨",
    urlPath: "designer",
    renderPreview: (response) => (
      <iframe
        className="flex-grow min-h-[20rem] border-2 border-slate-300"
        srcDoc={response}
      />
    ),
    promptConfig: {
      systemPrompt:
        "You are an expert in HTML and Tailwind CSS. You will respond to requests with pure HTML code, using Tailwind from a CDN for styling. Your responses should be pure HTML, not Markdown. If you can't answer the request with code, you may give the reason why with a concise sentence.",
      formatResponse: (response) => {
        const responseStr = removeCodeFences(response);

        if (isHtml(responseStr)) {
          return sanitiseHtml(responseStr);
        } else {
          throw new Error(
            "The response did not contain pure HTML. Response: " + responseStr
          );
        }
      },
    },
  },
];

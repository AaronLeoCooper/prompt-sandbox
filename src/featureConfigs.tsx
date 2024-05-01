import { FeatureConfig } from "./types";
import { removeCodeFences } from "./utils/formatters";
import { isHtml } from "./utils/validators";

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
        "Respond to all requests with pure HTML code beautifully styled with Tailwind classes. Include a CDN link for Tailwind. Do not include any descriptive language or markdown code fences in your responses. If you can't answer the request with code, you may give the reason why with a concise sentence.",
      formatResponse: async (response) => {
        const responseStr = removeCodeFences(response);

        const isValidHtml = await isHtml(responseStr);

        if (isValidHtml) {
          return responseStr;
        } else {
          throw new Error(
            "The response did not contain pure HTML. Response: " + responseStr
          );
        }
      },
    },
  },
];

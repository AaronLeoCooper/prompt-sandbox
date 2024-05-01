import { useLocalStorage } from "@uidotdev/usehooks";
import classNames from "classnames";
import { useState } from "react";
import { featureConfigs } from "./featureConfigs";
import { usePrompt } from "./hooks/usePrompt";
import { FeatureConfig } from "./types";

type AppProps = {
  featureConfig: FeatureConfig;
};

function App({ featureConfig }: AppProps) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [apiKey, setApiKey] = useLocalStorage("PromptSandbox_apiKey", "");
  const [resultsView, setResultsView] = useState<"preview" | "code">("preview");

  const { prompt, response, loading, error, setPrompt, submitPrompt } =
    usePrompt({ apiKey, promptConfig: featureConfig.promptConfig });

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-4 px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          🪣 Prompt Sandbox - {featureConfig.title}
        </h1>
        <div className="flex flex-row gap-2 items-center">
          {featureConfigs.map(({ title, urlPath, emoji }) => (
            <a
              key={title}
              href={`/${urlPath}`}
              title={title}
              className="text-xl inline-block"
            >
              {emoji}
            </a>
          ))}
          <button
            className="text-white ml-4"
            onClick={() => setSidebarVisible(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
      <div className="flex border-b-2">
        <textarea
          className="flex-grow h-32 p-4 bg-slate-50 resize-none"
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
          onClick={submitPrompt}
        >
          Submit
        </button>
      </div>
      <div className="py-4 px-4">
        <h2 className="text-xl mb-2">Results</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setResultsView("preview")}
            className={classNames(
              "bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4",
              {
                "bg-blue-700": resultsView === "preview",
              }
            )}
          >
            Preview
          </button>
          <button
            onClick={() => setResultsView("code")}
            className={classNames(
              "bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4",
              {
                "bg-blue-700": resultsView === "code",
              }
            )}
          >
            Code
          </button>
        </div>
      </div>
      {error && <div className="bg-red-200 py-2 px-4">{error}</div>}
      <div className="px-4 pb-4 flex flex-grow relative">
        {resultsView === "preview" && featureConfig.renderPreview(response)}
        {resultsView === "code" && (
          <pre className="flex-grow bg-slate-50 p-4 overflow-auto">
            <code>{response}</code>
          </pre>
        )}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-slate-100 animate-pulse">
            Loading...
          </div>
        )}
      </div>
      <div
        className={classNames(
          "fixed right-0 top-0 h-screen w-[20rem] px-4 py-5 flex flex-col gap-4 bg-slate-500",
          {
            hidden: !sidebarVisible,
          }
        )}
      >
        <div className="flex flex-row">
          <button
            className="text-white"
            onClick={() => setSidebarVisible(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col">
          <label htmlFor="apiKey" className="text-white mb-2">
            OpenAI API Key:
          </label>
          <input
            type="text"
            id="apiKey"
            placeholder="sk-proj-..."
            value={apiKey}
            className="p-2"
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

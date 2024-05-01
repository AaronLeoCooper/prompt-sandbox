export type OpenAIMessage = {
  role: string;
  content: string;
};

export type OpenAIChoice = {
  index: number;
  message: OpenAIMessage;
  logprobs: null;
  finish_reason: string;
};

export type OpenAIChatCompletion = {
  id: string;
  object: string;
  created: number;
  model: string;
  system_fingerprint: string;
  choices: OpenAIChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type PromptConfig = {
  systemPrompt: string;
  formatResponse: (response: string) => Promise<string>;
};

export type FeatureConfig = {
  title: string;
  emoji: string;
  urlPath: string;
  renderPreview: (response: string) => React.ReactNode;
  promptConfig: PromptConfig;
};

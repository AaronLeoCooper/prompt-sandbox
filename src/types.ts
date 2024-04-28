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

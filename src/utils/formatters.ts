export const removeCodeFences = (str: string): string =>
  str
    .replace(/^```html/, "")
    .replace(/```$/, "")
    .trim();

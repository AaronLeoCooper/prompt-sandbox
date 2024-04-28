import DOMPurify from "dompurify";

export const removeCodeFences = (str: string): string =>
  str.replace(/^```html/, "").replace(/```$/, "");

export const isHtml = (str: string): boolean => {
  const doc = new DOMParser().parseFromString(str, "text/html");
  return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
};

export const sanitiseHtml = (str: string): string => {
  return DOMPurify.sanitize(str, { USE_PROFILES: { html: true } });
};

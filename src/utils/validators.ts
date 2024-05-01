const validHtmlDocPrefixes = ["<!DOCTYPE html>", "<html>"];

export const isHtml = async (str: string): Promise<boolean> => {
  if (validHtmlDocPrefixes.some((prefix) => str.startsWith(prefix))) {
    return true;
  }

  const doc = new DOMParser().parseFromString(str, "text/html");
  return Array.from(doc.body.childNodes)[0]?.nodeType === 1;
};

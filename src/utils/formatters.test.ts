import { expect, test } from "vitest";
import { removeCodeFences } from "./formatters";

test("remove code fences from the beginning and end of a string", () => {
  const input = "```html\n<p>Hello, world!</p>\n```";
  const expectedOutput = "<p>Hello, world!</p>";

  const result = removeCodeFences(input);

  expect(result).toBe(expectedOutput);
});

test("does not remove code fences if they are not at the beginning and end of a string", () => {
  const input = "Some text ```html\n<p>Hello, world!</p>\n``` Some more text";
  const expectedOutput = input;

  const result = removeCodeFences(input);

  expect(result).toBe(expectedOutput);
});

test("handle empty strings", () => {
  const input = "";
  const expectedOutput = "";

  const result = removeCodeFences(input);

  expect(result).toBe(expectedOutput);
});

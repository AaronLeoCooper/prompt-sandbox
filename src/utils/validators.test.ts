import { expect, suite, test } from "vitest";
import { isHtml } from "./validators";

suite("isHtml", () => {
  test("returns true for strings containing a pure HTML fragment", async () => {
    const input = "<p>Hello, world!</p><div>Hello to you too!</div>";

    const result = await isHtml(input);

    expect(result).toBe(true);
  });

  test.each(["<!DOCTYPE html>", "<html>"])(
    "returns true for strings starting with %s",
    async (prefix) => {
      const input = `${prefix}I'm html apparently!`;

      const result = await isHtml(input);

      expect(result).toBe(true);
    }
  );

  test("returns false for strings not containing HTML tags", async () => {
    const input = "Hello, world!";

    const result = await isHtml(input);

    expect(result).toBe(false);
  });

  test("returns false for empty strings", async () => {
    const input = "";

    const result = await isHtml(input);

    expect(result).toBe(false);
  });

  test("returns false for markdown", async () => {
    const input = "Here is some HTML: ```html\n<p>Hello, world!</p>\n```";

    const result = await isHtml(input);

    expect(result).toBe(false);
  });
});

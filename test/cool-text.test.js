import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";

import { makeCool, styleText } from "../src/cool-text.js";
import { DEFAULT_CHARSET, FONTS } from "../src/fonts.js";

/** Re-parse the original PHP font table so the JS port can be diffed against it. */
function parsePhpFonts() {
  const php = readFileSync(new URL("../legacy/core/core.php", import.meta.url), "utf8");
  const lineRe = /^\s*'([a-z]+)'\s*=>\s*'((?:[^'\\]|\\.)*)',\s*$/gm;
  const fonts = {};
  let match;
  while ((match = lineRe.exec(php)) !== null) {
    fonts[match[1]] = match[2].replace(/\\'/g, "'");
  }
  return fonts;
}

describe("font tables", () => {
  test("default charset is 40 unique characters", () => {
    expect([...DEFAULT_CHARSET]).toHaveLength(40);
    expect(new Set(DEFAULT_CHARSET).size).toBe(40);
    expect(DEFAULT_CHARSET).toBe("abcdefghijklmnopqrstuvwxyz?*<>0123456789");
  });

  test("all 32 fonts from the PHP original are present", () => {
    expect(Object.keys(FONTS)).toHaveLength(32);
  });

  test("tables are byte-identical to legacy/core/core.php", () => {
    // Guards against accidental drift when the ported tables are edited.
    expect(FONTS).toEqual(parsePhpFonts());
  });

  test("known table quirks are preserved", () => {
    expect([...FONTS.scool]).toHaveLength(30); // no digit glyphs
    expect([...FONTS.balls]).toHaveLength(38); // 7 digit glyphs
    expect([...FONTS.oldo]).toHaveLength(41); // one unused trailing char
    expect([...FONTS.slam]).toHaveLength(41); // one unused trailing char
    expect([...FONTS.chiffres]).toHaveLength(40);
  });
});

describe("styleText", () => {
  test("maps characters positionally through a font", () => {
    expect(styleText("cat", FONTS.chiffres)).toBe("ćát");
    expect(styleText("cool", FONTS.cool)).toBe("¢øøŁ");
    expect(styleText("hax", FONTS.haxxor)).toBe("H4W");
  });

  test('styles "a" — the character PHP\'s strpos()/!$p bug dropped', () => {
    // In the PHP original every font left "a" untouched.
    expect(styleText("a", FONTS.chiffres)).toBe("á");
    expect(styleText("a", FONTS.cool)).toBe("Λ");
  });

  test("lower-cases input, like the original ajax.php did", () => {
    expect(styleText("CAT", FONTS.chiffres)).toBe("ćát");
  });

  test("passes unknown characters through unchanged", () => {
    expect(styleText("a b!", FONTS.chiffres)).toBe("á b!");
    expect(styleText("ÄÖÜ", FONTS.chiffres)).toBe("ÄÖÜ");
  });

  test("maps digits when the table has them", () => {
    expect(styleText("0123456789", FONTS.bigger)).toBe("0①②③④⑤⑥⑦⑧⑨");
  });

  test("keeps digits a short table cannot style (PHP deleted them)", () => {
    expect(styleText("123", FONTS.scool)).toBe("123");
    expect(styleText("789", FONTS.balls)).toBe(")89");
  });

  test("does not split astral characters such as emoji", () => {
    expect(styleText("a🎉b", FONTS.chiffres)).toBe("á🎉b");
    expect(styleText("🎉🎉", FONTS.cool)).toBe("🎉🎉");
  });
});

describe("makeCool", () => {
  test("returns one entry per font, ordered by name (PHP ksort)", () => {
    const result = makeCool("hello");
    expect(result).toHaveLength(32);
    expect(result.map((entry) => entry.name)).toEqual(Object.keys(FONTS).sort());
    for (const entry of result) {
      expect(Object.keys(entry).sort()).toEqual(["name", "text"]);
      expect(typeof entry.text).toBe("string");
    }
  });

  test("produces non-empty output for non-empty input", () => {
    const result = makeCool("hello");
    expect(result.every((entry) => entry.text.length > 0)).toBe(true);
  });

  test("empty input yields empty styled text", () => {
    expect(makeCool("").every((entry) => entry.text === "")).toBe(true);
  });

  test("coerces non-string input instead of throwing", () => {
    expect(makeCool(null)).toHaveLength(32);
    expect(makeCool(undefined)).toHaveLength(32);
    expect(makeCool(42)).toHaveLength(32);
    expect(makeCool(42).every((entry) => entry.text.length > 0)).toBe(true);
  });
});

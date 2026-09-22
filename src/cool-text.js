/**
 * Cool Text — pure styler logic.
 *
 * This module is a direct port of the PHP `CoolText::makeCool()` method from the
 * original project (see legacy/core/core.php) with the server round-trip removed:
 * the same character tables are applied to the same input, entirely in the browser.
 *
 * Behaviour differences from the PHP original (all deliberate bug fixes):
 *
 *  1. The letter "a" is now styled. PHP used `strpos($default, $char)` and then
 *     `if (!$p)`, and `strpos` returns `0` for the first character — so "a" was
 *     treated as "not found" and copied through untouched in every font.
 *  2. Characters past the end of a short font table (digits in "scool"/"balls")
 *     now pass through unchanged. PHP's `mb_substr` returned an empty string
 *     there, which silently deleted those characters from the output.
 */

import { DEFAULT_CHARSET, FONTS } from "./fonts.js";

/**
 * Apply a single font table to a string.
 *
 * Iterates by code point (not UTF-16 unit), so astral characters such as emoji
 * are never split in half.
 *
 * @param {string} text Text to stylize.
 * @param {string} font Replacement characters, positionally mapped over
 *   {@link DEFAULT_CHARSET}.
 * @returns {string} The styled text.
 */
export function styleText(text, font) {
  // ASCII-only lower-casing, exactly like PHP's byte-based strtolower(): a typed
  // "Ä" stays "Ä" instead of becoming "ä" the way JS toLowerCase() would.
  const source = String(text ?? "").replace(/[A-Z]/g, (char) => char.toLowerCase());

  let out = "";
  for (const char of source) {
    const index = DEFAULT_CHARSET.indexOf(char);
    // Unknown character, or past the end of this font's table: keep as-is.
    out += index === -1 || index >= font.length ? char : font[index];
  }
  return out;
}

/**
 * Stylize text with every available font.
 *
 * @param {string} text Text to stylize.
 * @returns {Array<{name: string, text: string}>} One entry per font, ordered by
 *   font name (matching PHP's `ksort`). Empty input yields empty styled text.
 */
export function makeCool(text) {
  const source = typeof text === "string" ? text : String(text ?? "");
  return Object.keys(FONTS)
    .sort()
    .map((name) => ({ name, text: styleText(source, FONTS[name]) }));
}

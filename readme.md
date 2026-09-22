<p align="center">
  <img src="preview.jpg" /><br>
  <b>Easy to use and basic.</b><br>
  Type text, get it back in 32 fancy Unicode fonts.<br>
  <b>v2: pure JavaScript — no PHP, no jQuery, no backend.</b>
</p>

# Cool Text

Cool Text stylizes whatever you type into 32 Unicode "fonts" (bold-ish glyphs,
fullwidth, circled, flipped, …) and lets you copy any variant with one click.

This repository is a **pure-JavaScript port** of the original PHP + jQuery app.
The original implementation is preserved untouched under [`legacy/`](legacy/) for
reference; the running app is now a static site built with [Vite](https://vite.dev)
and developed with [Bun](https://bun.sh).

## Run it

```bash
bun install       # or: npm install
bun run dev       # dev server → http://localhost:5173
bun test          # unit tests (bun test)
bun run build     # production build → dist/
bun run preview   # serve the production build
```

Any static file server works for `dist/` — there is no backend anymore.

## How it works

Every font is a positional mapping over the 40 characters
`a–z ? * < > 0–9` (see [`src/fonts.js`](src/fonts.js)): the Nth glyph of a font
replaces the Nth character of that charset, everything else passes through.

```
"cool" ──chiffres──▶ "ćőől"      "cool" ──haxxor──▶ "C00L"      "cool" ──flip──▶ "ɔoo1"
```

The whole pipeline is three small modules:

| File | Role |
| --- | --- |
| `src/fonts.js` | The 32 font tables, ported verbatim from `legacy/core/core.php` |
| `src/cool-text.js` | `makeCool(text)` — the styler, pure and DOM-free |
| `src/main.js` | Renders the grid, restyles on input, copy-to-clipboard |

## What changed from the PHP original

Functionality is the same; the plumbing is not. Beyond dropping jQuery, Clipboard.js,
AJAX and PHP, the port fixes three bugs that were in the original:

1. **The letter "a" was never styled.** PHP's `strpos()` returns `0` for the first
   character of the charset, and the original code tested `if (!$p)` — so `0` was
   read as "not found" and `a` was copied through untouched in every font.
2. **Digits were deleted in short font tables.** `mb_substr()` past the end of a
   table returns an empty string, so typing `7` in the `balls` font (or any digit in
   `scool`) made the character vanish. Out-of-range characters now pass through.
3. **Empty input cleared the main input box** (`$("input").val("")` selected every
   input on the page, not just the results).

Smaller improvements: restyling listens for `input` instead of `keyup` (paste, cut
and drag now work too), copying uses `navigator.clipboard` with an `execCommand`
fallback for non-secure contexts, all text is written via `.value`/`textContent`
(never `innerHTML`, so styled Unicode can't be parsed as markup), the grid renders
once on load instead of via a throwaway AJAX request, and each box shows its font
name on hover. Input is lower-cased ASCII-only, matching PHP's byte-based
`strtolower()` so non-ASCII characters are left as typed.

## Tests

`bun test` covers the styler — including a parity test that re-parses
`legacy/core/core.php` and asserts the ported tables are byte-identical, plus
regression tests for each bug above.

## License

MIT, as the original.

/**
 * Cool Text — browser UI.
 *
 * Port of the original jQuery implementation (legacy/assets/js/main.js) to plain
 * DOM APIs. What changed beyond dropping jQuery:
 *
 *  - No AJAX round-trip: styling happens locally via makeCool(), so the app is a
 *    static site with no backend.
 *  - Listens for "input" instead of "keyup", so paste/cut/drag also restyle.
 *  - Copy uses navigator.clipboard with an execCommand fallback for non-secure
 *    contexts (Clipboard.js is gone).
 *  - All text is set through .value / textContent — never innerHTML — so styled
 *    Unicode can never be interpreted as markup.
 */

import "./assets/css/normalize.css";
import "./assets/css/skeleton.css";
import "./assets/css/main.css";
import { makeCool } from "./cool-text.js";

/** How many style boxes per row, as in the original layout. */
const ROW_SIZE = 3;

/** @param {{name: string, text: string}} style */
function createStyleBox({ name, text }) {
  const box = document.createElement("div");
  box.className = "columns four style-box";

  const input = document.createElement("input");
  input.id = `style_${name}`;
  input.className = "u-full-width cutted";
  input.type = "text";
  input.readOnly = true;
  input.value = text;
  input.title = name; // hover to see which font this is

  const copy = document.createElement("button");
  copy.className = "copy";
  copy.type = "button";
  copy.textContent = "📝";
  copy.title = `Copy "${name}" style`;
  copy.addEventListener("click", () => void copyStyle(input, copy));

  box.append(input, copy);
  return box;
}

/** Build the full grid of style boxes once, empty. */
function renderGrid() {
  const result = document.getElementById("result");
  result.textContent = "";

  let row = null;
  makeCool("").forEach((style, index) => {
    if (index % ROW_SIZE === 0) {
      row = document.createElement("div");
      row.className = "row";
      result.append(row);
    }
    row.append(createStyleBox(style));
  });
}

/** Re-style the current input into every box. */
function updateStyles() {
  const text = document.getElementById("main").value;
  for (const { name, text: styled } of makeCool(text)) {
    const input = document.getElementById(`style_${name}`);
    if (input) input.value = styled;
  }
}

/** @returns {Promise<boolean>} whether the copy succeeded */
async function copyText(text) {
  if (window.navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied or non-secure context — fall through.
    }
  }
  // Legacy fallback (file://, plain http on a LAN IP, older browsers).
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("aria-hidden", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  return ok;
}

async function copyStyle(input, button) {
  if (!input.value) return;
  const ok = await copyText(input.value);
  const previous = button.textContent;
  button.textContent = ok ? "✓" : "✗";
  button.title = ok ? "Copied!" : "Copy failed";
  setTimeout(() => {
    button.textContent = previous;
    button.title = `Copy "${input.title}" style`;
  }, 1000);
}

// Module scripts are deferred, so the DOM is already parsed here.
renderGrid();
document.getElementById("main").addEventListener("input", updateStyles);

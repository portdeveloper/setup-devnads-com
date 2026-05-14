import type { ReactNode } from "react";

/**
 * Markdown-lite inline renderer used inside dictionary strings.
 * Recognises:
 *   `code`            -> <code style="color: var(--text)">code</code>
 *   [label](url)      -> <a href={url} target="_blank" rel="noreferrer">label</a>
 *
 * Anything else renders as plain text. Order-aware so the two patterns
 * compose freely.
 */
export function renderInline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < text.length) {
    const link = text.slice(i).match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (link) {
      out.push(
        <a
          key={key++}
          href={link[2]}
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--brand)" }}
          className="underline underline-offset-4"
        >
          {link[1]}
        </a>,
      );
      i += link[0].length;
      continue;
    }

    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1);
      if (end !== -1) {
        out.push(
          <code key={key++} style={{ color: "var(--brand-hi)" }}>
            {text.slice(i + 1, end)}
          </code>,
        );
        i = end + 1;
        continue;
      }
    }

    // Plain text up to the next `<` or `[`
    let next = text.length;
    const nb = text.indexOf("`", i);
    const nl = text.indexOf("[", i);
    if (nb !== -1) next = Math.min(next, nb);
    if (nl !== -1) next = Math.min(next, nl);
    out.push(text.slice(i, next));
    i = next;
  }

  return out;
}

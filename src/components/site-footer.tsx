import Link from "next/link";
import type { Dictionary } from "@/i18n/types";

export function SiteFooter({ dict }: { dict: Dictionary }) {
  return (
    <footer
      className="mt-24 border-t"
      style={{ background: "var(--bg)", borderColor: "var(--line)" }}
    >
      <div className="frame flex flex-col gap-3 px-6 py-8 text-[11px] md:flex-row md:items-center md:justify-between">
        <p
          className="font-mono uppercase tracking-[0.12em]"
          style={{ color: "var(--very-dim)" }}
        >
          {dict.footer.copyright}
        </p>
        <div className="flex gap-5">
          <Link
            href="https://github.com/portdeveloper/se2-workshop-windows-setup"
            target="_blank"
            rel="noreferrer"
            className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-[var(--text)]"
            style={{ color: "var(--dim)" }}
          >
            {dict.footer.workshopSetup}
          </Link>
          <Link
            href="https://github.com/portdeveloper/se2-monad-extension"
            target="_blank"
            rel="noreferrer"
            className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-[var(--text)]"
            style={{ color: "var(--dim)" }}
          >
            {dict.footer.monadExtension}
          </Link>
          <Link
            href="https://docs.monad.xyz"
            target="_blank"
            rel="noreferrer"
            className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-[var(--text)]"
            style={{ color: "var(--dim)" }}
          >
            {dict.footer.monadDocs}
          </Link>
        </div>
      </div>
    </footer>
  );
}

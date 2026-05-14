import Link from "next/link";

export function SiteFooter() {
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
          © 2026 devnads · For Monad workshops
        </p>
        <div className="flex gap-5">
          <Link
            href="https://github.com/portdeveloper/se2-workshop-windows-setup"
            target="_blank"
            rel="noreferrer"
            className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-[var(--text)]"
            style={{ color: "var(--dim)" }}
          >
            Workshop setup
          </Link>
          <Link
            href="https://github.com/portdeveloper/se2-monad-extension"
            target="_blank"
            rel="noreferrer"
            className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-[var(--text)]"
            style={{ color: "var(--dim)" }}
          >
            Monad extension
          </Link>
          <Link
            href="https://docs.monad.xyz"
            target="_blank"
            rel="noreferrer"
            className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-[var(--text)]"
            style={{ color: "var(--dim)" }}
          >
            Monad docs
          </Link>
        </div>
      </div>
    </footer>
  );
}

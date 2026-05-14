"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { OsTabs, type Os } from "@/components/os-tabs";
import { Accordion, AccordionItem } from "@/components/accordion";
import { SectionFrame } from "@/components/section-frame";
import { ONE_LINERS } from "@/lib/setup-data";

export function HomeFlow() {
  const [os, setOs] = useState<Os>("windows");
  const oneLiner = ONE_LINERS[os];

  return (
    <div className="frame">
      {/* HERO */}
      <SectionFrame className="px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <p
          className="mono-caps mb-6 text-[11px]"
          style={{ color: "var(--very-dim)" }}
        >
          Developer setup
        </p>
        <h1
          className="text-4xl md:text-5xl leading-[1.05] tracking-tight font-medium"
          style={{ color: "var(--text)" }}
        >
          Get your machine ready for Monad.
        </h1>
        <p
          className="mt-5 max-w-[640px] text-base md:text-lg"
          style={{ color: "var(--dim)" }}
        >
          Scaffold-ETH 2 (Foundry) workshops, pre-wired for{" "}
          <span style={{ color: "var(--text)" }}>Monad Testnet</span>. Pick your
          OS and run the one-liner. Under 10 minutes on a decent connection.
        </p>

        <div className="mt-10 flex flex-col gap-4 min-w-0">
          <OsTabs value={os} onChange={setOs} />
          <CodeBlock language={oneLiner.lang}>{oneLiner.code}</CodeBlock>
          <p
            className="mono-caps text-[10px]"
            style={{ color: "var(--very-dim)" }}
          >
            {oneLiner.caption}
          </p>
          {oneLiner.secondary && (
            <>
              <div className="h-2" />
              <CodeBlock language={oneLiner.secondary.lang}>
                {oneLiner.secondary.code}
              </CodeBlock>
              <p
                className="mono-caps text-[10px]"
                style={{ color: "var(--very-dim)" }}
              >
                {oneLiner.secondary.caption}
              </p>
            </>
          )}
        </div>
      </SectionFrame>

      {/* MANUAL CTA */}
      <SectionFrame className="px-6 py-10">
        <Link
          href={`/manual?os=${os}`}
          className="group flex items-center justify-between gap-4 -mx-6 px-6 py-4 transition-colors hover:bg-[var(--panel)]"
        >
          <div className="min-w-0">
            <p
              className="mono-caps text-[10px] mb-1.5"
              style={{ color: "var(--very-dim)" }}
            >
              Prefer step-by-step
            </p>
            <p className="text-base md:text-lg" style={{ color: "var(--text)" }}>
              See the manual install for {labelFor(os)}.
            </p>
          </div>
          <ArrowRight
            className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
            style={{ color: "var(--dim)" }}
          />
        </Link>
      </SectionFrame>

      {/* AFTER INSTALL */}
      <SectionFrame className="px-6 py-14">
        <p
          className="mono-caps mb-3 text-[11px]"
          style={{ color: "var(--very-dim)" }}
        >
          After the install finishes
        </p>
        <h2
          className="text-2xl md:text-3xl tracking-tight mb-5"
          style={{ color: "var(--text)" }}
        >
          Run these to start developing.
        </h2>
        <p
          className="text-sm leading-relaxed mb-6 max-w-[640px]"
          style={{ color: "var(--dim)" }}
        >
          Open three terminals from inside your project directory. The first
          spins up a local Anvil node, the second deploys your contracts to it,
          the third serves the dapp.
        </p>
        <CodeBlock language="bash">
          {`cd ~/my-monad-dapp
yarn chain      # terminal 1 (local Anvil)
yarn deploy     # terminal 2
yarn start      # terminal 3 (http://localhost:3000)`}
        </CodeBlock>
        <p
          className="mono-caps text-[10px] mt-3"
          style={{ color: "var(--very-dim)" }}
        >
          To deploy to Monad Testnet later: gh auth login, yarn deploy --network monadTestnet.
        </p>
      </SectionFrame>

      {/* TROUBLESHOOTING */}
      <SectionFrame className="px-6 py-14">
        <p
          className="mono-caps mb-3 text-[11px]"
          style={{ color: "var(--very-dim)" }}
        >
          Troubleshooting
        </p>
        <h2
          className="text-2xl md:text-3xl tracking-tight mb-8"
          style={{ color: "var(--text)" }}
        >
          When things go sideways.
        </h2>

        <Accordion>
          <AccordionItem title="wsl --install says &quot;feature not enabled&quot;">
            Hardware virtualization is disabled in BIOS. Reboot into BIOS/UEFI
            and enable <span style={{ color: "var(--text)" }}>Intel VT-x</span>{" "}
            or <span style={{ color: "var(--text)" }}>AMD-V</span> (sometimes
            labeled <span style={{ color: "var(--text)" }}>SVM</span>).
          </AccordionItem>

          <AccordionItem title="forge: command not found after install">
            Close and reopen your terminal. The Foundry installer appends to{" "}
            <code style={{ color: "var(--text)" }}>~/.bashrc</code>, which only
            applies to new shells.
          </AccordionItem>

          <AccordionItem title="yarn install fails with native build errors">
            <code style={{ color: "var(--text)" }}>node-gyp</code> needs Python
            and build tools. The bootstrap installs these; if you skipped it,
            run{" "}
            <code style={{ color: "var(--text)" }}>sudo apt install -y build-essential python3</code>{" "}
            (Linux/WSL) or{" "}
            <code style={{ color: "var(--text)" }}>xcode-select --install</code>{" "}
            (macOS) and retry.
          </AccordionItem>

          <AccordionItem title="create-eth: Git user.name is not configured">
            create-eth requires a Git identity before it&apos;ll scaffold. Run{" "}
            <code style={{ color: "var(--text)" }}>git config --global user.name &quot;Your Name&quot;</code>{" "}
            and{" "}
            <code style={{ color: "var(--text)" }}>git config --global user.email &quot;you@example.com&quot;</code>{" "}
            and try again.
          </AccordionItem>

          <AccordionItem title="localhost:3000 won't load in the Windows browser">
            Make sure <code style={{ color: "var(--text)" }}>yarn start</code>{" "}
            is actually running in Ubuntu. If it is, run{" "}
            <code style={{ color: "var(--text)" }}>wsl --shutdown</code> from
            PowerShell, reopen Ubuntu, and try again. WSL2 forwards localhost
            automatically. Windows Firewall can occasionally interfere on first
            run.
          </AccordionItem>

          <AccordionItem title="Files feel slow inside WSL">
            Keep your project under{" "}
            <code style={{ color: "var(--text)" }}>~/</code> inside WSL (e.g.{" "}
            <code style={{ color: "var(--text)" }}>/home/you/my-monad-dapp</code>),
            <em> not</em> under{" "}
            <code style={{ color: "var(--text)" }}>/mnt/c/...</code>.
            Cross-filesystem I/O is the #1 WSL performance pitfall.
          </AccordionItem>

          <AccordionItem title="I need MON to deploy to Monad Testnet">
            Get testnet MON from the official faucet linked in the{" "}
            <a
              href="https://docs.monad.xyz"
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--brand)" }}
              className="underline underline-offset-4"
            >
              Monad docs
            </a>
            . Then run{" "}
            <code style={{ color: "var(--text)" }}>yarn account:import</code> to
            load your deployer key, and{" "}
            <code style={{ color: "var(--text)" }}>yarn deploy --network monadTestnet</code>.
          </AccordionItem>
        </Accordion>
      </SectionFrame>

      {/* STILL STUCK */}
      <SectionFrame className="px-6 py-12">
        <p
          className="mono-caps mb-3 text-[11px]"
          style={{ color: "var(--very-dim)" }}
        >
          Still stuck
        </p>
        <p
          className="text-sm leading-relaxed max-w-[640px] mb-5"
          style={{ color: "var(--dim)" }}
        >
          Paste this page&apos;s URL into your AI coding agent (Claude, Cursor,
          ChatGPT) and ask. The model has every command and troubleshooting
          note in plain markup. Or DM{" "}
          <a
            href="https://t.me/portdev"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--brand)" }}
            className="underline underline-offset-4"
          >
            @portdev on Telegram
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-3">
          <CopyPageUrlButton />
          <a
            href="https://t.me/portdev"
            target="_blank"
            rel="noreferrer"
            className="mono-caps inline-flex items-center gap-1.5 text-[11px] px-4 py-2 border transition-colors hover:bg-[var(--panel)]"
            style={{ borderColor: "var(--line)", color: "var(--text)" }}
          >
            DM @portdev
          </a>
        </div>
      </SectionFrame>
    </div>
  );
}

function CopyPageUrlButton() {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard access denied; ignore
    }
  };
  return (
    <button
      type="button"
      onClick={onCopy}
      className="mono-caps inline-flex items-center gap-1.5 text-[11px] px-4 py-2 border transition-colors hover:bg-[var(--panel)]"
      style={{ borderColor: "var(--line)", color: "var(--text)" }}
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" /> Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> Copy page URL
        </>
      )}
    </button>
  );
}

function labelFor(os: Os) {
  return os === "windows" ? "Windows" : os === "mac" ? "macOS" : "Linux";
}

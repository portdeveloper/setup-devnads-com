"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { OsTabs, type Os } from "@/components/os-tabs";
import { Accordion, AccordionItem } from "@/components/accordion";
import { ONE_LINERS, RAW_BASE } from "@/lib/setup-data";

export function HomeFlow() {
  const [os, setOs] = useState<Os>("windows");
  const oneLiner = ONE_LINERS[os];

  return (
    <>
      {/* HERO */}
      <section
        className="frame border-b px-6 pt-16 pb-14 md:pt-24 md:pb-20"
        style={{ borderColor: "var(--line)" }}
      >
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
          OS and run the one-liner — under 10 minutes on a decent connection.
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
        </div>
      </section>

      {/* MANUAL CTA */}
      <section
        className="frame border-b px-6 py-10"
        style={{ borderColor: "var(--line)" }}
      >
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
      </section>

      {/* VERIFY */}
      <section
        className="frame border-b px-6 py-14"
        style={{ borderColor: "var(--line)" }}
      >
        <p
          className="mono-caps mb-3 text-[11px]"
          style={{ color: "var(--very-dim)" }}
        >
          Verify
        </p>
        <h2
          className="text-2xl md:text-3xl tracking-tight mb-5"
          style={{ color: "var(--text)" }}
        >
          Confirm your install in one command.
        </h2>
        <p
          className="text-sm leading-relaxed mb-6 max-w-[640px]"
          style={{ color: "var(--dim)" }}
        >
          Checks Node, Yarn, Foundry, the GitHub CLI, your git identity, and
          that the public Monad Testnet RPC is reachable. Exits non-zero if
          anything&apos;s missing.
        </p>
        <CodeBlock language="bash">
          {`curl -fsSL ${RAW_BASE}/verify.sh | bash`}
        </CodeBlock>
      </section>

      {/* TROUBLESHOOTING */}
      <section
        className="frame px-6 py-14"
        style={{ borderColor: "var(--line)" }}
      >
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
            automatically — Windows Firewall can occasionally interfere on first
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
      </section>
    </>
  );
}

function labelFor(os: Os) {
  return os === "windows" ? "Windows" : os === "mac" ? "macOS" : "Linux";
}

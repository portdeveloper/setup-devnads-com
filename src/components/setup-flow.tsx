"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { OsTabs, type Os } from "@/components/os-tabs";
import { Accordion, AccordionItem } from "@/components/accordion";

const EXTENSION = "portdeveloper/se2-monad-extension";

type Step = {
  num: string;
  title: string;
  body?: string;
  code?: string;
  lang?: string;
  note?: string;
};

const STEPS_WINDOWS: Step[] = [
  {
    num: "01",
    title: "Install WSL2 + Ubuntu",
    body:
      "Open PowerShell as Administrator and run the bootstrap. It enables WSL2, installs Ubuntu, and prompts you to reboot.",
    code: "irm https://raw.githubusercontent.com/portdeveloper/se2-workshop-windows-setup/main/windows-bootstrap.ps1 | iex",
    lang: "powershell",
    note: "After reboot, open Ubuntu from Start. Create a Linux username + password — these are separate from your Windows login.",
  },
  {
    num: "02",
    title: "Install the dev toolchain",
    body:
      "Inside Ubuntu, install Node LTS, Yarn, Foundry, and the GitHub CLI in one go.",
    code: "curl -fsSL https://raw.githubusercontent.com/portdeveloper/se2-workshop-windows-setup/main/wsl-bootstrap.sh | bash",
    note: "Close and reopen Ubuntu after this finishes so PATH picks up the new tools.",
  },
  {
    num: "03",
    title: "Configure git + GitHub",
    body:
      "create-eth requires a configured Git identity. GitHub CLI handles credentials for cloning + pushing.",
    code:
      'git config --global user.name  "Your Name"\ngit config --global user.email "you@example.com"\ngh auth login',
  },
  {
    num: "04",
    title: "Scaffold your dApp",
    body:
      "One command creates the project with Monad Testnet (chain 10143) pre-wired in foundry.toml and scaffold.config.ts.",
    code: `npx create-eth@latest my-monad-dapp -e ${EXTENSION}`,
  },
  {
    num: "05",
    title: "Run it",
    body: "Three terminals from inside ~/my-monad-dapp:",
    code: "yarn chain      # terminal 1 — local Anvil\nyarn deploy     # terminal 2\nyarn start      # terminal 3 — http://localhost:3000",
  },
];

const STEPS_UNIX: Step[] = [
  {
    num: "01",
    title: "Install Foundry",
    body: "Same installer works on macOS and Linux.",
    code: "curl -L https://foundry.paradigm.xyz | bash\nfoundryup",
    note: "Open a new shell after foundryup so forge / cast / anvil are on PATH.",
  },
  {
    num: "02",
    title: "Make sure Node 20+ and Yarn are available",
    body:
      "If Node is already installed, skip this. Otherwise install via nvm (works the same on macOS and Linux).",
    code:
      "curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash\nsource ~/.nvm/nvm.sh\nnvm install --lts\ncorepack enable",
  },
  {
    num: "03",
    title: "Configure git + GitHub",
    body: "create-eth needs a configured Git identity before it will scaffold.",
    code:
      'git config --global user.name  "Your Name"\ngit config --global user.email "you@example.com"',
  },
  {
    num: "04",
    title: "Scaffold your dApp",
    body:
      "One command creates the project with Monad Testnet (chain 10143) pre-wired in foundry.toml and scaffold.config.ts.",
    code: `npx create-eth@latest my-monad-dapp -e ${EXTENSION}`,
  },
  {
    num: "05",
    title: "Run it",
    body: "Three terminals from inside ./my-monad-dapp:",
    code: "yarn chain      # terminal 1 — local Anvil\nyarn deploy     # terminal 2\nyarn start      # terminal 3 — http://localhost:3000",
  },
];

const STEPS: Record<Os, Step[]> = {
  windows: STEPS_WINDOWS,
  mac: STEPS_UNIX,
  linux: STEPS_UNIX,
};

const ONE_LINERS: Record<Os, { lang: string; code: string; caption: string }> = {
  windows: {
    lang: "powershell",
    code: "irm https://raw.githubusercontent.com/portdeveloper/se2-workshop-windows-setup/main/windows-bootstrap.ps1 | iex",
    caption: "Run in an Administrator PowerShell.",
  },
  mac: {
    lang: "bash",
    code: `curl -L https://foundry.paradigm.xyz | bash && foundryup && npx create-eth@latest my-monad-dapp -e ${EXTENSION}`,
    caption: "Run in Terminal. Assumes Node 20+ is already installed.",
  },
  linux: {
    lang: "bash",
    code: `curl -fsSL https://raw.githubusercontent.com/portdeveloper/se2-workshop-windows-setup/main/wsl-bootstrap.sh | bash && npx create-eth@latest my-monad-dapp -e ${EXTENSION}`,
    caption: "Installs everything (Node + Foundry + gh) then scaffolds.",
  },
};

export function SetupFlow() {
  const [os, setOs] = useState<Os>("windows");
  const steps = STEPS[os];
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

        <div className="mt-10 flex flex-col gap-4">
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

      {/* STEPS */}
      <section
        className="frame px-6 py-14"
        style={{ borderColor: "var(--line)" }}
      >
        <header className="mb-10">
          <p
            className="mono-caps mb-3 text-[11px]"
            style={{ color: "var(--very-dim)" }}
          >
            Step by step
          </p>
          <h2
            className="text-2xl md:text-3xl tracking-tight"
            style={{ color: "var(--text)" }}
          >
            If you prefer to go one step at a time.
          </h2>
        </header>

        <ol className="flex flex-col gap-10">
          {steps.map((step) => (
            <li key={step.num} className="grid gap-4 md:grid-cols-[80px_1fr]">
              <div
                className="mono-caps text-[11px] pt-1"
                style={{ color: "var(--brand)" }}
              >
                {step.num} / {String(steps.length).padStart(2, "0")}
              </div>
              <div className="space-y-3 min-w-0">
                <h3
                  className="text-lg md:text-xl"
                  style={{ color: "var(--text)" }}
                >
                  {step.title}
                </h3>
                {step.body && (
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--dim)" }}
                  >
                    {step.body}
                  </p>
                )}
                {step.code && <CodeBlock language={step.lang}>{step.code}</CodeBlock>}
                {step.note && (
                  <p
                    className="text-xs leading-relaxed border-l-2 pl-3"
                    style={{ color: "var(--dim)", borderColor: "var(--line-hi)" }}
                  >
                    {step.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* VERIFY */}
      <section
        className="frame border-t px-6 py-14"
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
          {`curl -fsSL https://raw.githubusercontent.com/portdeveloper/se2-workshop-windows-setup/main/verify.sh | bash`}
        </CodeBlock>
      </section>

      {/* TROUBLESHOOTING */}
      <section
        className="frame border-t px-6 py-14"
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

          <AccordionItem title="forge: command not found after step 2">
            Close and reopen your terminal. The Foundry installer appends to{" "}
            <code style={{ color: "var(--text)" }}>~/.bashrc</code>, which only
            applies to new shells.
          </AccordionItem>

          <AccordionItem title="yarn install fails with native build errors">
            <code style={{ color: "var(--text)" }}>node-gyp</code> needs Python
            and build tools. The bootstrap installs these; if you skipped it,
            run <code style={{ color: "var(--text)" }}>sudo apt install -y build-essential python3</code>{" "}
            (Linux/WSL) or <code style={{ color: "var(--text)" }}>xcode-select --install</code>{" "}
            (macOS) and retry.
          </AccordionItem>

          <AccordionItem title="create-eth: Git user.name is not configured">
            create-eth requires a Git identity before it&apos;ll scaffold. Run{" "}
            <code style={{ color: "var(--text)" }}>git config --global user.name &quot;Your Name&quot;</code>{" "}
            and <code style={{ color: "var(--text)" }}>git config --global user.email &quot;you@example.com&quot;</code>{" "}
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

      {/* OUTRO */}
      <section
        className="frame border-t px-6 py-14"
        style={{ borderColor: "var(--line)" }}
      >
        <p
          className="text-sm leading-relaxed max-w-[640px]"
          style={{ color: "var(--dim)" }}
        >
          Built and tested in CI on every push.{" "}
          <a
            href="https://github.com/portdeveloper/se2-workshop-windows-setup"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-4"
            style={{ color: "var(--brand)" }}
          >
            Inspect the scripts <ArrowRight className="h-3 w-3" />
          </a>
        </p>
      </section>
    </>
  );
}

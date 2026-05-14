import type { Os } from "@/components/os-tabs";

export const EXTENSION = "portdeveloper/se2-monad-extension";
export const SETUP_REPO = "portdeveloper/se2-workshop-windows-setup";
export const RAW_BASE = `https://raw.githubusercontent.com/${SETUP_REPO}/main`;

export type Step = {
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
    code: `irm ${RAW_BASE}/windows-bootstrap.ps1 | iex`,
    lang: "powershell",
    note: "After reboot, open Ubuntu from Start. Create a Linux username + password. These are separate from your Windows login.",
  },
  {
    num: "02",
    title: "Install the dev toolchain",
    body:
      "Inside Ubuntu, install Node LTS, Yarn, Foundry, and the GitHub CLI in one go.",
    code: `bash -c "$(curl -fsSL ${RAW_BASE}/wsl-bootstrap.sh)"`,
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
    code: "yarn chain      # terminal 1 (local Anvil)\nyarn deploy     # terminal 2\nyarn start      # terminal 3 (http://localhost:3000)",
  },
];

const STEPS_UNIX: Step[] = [
  {
    num: "01",
    title: "Install Foundry",
    body: "Same installer works on macOS and Linux.",
    code:
      'curl -L https://foundry.paradigm.xyz | bash\nexport PATH="$HOME/.foundry/bin:$PATH"\nfoundryup',
    note: "The export keeps Foundry on PATH for the current shell. Next shells pick it up from your rc files automatically.",
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
    code: "yarn chain      # terminal 1 (local Anvil)\nyarn deploy     # terminal 2\nyarn start      # terminal 3 (http://localhost:3000)",
  },
];

export const STEPS: Record<Os, Step[]> = {
  windows: STEPS_WINDOWS,
  mac: STEPS_UNIX,
  linux: STEPS_UNIX,
};

export const ONE_LINERS: Record<
  Os,
  {
    lang: string;
    code: string;
    caption: string;
    secondary?: { lang: string; code: string; caption: string };
  }
> = {
  windows: {
    lang: "powershell",
    code: `irm ${RAW_BASE}/windows-bootstrap.ps1 | iex`,
    caption:
      "Step 1, in Administrator PowerShell. Installs WSL2 + Ubuntu, then prompts to reboot.",
    secondary: {
      lang: "bash",
      code: `bash -c "$(curl -fsSL ${RAW_BASE}/wsl-bootstrap.sh)"`,
      caption:
        "Step 2, inside Ubuntu after reboot. Installs the toolchain, asks for your git identity, and scaffolds the dapp.",
    },
  },
  mac: {
    lang: "bash",
    code: `bash -c "$(curl -fsSL ${RAW_BASE}/mac-bootstrap.sh)"`,
    caption:
      "Run in Terminal. Installs Foundry + Node LTS, asks for your git identity, and scaffolds the dapp.",
  },
  linux: {
    lang: "bash",
    code: `bash -c "$(curl -fsSL ${RAW_BASE}/wsl-bootstrap.sh)"`,
    caption:
      "Run in your terminal. Installs the toolchain, asks for your git identity, and scaffolds the dapp.",
  },
};

export function isOs(value: string | null | undefined): value is Os {
  return value === "windows" || value === "mac" || value === "linux";
}

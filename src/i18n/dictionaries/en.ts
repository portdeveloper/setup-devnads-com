import type { Dictionary } from "../types";

const EXTENSION = "portdeveloper/se2-monad-extension";
const RAW_BASE =
  "https://raw.githubusercontent.com/portdeveloper/se2-workshop-windows-setup/main";

export const en: Dictionary = {
  meta: {
    title: "Set up your Monad dev environment",
    description:
      "One-command setup for Scaffold-ETH 2 (Foundry) workshops, pre-wired for Monad Testnet. Windows, macOS, and Linux.",
  },
  header: {
    wordmark: "devnads / setup",
    repo: "Repo",
    githubAria: "GitHub",
  },
  hero: {
    eyebrow: "Developer setup",
    title: "Get your machine ready for Monad.",
    bodyBefore: "Scaffold-ETH 2 (Foundry) workshops, pre-wired for ",
    bodyHighlight: "Monad Testnet",
    bodyAfter:
      ". Pick your OS and run the one-liner. Under 10 minutes on a decent connection.",
  },
  manualCta: {
    eyebrow: "Prefer step-by-step",
    template: "See the manual install for {os}.",
  },
  afterInstall: {
    eyebrow: "After the install finishes",
    title: "Run these to start developing.",
    body:
      "Open three terminals from inside your project directory. The first spins up a local Anvil node, the second deploys your contracts to it, the third serves the dapp.",
    note:
      "To deploy to Monad Testnet later: gh auth login, yarn deploy --network monadTestnet.",
  },
  faucet: {
    eyebrow: "Monad Testnet faucet",
    title: "Grab some MON to deploy with.",
    body:
      "Drop in your wallet address and we'll send testnet MON straight to it. Rate-limited per address and per IP.",
    placeholder: "0xYourWalletAddress",
    button: "Drip MON",
    sending: "Sending",
    successTitle: "MON dripped to your address.",
    invalidAddress:
      "That doesn't look like a valid 0x address (40 hex chars).",
    networkError: "Network error.",
    fallbackError: "Faucet returned {status}.",
  },
  troubleshooting: {
    eyebrow: "Troubleshooting",
    title: "When things go sideways.",
    items: {
      wsl: {
        title: 'wsl --install says "feature not enabled"',
        body:
          "Hardware virtualization is disabled in BIOS. Reboot into BIOS/UEFI and enable `Intel VT-x` or `AMD-V` (sometimes labeled `SVM`).",
      },
      forge: {
        title: "forge: command not found after install",
        body:
          "Close and reopen your terminal. The Foundry installer appends to `~/.bashrc`, which only applies to new shells.",
      },
      nodeGyp: {
        title: "yarn install fails with native build errors",
        body:
          "`node-gyp` needs Python and build tools. The bootstrap installs these; if you skipped it, run `sudo apt install -y build-essential python3` (Linux/WSL) or `xcode-select --install` (macOS) and retry.",
      },
      gitConfig: {
        title: "create-eth: Git user.name is not configured",
        body:
          "create-eth requires a Git identity before it'll scaffold. Run `git config --global user.name \"Your Name\"` and `git config --global user.email \"you@example.com\"` and try again.",
      },
      localhost: {
        title: "localhost:3000 won't load in the Windows browser",
        body:
          "Make sure `yarn start` is actually running in Ubuntu. If it is, run `wsl --shutdown` from PowerShell, reopen Ubuntu, and try again. WSL2 forwards localhost automatically. Windows Firewall can occasionally interfere on first run.",
      },
      slow: {
        title: "Files feel slow inside WSL",
        body:
          "Keep your project under `~/` inside WSL (e.g. `/home/you/my-monad-dapp`), not under `/mnt/c/...`. Cross-filesystem I/O is the #1 WSL performance pitfall.",
      },
      mon: {
        title: "I need MON to deploy to Monad Testnet",
        body:
          "Use the faucet card above, or get testnet MON from the official faucet linked in the [Monad docs](https://docs.monad.xyz). Then run `yarn account:import` to load your deployer key, and `yarn deploy --network monadTestnet`.",
      },
    },
  },
  stillStuck: {
    eyebrow: "Still stuck",
    body:
      "Paste this page's URL into your AI coding agent (Claude, Cursor, ChatGPT) and ask. The model has every command and troubleshooting note in plain markup. Or DM [@portdev on Telegram](https://t.me/portdev).",
    copyButton: "Copy page URL",
    copiedButton: "Copied",
    dmButton: "DM @portdev",
  },
  manual: {
    metaTitle: "Manual install · setup.devnads.com",
    back: "Back",
    eyebrow: "Manual install",
    title: "One step at a time.",
    body:
      "Same outcome as the one-liner on the home page, just broken out so you can see what every command does and stop after any step.",
    done: "Done? ",
    doneLink: "Back to the one-line setup",
  },
  codeBlock: { copy: "Copy", copied: "Copied" },
  os: { windows: "Windows", mac: "macOS", linux: "Linux" },
  langSwitch: { aria: "Language" },
  footer: {
    copyright: "© 2026 devnads · For Monad workshops",
    workshopSetup: "Workshop setup",
    monadExtension: "Monad extension",
    monadDocs: "Monad docs",
  },
  oneLiners: {
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
  },
  steps: {
    windows: [
      {
        num: "01",
        title: "Install WSL2 + Ubuntu",
        body:
          "Open PowerShell as Administrator and run the bootstrap. It enables WSL2, installs Ubuntu, and prompts you to reboot.",
        code: `irm ${RAW_BASE}/windows-bootstrap.ps1 | iex`,
        lang: "powershell",
        note:
          "After reboot, open Ubuntu from Start. Create a Linux username + password. These are separate from your Windows login.",
      },
      {
        num: "02",
        title: "Install the dev toolchain",
        body:
          "Inside Ubuntu, install Node LTS, Yarn, Foundry, and the GitHub CLI in one go.",
        code: `bash -c "$(curl -fsSL ${RAW_BASE}/wsl-bootstrap.sh)"`,
        note:
          "Close and reopen Ubuntu after this finishes so PATH picks up the new tools.",
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
        code:
          "yarn chain      # terminal 1 (local Anvil)\nyarn deploy     # terminal 2\nyarn start      # terminal 3 (http://localhost:3000)",
      },
    ],
    mac: [
      {
        num: "01",
        title: "Install Foundry",
        body: "Same installer works on macOS and Linux.",
        code:
          'curl -L https://foundry.paradigm.xyz | bash\nexport PATH="$HOME/.foundry/bin:$PATH"\nfoundryup',
        note:
          "The export keeps Foundry on PATH for the current shell. Next shells pick it up from your rc files automatically.",
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
        code:
          "yarn chain      # terminal 1 (local Anvil)\nyarn deploy     # terminal 2\nyarn start      # terminal 3 (http://localhost:3000)",
      },
    ],
    // Linux uses the same step list as Mac for the manual flow.
    linux: [],
  },
};
en.steps.linux = en.steps.mac;

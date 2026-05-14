// Dictionary shape. Plain strings only. Inline `code`-spans and [label](url)
// links are written into the strings and parsed by renderInline() at render
// time. Keep new locales structurally identical to en.

import type { Os } from "@/components/os-tabs";

export type OneLinerCopy = {
  lang: string;
  code: string;
  caption: string;
  secondary?: { lang: string; code: string; caption: string };
};

export type StepCopy = {
  num: string;
  title: string;
  body?: string;
  code?: string;
  lang?: string;
  note?: string;
};

export type TroubleItem = { title: string; body: string };

export type Dictionary = {
  meta: { title: string; description: string };
  header: { wordmark: string; repo: string; githubAria: string };
  hero: {
    eyebrow: string;
    title: string;
    bodyBefore: string;
    bodyHighlight: string;
    bodyAfter: string;
  };
  // `template` uses {os} placeholder, replaced at render time.
  manualCta: { eyebrow: string; template: string };
  afterInstall: {
    eyebrow: string;
    title: string;
    body: string;
    note: string;
  };
  faucet: {
    eyebrow: string;
    title: string;
    body: string;
    placeholder: string;
    button: string;
    sending: string;
    successTitle: string;
    invalidAddress: string;
    networkError: string;
    // `{status}` placeholder, replaced at render time.
    fallbackError: string;
  };
  troubleshooting: {
    eyebrow: string;
    title: string;
    items: {
      wsl: TroubleItem;
      forge: TroubleItem;
      nodeGyp: TroubleItem;
      gitConfig: TroubleItem;
      localhost: TroubleItem;
      slow: TroubleItem;
      mon: TroubleItem;
    };
  };
  stillStuck: {
    eyebrow: string;
    body: string;
    copyButton: string;
    copiedButton: string;
    dmButton: string;
  };
  manual: {
    metaTitle: string;
    back: string;
    eyebrow: string;
    title: string;
    body: string;
    done: string;
    doneLink: string;
  };
  codeBlock: { copy: string; copied: string };
  os: Record<Os, string>;
  langSwitch: { aria: string };
  footer: {
    copyright: string;
    workshopSetup: string;
    monadExtension: string;
    monadDocs: string;
  };
  steps: Record<Os, StepCopy[]>;
  oneLiners: Record<Os, OneLinerCopy>;
};

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Copy } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { OsTabs, type Os } from "@/components/os-tabs";
import { Accordion, AccordionItem } from "@/components/accordion";
import { SectionFrame } from "@/components/section-frame";
import { FaucetCard } from "@/components/faucet-card";
import { renderInline } from "@/i18n/render-inline";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export function HomeFlow({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [os, setOs] = useState<Os>("windows");
  const oneLiner = dict.oneLiners[os];

  const cb = { copyLabel: dict.codeBlock.copy, copiedLabel: dict.codeBlock.copied };

  return (
    <div className="frame">
      {/* HERO */}
      <SectionFrame className="px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="mono-caps mb-6 text-[11px]" style={{ color: "var(--very-dim)" }}>
          {dict.hero.eyebrow}
        </p>
        <h1
          className="text-4xl md:text-5xl leading-[1.05] tracking-tight font-medium"
          style={{ color: "var(--text)" }}
        >
          {dict.hero.title}
        </h1>
        <p className="mt-5 max-w-[640px] text-base md:text-lg" style={{ color: "var(--dim)" }}>
          {dict.hero.bodyBefore}
          <span style={{ color: "var(--text)" }}>{dict.hero.bodyHighlight}</span>
          {dict.hero.bodyAfter}
        </p>

        <div className="mt-10 flex flex-col gap-4 min-w-0">
          <OsTabs value={os} onChange={setOs} labels={dict.os} />
          <CodeBlock language={oneLiner.lang} {...cb}>{oneLiner.code}</CodeBlock>
          <p className="mono-caps text-[10px]" style={{ color: "var(--very-dim)" }}>
            {oneLiner.caption}
          </p>
          {oneLiner.secondary && (
            <>
              <div className="h-2" />
              <CodeBlock language={oneLiner.secondary.lang} {...cb}>
                {oneLiner.secondary.code}
              </CodeBlock>
              <p className="mono-caps text-[10px]" style={{ color: "var(--very-dim)" }}>
                {oneLiner.secondary.caption}
              </p>
            </>
          )}
        </div>
      </SectionFrame>

      {/* MANUAL CTA */}
      <SectionFrame className="px-6 py-10">
        <Link
          href={`/${locale}/manual?os=${os}`}
          className="group flex items-center justify-between gap-4 -mx-6 px-6 py-4 transition-colors hover:bg-[var(--panel)]"
        >
          <div className="min-w-0">
            <p className="mono-caps text-[10px] mb-1.5" style={{ color: "var(--very-dim)" }}>
              {dict.manualCta.eyebrow}
            </p>
            <p className="text-base md:text-lg" style={{ color: "var(--text)" }}>
              {dict.manualCta.template.replace("{os}", dict.os[os])}
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
        <p className="mono-caps mb-3 text-[11px]" style={{ color: "var(--very-dim)" }}>
          {dict.afterInstall.eyebrow}
        </p>
        <h2 className="text-2xl md:text-3xl tracking-tight mb-5" style={{ color: "var(--text)" }}>
          {dict.afterInstall.title}
        </h2>
        <p className="text-sm leading-relaxed mb-6 max-w-[640px]" style={{ color: "var(--dim)" }}>
          {dict.afterInstall.body}
        </p>
        <CodeBlock language="bash" {...cb}>
          {`cd ~/my-monad-dapp
yarn chain      # terminal 1 (local Anvil)
yarn deploy     # terminal 2
yarn start      # terminal 3 (http://localhost:3000)`}
        </CodeBlock>
        <p className="mono-caps text-[10px] mt-3" style={{ color: "var(--very-dim)" }}>
          {dict.afterInstall.note}
        </p>
      </SectionFrame>

      {/* FAUCET */}
      <SectionFrame className="px-6 py-14">
        <p className="mono-caps mb-3 text-[11px]" style={{ color: "var(--very-dim)" }}>
          {dict.faucet.eyebrow}
        </p>
        <h2 className="text-2xl md:text-3xl tracking-tight mb-5" style={{ color: "var(--text)" }}>
          {dict.faucet.title}
        </h2>
        <p className="text-sm leading-relaxed mb-6 max-w-[640px]" style={{ color: "var(--dim)" }}>
          {dict.faucet.body}
        </p>
        <FaucetCard
          labels={{
            placeholder: dict.faucet.placeholder,
            button: dict.faucet.button,
            sending: dict.faucet.sending,
            successTitle: dict.faucet.successTitle,
            invalidAddress: dict.faucet.invalidAddress,
            networkError: dict.faucet.networkError,
            fallbackError: dict.faucet.fallbackError,
          }}
        />
      </SectionFrame>

      {/* TROUBLESHOOTING */}
      <SectionFrame className="px-6 py-14">
        <p className="mono-caps mb-3 text-[11px]" style={{ color: "var(--very-dim)" }}>
          {dict.troubleshooting.eyebrow}
        </p>
        <h2 className="text-2xl md:text-3xl tracking-tight mb-8" style={{ color: "var(--text)" }}>
          {dict.troubleshooting.title}
        </h2>
        <Accordion>
          {Object.entries(dict.troubleshooting.items).map(([key, item]) => (
            <AccordionItem key={key} title={item.title}>
              {renderInline(item.body)}
            </AccordionItem>
          ))}
        </Accordion>
      </SectionFrame>

      {/* STILL STUCK */}
      <SectionFrame className="px-6 py-12">
        <p className="mono-caps mb-3 text-[11px]" style={{ color: "var(--very-dim)" }}>
          {dict.stillStuck.eyebrow}
        </p>
        <p className="text-sm leading-relaxed max-w-[640px] mb-5" style={{ color: "var(--dim)" }}>
          {renderInline(dict.stillStuck.body)}
        </p>
        <div className="flex flex-wrap gap-3">
          <CopyPageUrlButton
            copyLabel={dict.stillStuck.copyButton}
            copiedLabel={dict.stillStuck.copiedButton}
          />
          <a
            href="https://t.me/portdev"
            target="_blank"
            rel="noreferrer"
            className="mono-caps inline-flex items-center gap-1.5 text-[11px] px-4 py-2 border transition-colors hover:bg-[var(--panel)]"
            style={{ borderColor: "var(--line)", color: "var(--text)" }}
          >
            {dict.stillStuck.dmButton}
          </a>
        </div>
      </SectionFrame>
    </div>
  );
}

function CopyPageUrlButton({
  copyLabel,
  copiedLabel,
}: {
  copyLabel: string;
  copiedLabel: string;
}) {
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
          <Check className="h-3 w-3" /> {copiedLabel}
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" /> {copyLabel}
        </>
      )}
    </button>
  );
}

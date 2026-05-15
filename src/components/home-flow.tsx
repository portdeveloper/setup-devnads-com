"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Check, Copy, ExternalLink } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { OsTabs, type Os } from "@/components/os-tabs";
import { Accordion, AccordionItem } from "@/components/accordion";
import { SectionFrame } from "@/components/section-frame";
import { FaucetCard } from "@/components/faucet-card";
import { renderInline } from "@/i18n/render-inline";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

const PAGE_URL = "https://setup.devnads.com";

const STEP_NUM_COLORS = [
  "var(--brand)",
  "var(--info)",
  "var(--ok)",
  "var(--warn)",
  "var(--destructive)",
];

export function HomeFlow({
  dict,
  locale: _locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const [os, setOs] = useState<Os>("windows");
  const steps = dict.steps[os];
  const totalSteps = String(steps.length).padStart(2, "0");

  const cb = { copyLabel: dict.codeBlock.copy, copiedLabel: dict.codeBlock.copied };

  const aiPrompt = `Walk me through this Monad workshop setup page and help me when I get stuck: ${PAGE_URL}`;
  const encoded = encodeURIComponent(aiPrompt);
  // chat.openai.com 308s to chatgpt.com but the redirect drops the
  // user out of the composer-prefill flow; hit chatgpt.com directly
  // with hints=search so the prompt is treated as a question.
  // Gemini intentionally has no button: it ignores ?q= prefill on
  // cross-site link clicks, so the "Copy page URL" button is the
  // honest path for Gemini and any other AI not listed here.
  const chatgptUrl = `https://chatgpt.com/?hints=search&q=${encoded}`;
  const claudeUrl = `https://claude.ai/new?q=${encoded}`;

  return (
    <div className="frame">
      {/* HERO */}
      <SectionFrame className="px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-12">
          <div className="min-w-0">
            <h1
              className="text-4xl md:text-5xl leading-[1.05] tracking-tight font-medium"
              style={{ color: "var(--text)" }}
            >
              {dict.hero.title}
            </h1>
            <p
              className="mt-5 max-w-[640px] text-base md:text-lg"
              style={{ color: "var(--dim)" }}
            >
              {dict.hero.body}
            </p>
            <div className="mt-10">
              <OsTabs value={os} onChange={setOs} labels={dict.os} />
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-center">
            <div
              className="p-3 border"
              style={{ background: "var(--panel)", borderColor: "var(--line)" }}
              aria-label={PAGE_URL}
            >
              <QRCode
                value={PAGE_URL}
                size={360}
                bgColor="#ffffff"
                fgColor="#16161b"
                level="M"
              />
            </div>
            <p
              className="mono-caps text-[10px]"
              style={{ color: "var(--very-dim)" }}
            >
              setup.devnads.com
            </p>
          </div>
        </div>
      </SectionFrame>

      {/* STEPS — the main path, one SectionFrame per step */}
      {steps.map((step, i) => (
        <SectionFrame key={step.num} className="px-6 py-12 md:py-14">
          <div className="grid gap-6 md:grid-cols-[140px_1fr] md:gap-10">
            <div>
              <div
                className="mono-caps leading-none text-5xl md:text-6xl"
                style={{ color: STEP_NUM_COLORS[i] ?? "var(--brand)" }}
              >
                {step.num}
              </div>
              <p className="mono-caps mt-3 text-[10px]" style={{ color: "var(--very-dim)" }}>
                of {totalSteps}
              </p>
            </div>
            <div className="space-y-5 min-w-0">
              <h3
                className="text-2xl md:text-3xl tracking-tight font-medium"
                style={{ color: "var(--text)" }}
              >
                {step.title}
              </h3>
              {step.body && (
                <p
                  className="text-base md:text-lg leading-relaxed max-w-[640px]"
                  style={{ color: "var(--text)" }}
                >
                  {renderInline(step.body)}
                </p>
              )}
              {step.code &&
                (Array.isArray(step.code) ? step.code : [step.code]).map((c, j) => (
                  <CodeBlock key={j} language={step.lang} {...cb}>
                    {c}
                  </CodeBlock>
                ))}
              {step.screenshots?.length ? (
                <div className="flex flex-col gap-3">
                  {step.screenshots.map((sc, j) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={j}
                      src={sc.src}
                      alt={sc.alt}
                      loading="lazy"
                      className="w-full h-auto border"
                      style={{ borderColor: "var(--line)" }}
                    />
                  ))}
                </div>
              ) : null}
              {step.note && (
                <p
                  className="text-sm leading-relaxed border-l-2 pl-3"
                  style={{ color: "var(--dim)", borderColor: "var(--warn)" }}
                >
                  {renderInline(step.note)}
                </p>
              )}
            </div>
          </div>
        </SectionFrame>
      ))}

      {/* FAUCET */}
      <SectionFrame className="px-6 py-14">
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
        <p className="text-sm leading-relaxed max-w-[640px] mb-5" style={{ color: "var(--dim)" }}>
          {renderInline(dict.stillStuck.body)}
        </p>
        <div className="flex flex-wrap gap-3">
          <AskAiButton brand="ChatGPT" href={chatgptUrl} prompt={aiPrompt} />
          <AskAiButton brand="Claude" href={claudeUrl} prompt={aiPrompt} />
          <CopyPageUrlButton
            copyLabel={dict.stillStuck.copyButton}
            copiedLabel={dict.stillStuck.copiedButton}
          />
          <a
            href="https://t.me/portdev"
            target="_blank"
            rel="noreferrer"
            className="mono-caps inline-flex items-center gap-1.5 text-[11px] px-4 py-2 border transition-colors hover:bg-[var(--panel-hi)]"
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
      className="mono-caps inline-flex items-center gap-1.5 text-[11px] px-4 py-2 border transition-colors hover:bg-[var(--panel-hi)]"
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

function AskAiButton({
  brand,
  href,
  prompt,
}: {
  brand: string;
  href: string;
  prompt: string;
}) {
  const [copied, setCopied] = useState(false);
  const onClick = () => {
    // Side-effect only: copy the prompt as a fallback. The anchor's
    // default click handles navigation, which is more reliable than
    // window.open for cross-site AI prefill.
    navigator.clipboard.writeText(prompt).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={onClick}
      className="mono-caps inline-flex items-center gap-1.5 text-[11px] px-4 py-2 border transition-colors hover:bg-[var(--panel-hi)]"
      style={{ borderColor: "var(--line)", color: "var(--text)" }}
    >
      {brand} {copied ? <Check className="h-3 w-3" /> : <ExternalLink className="h-3 w-3" />}
    </a>
  );
}

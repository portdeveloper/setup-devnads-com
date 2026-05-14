"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { OsTabs, type Os } from "@/components/os-tabs";
import { SectionFrame } from "@/components/section-frame";
import { STEPS, isOs } from "@/lib/setup-data";

function ManualFlowInner() {
  const search = useSearchParams();
  const paramOs = search.get("os");
  const [os, setOs] = useState<Os>(isOs(paramOs) ? paramOs : "windows");
  const steps = STEPS[os];

  return (
    <div className="frame">
      <SectionFrame className="px-6 pt-16 pb-12 md:pt-20 md:pb-14">
        <Link
          href="/"
          className="mono-caps inline-flex items-center gap-1.5 text-[11px] mb-6 transition-colors hover:text-[var(--text)]"
          style={{ color: "var(--dim)" }}
        >
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>
        <p
          className="mono-caps mb-6 text-[11px]"
          style={{ color: "var(--very-dim)" }}
        >
          Manual install
        </p>
        <h1
          className="text-4xl md:text-5xl leading-[1.05] tracking-tight font-medium"
          style={{ color: "var(--text)" }}
        >
          One step at a time.
        </h1>
        <p
          className="mt-5 max-w-[640px] text-base md:text-lg"
          style={{ color: "var(--dim)" }}
        >
          Same outcome as the one-liner on the home page, just broken out so
          you can see what every command does and stop after any step.
        </p>

        <div className="mt-10">
          <OsTabs value={os} onChange={setOs} />
        </div>
      </SectionFrame>

      <SectionFrame className="px-6 py-14">
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
      </SectionFrame>

      <SectionFrame className="px-6 py-12">
        <p
          className="text-sm leading-relaxed max-w-[640px]"
          style={{ color: "var(--dim)" }}
        >
          Done?{" "}
          <Link
            href="/"
            className="underline underline-offset-4"
            style={{ color: "var(--brand)" }}
          >
            Back to the one-line setup
          </Link>
          .
        </p>
      </SectionFrame>
    </div>
  );
}

export function ManualFlow() {
  return (
    <Suspense fallback={null}>
      <ManualFlowInner />
    </Suspense>
  );
}

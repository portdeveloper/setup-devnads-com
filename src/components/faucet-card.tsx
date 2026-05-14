"use client";

import { useState, type FormEvent } from "react";
import { Check, AlertCircle, Loader2, Droplet } from "lucide-react";

const FAUCET_ENDPOINT = "https://agents.devnads.com/v1/faucet";
const MONAD_TESTNET_CHAIN_ID = 10143;
const EXPLORER_TX = "https://testnet.monadexplorer.com/tx";

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

type Result =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; txHash: string }
  | { kind: "error"; message: string };

export function FaucetCard() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<Result>({ kind: "idle" });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = address.trim();
    if (!ADDRESS_REGEX.test(trimmed)) {
      setResult({
        kind: "error",
        message: "That doesn't look like a valid 0x address (40 hex chars).",
      });
      return;
    }
    setResult({ kind: "loading" });
    try {
      const res = await fetch(FAUCET_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          chainId: MONAD_TESTNET_CHAIN_ID,
          address: trimmed,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setResult({
          kind: "error",
          message: data?.error || `Faucet returned ${res.status}.`,
        });
        return;
      }
      setResult({ kind: "success", txHash: data.txHash });
    } catch (err) {
      setResult({
        kind: "error",
        message: err instanceof Error ? err.message : "Network error.",
      });
    }
  };

  const loading = result.kind === "loading";

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            if (result.kind === "error") setResult({ kind: "idle" });
          }}
          placeholder="0xYourWalletAddress"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          disabled={loading}
          aria-label="Wallet address"
          className="flex-1 min-w-0 font-mono text-sm px-3 py-2 border outline-none focus:border-[var(--brand)]"
          style={{
            background: "var(--panel)",
            borderColor: "var(--line)",
            color: "var(--text)",
          }}
        />
        <button
          type="submit"
          disabled={loading || address.trim().length === 0}
          className="mono-caps inline-flex shrink-0 items-center justify-center gap-1.5 text-[11px] px-5 py-2 transition-colors disabled:opacity-50"
          style={{ background: "var(--brand)", color: "var(--on-brand)" }}
        >
          {loading ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" /> Sending
            </>
          ) : (
            <>
              <Droplet className="h-3 w-3" /> Drip MON
            </>
          )}
        </button>
      </form>

      {result.kind === "success" && (
        <div
          className="flex items-start gap-2 px-3 py-2 border text-sm"
          style={{ background: "var(--panel)", borderColor: "var(--line)" }}
        >
          <Check
            className="h-4 w-4 shrink-0 mt-0.5"
            style={{ color: "var(--ok)" }}
          />
          <div className="min-w-0">
            <p style={{ color: "var(--text)" }}>MON dripped to your address.</p>
            <a
              href={`${EXPLORER_TX}/${result.txHash}`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs break-all underline underline-offset-4"
              style={{ color: "var(--brand)" }}
            >
              {result.txHash}
            </a>
          </div>
        </div>
      )}

      {result.kind === "error" && (
        <div
          className="flex items-start gap-2 px-3 py-2 border text-sm"
          style={{ background: "var(--panel)", borderColor: "var(--line)" }}
        >
          <AlertCircle
            className="h-4 w-4 shrink-0 mt-0.5"
            style={{ color: "var(--destructive)" }}
          />
          <p style={{ color: "var(--text)" }}>{result.message}</p>
        </div>
      )}
    </div>
  );
}

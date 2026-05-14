import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ManualFlow } from "@/components/manual-flow";

export const metadata: Metadata = {
  title: "Manual install — setup.devnads.com",
  description:
    "Step-by-step Monad / Scaffold-ETH 2 install for Windows, macOS, and Linux.",
};

export default function ManualPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <ManualFlow />
      </main>
      <SiteFooter />
    </>
  );
}

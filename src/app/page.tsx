import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SetupFlow } from "@/components/setup-flow";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <SetupFlow />
      </main>
      <SiteFooter />
    </>
  );
}

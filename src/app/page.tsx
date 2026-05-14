import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeFlow } from "@/components/home-flow";

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HomeFlow />
      </main>
      <SiteFooter />
    </>
  );
}

import { Hero } from "../components/landing/Hero";
import { ApiStatusGrid } from "../ui/ApiStatusGrid";

export function LandingPage() {
  return (
    <>
      <main className="flex flex-col">
        <section>
          <Hero />
        </section>
        <section className="bg-black">
          <ApiStatusGrid />
        </section>
      </main>
    </>
  );
}

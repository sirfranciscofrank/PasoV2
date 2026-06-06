import { Hero } from "../components/landing/Hero";
import { ApiStatusGrid } from "../ui/ApiStatusGrid";
import { RecommendedPark } from "../components/landing/RecommendedPark";

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
        <RecommendedPark />
      </main>
    </>
  );
}

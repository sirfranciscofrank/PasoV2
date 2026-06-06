import { Hero } from "../components/landing/Hero";
import { WhatYouCanFind } from "../components/landing/WhatYouCanFind";
import { ApiStatusGrid } from "../components/landing/ApiStatusGrid";
import { RecommendedPark } from "../components/landing/RecommendedPark";
import { RecommendedClubs } from "../components/landing/RecommendedClubs";

export function LandingPage() {
  return (
    <main className="flex flex-col">
      <Hero />
      <WhatYouCanFind />
      <ApiStatusGrid />
      <RecommendedPark />
      <RecommendedClubs />
    </main>
  );
}

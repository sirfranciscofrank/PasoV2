import { useState } from "react";
import { PARKS } from "../../data/parks";
import { ParkCard } from "../parks/ParkCard";

export function RecommendedPark() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section aria-labelledby="picks-heading" className="relative overflow-hidden w-full bg-black border-t border-white/6">

      {/* Park background images — fade between on hover */}
      {PARKS.filter((p) => p.img).map((park) => (
        <img
          key={park.id}
          src={park.img}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out pointer-events-none select-none"
          style={{ opacity: hoveredId === park.id ? 1 : 0 }}
        />
      ))}

      {/* Persistent dark overlay */}
      <div className="absolute inset-0 bg-black/88 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-24">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-5 h-px bg-[#aff228]" aria-hidden="true" />
              <span className="font-dm text-[0.6rem] font-semibold tracking-[0.22em] text-[#aff228] uppercase">
                Curated Routes
              </span>
            </div>
            <h2
              id="picks-heading"
              className="font-syne font-bold text-white text-2xl md:text-3xl tracking-[-0.03em] mb-1.5"
            >
              Runs worth leaving home for
            </h2>
            <p className="font-dm text-sm text-white/38">
              Real routes around Bangkok — picked for comfort, scenery, and runability.
            </p>
          </div>
          <a
            href="#"
            className="font-dm text-sm font-semibold text-[#aff228]/60 hover:text-[#aff228] transition-colors duration-200 whitespace-nowrap hidden sm:block"
          >
            See all routes →
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {PARKS.map((park, index) => (
            <ParkCard
              key={park.id}
              park={park}
              index={index}
              onMouseEnter={() => setHoveredId(park.id)}
              onMouseLeave={() => setHoveredId(null)}
            />
          ))}
        </div>

        {/* CTA banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#aff228]/40 border border-[#aff228]/40 rounded-2xl px-7 py-6">
          <div>
            <p className="font-syne font-semibold text-white text-[1rem] mb-1 tracking-[-0.02em]">
              More Bangkok runs to explore
            </p>
            <p className="font-dm text-sm text-white/38 leading-relaxed">
              Parks, riverside paths, and quiet streets — picked to help you choose where to run next.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 font-dm text-sm font-semibold text-black bg-[#aff228] px-6 py-3 rounded-xl whitespace-nowrap hover:bg-[#c5f030] hover:shadow-[0_4px_20px_rgba(175,242,40,0.25)] transition-all duration-200 active:scale-[0.97]"
          >
            Explore all routes →
          </button>
        </div>

      </div>
    </section>
  );
}

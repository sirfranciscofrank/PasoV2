import { PARKS } from "../../data/parks";

function ParkCard({ park, index }) {
  return (
    <div className="group flex flex-col bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden hover:border-[#aff228]/30 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(175,242,40,0.08)] transition-all duration-300 cursor-pointer">

      {/* Image area */}
      <div className="h-38 bg-white/[0.03] flex items-center justify-center shrink-0 relative overflow-hidden">
        {park.img ? (
          <img
            src={park.img}
            alt={park.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <span aria-hidden="true" className="absolute right-4 bottom-1 font-syne font-bold text-[5rem] leading-none text-white/[0.04] select-none pointer-events-none tracking-[-0.06em]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-dm text-[0.65rem] text-white/20 tracking-widest uppercase z-10">
              Photo coming soon
            </span>
          </>
        )}

        {/* Index chip */}
        <div className="absolute top-3 left-3 bg-[#aff228]/10 border border-[#aff228]/20 rounded-full px-2.5 py-1">
          <span className="font-dm text-[0.55rem] font-bold tracking-[0.18em] uppercase text-[#aff228]/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Run type chip */}
        {park.runType && (
          <div className="absolute top-3 right-3 bg-black/50 border border-white/10 rounded-full px-2.5 py-1 backdrop-blur-sm">
            <span className="font-dm text-[0.55rem] font-medium tracking-wide text-white/50">
              {park.runType}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-4 flex flex-col gap-2 flex-1">
        {/* Location */}
        <p className="font-dm text-[0.6rem] font-semibold tracking-[0.14em] uppercase text-white/30">
          {park.area} · {park.city}
        </p>

        {/* Name */}
        <h3 className="font-syne font-bold text-white text-[1.0625rem] leading-tight tracking-[-0.02em]">
          {park.name}
        </h3>

        {/* Vibe */}
        {park.vibe && (
          <p className="font-dm text-[0.72rem] text-white/38 leading-relaxed line-clamp-2">
            {park.vibe}
          </p>
        )}

        {/* Tags */}
        {park.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {park.tags.map((tag) => (
              <span
                key={tag}
                className="font-dm text-[0.55rem] font-medium tracking-wide px-2 py-0.5 rounded-full bg-white/4 border border-white/8 text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer meta */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          {park.approxLoopDistance && (
            <span className="font-dm text-[0.6rem] text-white/30">
              {park.approxLoopDistance}
            </span>
          )}
          {park.openingHours && (
            <span className="font-dm text-[0.6rem] text-white/25 ml-auto">
              {park.openingHours}
            </span>
          )}
        </div>

        {/* Directions button */}
        <a
          href={park.locationLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-1 w-full flex items-center justify-center gap-1.5 font-dm text-[0.72rem] font-semibold text-white/50 border border-white/8 rounded-xl py-2.5 hover:text-[#aff228] hover:border-[#aff228]/30 hover:bg-[#aff228]/5 transition-all duration-200"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5"/>
          </svg>
          Get directions
        </a>
      </div>

      {/* Bottom kiwi bar on hover */}
      <div className="h-0.5 bg-[#aff228] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
    </div>
  );
}

export function RecommendedPark() {
  return (
    <section aria-labelledby="picks-heading" className="w-full bg-black border-t border-white/6">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16 md:py-24">

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
            <ParkCard key={park.id} park={park} index={index} />
          ))}
        </div>

        {/* CTA banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#aff228]/5 border border-[#aff228]/15 rounded-2xl px-7 py-6">
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

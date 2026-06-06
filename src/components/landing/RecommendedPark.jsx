import { PARKS } from "../../data/parks";

function ParkCard({ park }) {
  return (
    <div className="group flex flex-col bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 hover:-translate-y-1 transition-all duration-300 cursor-pointer">

      {/* Illustration */}
      <div className="h-36 bg-white/4 flex items-center justify-center shrink-0">
        {park.img ? (
          <img
            src={park.img}
            alt={park.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-dm text-[0.65rem] text-white/20 tracking-widest uppercase">
            Photo coming soon
          </span>
        )}
      </div>

      {/* Content */}
      <div className="px-5 pt-4 pb-5 flex flex-col gap-1">
        <span
          className="font-dm text-[0.6rem] font-semibold tracking-[0.18em] uppercase"
          style={{ color: "rgba(175,242,40,0.7)" }}
        >
          Runner Pick
        </span>
        <h3 className="font-syne font-bold text-white text-[1.0625rem] leading-tight">
          {park.name}
        </h3>
        <p className="font-dm text-xs text-white/40">
          {park.location}
        </p>
      </div>
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
            <h2
              id="picks-heading"
              className="font-syne font-bold text-white text-2xl md:text-3xl tracking-[-0.03em] mb-1"
            >
              Runs I'd actually do
            </h2>
            <p className="font-dm text-sm text-white/40">
Real routes around Bangkok — picked for comfort, scenery, and runability.            </p>
          </div>
          <a
            href="#"
            className="font-dm text-sm font-semibold text-[#aff228] hover:opacity-75 transition-opacity whitespace-nowrap hidden sm:block"
          >
            See all routes →
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {PARKS.map(park => (
            <ParkCard key={park.id} park={park} />
          ))}
        </div>

        {/* CTA banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/3 border border-white/8 rounded-2xl px-7 py-6">
          <div>
            <p className="font-syne font-semibold text-white text-[1rem] mb-1">
              More Bangkok runs to explore
            </p>
            <p className="font-dm text-sm text-white/40 leading-relaxed">
              Parks, riverside paths, and quiet streets — picked to help you choose where to run next.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 font-dm text-sm font-semibold text-black bg-[#aff228] px-6 py-3 rounded-xl whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            Explore all routes →
          </button>
        </div>

      </div>
    </section>
  );
}

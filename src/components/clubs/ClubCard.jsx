const PACE_CONFIG = {
  Casual: {
    badge: "bg-sky-300/12 border-sky-300/25 text-sky-300",
    dot: "bg-sky-300",
    gradientColor: "#7dd3fc",
  },
  Easy: {
    badge: "bg-[#aff228]/12 border-[#aff228]/25 text-[#aff228]",
    dot: "bg-[#aff228]",
    gradientColor: "#aff228",
  },
  Moderate: {
    badge: "bg-amber-400/12 border-amber-400/25 text-amber-400",
    dot: "bg-amber-400",
    gradientColor: "#fbbf24",
  },
  Fast: {
    badge: "bg-red-400/12 border-red-400/25 text-red-400",
    dot: "bg-red-400",
    gradientColor: "#f87171",
  },
};

function getInitials(name) {
  return name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function ClubCard({ club, index }) {
  const num = String(index + 1).padStart(2, "0");
  const config = PACE_CONFIG[club.paceLevel] ?? PACE_CONFIG.Moderate;
  const initials = getInitials(club.name);

  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden border border-white/8 hover:border-[#aff228]/35 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer bg-[#080808]">

      {/* Header area */}
      <div className="relative h-36 shrink-0 overflow-hidden">

        {/* Pace-tinted top gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${config.gradientColor}14 0%, transparent 65%)`,
          }}
        />

        {/* Large faded initials */}
        <span
          aria-hidden="true"
          className="absolute font-syne font-bold text-[5.5rem] leading-none text-white/[0.04] select-none pointer-events-none tracking-[-0.06em] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {initials}
        </span>

        {/* Bottom gradient for text legibility */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />

        {/* Index badge — top left */}
        <div className="absolute top-3.5 left-3.5 w-7 h-7 rounded-full bg-black/60 border border-[#aff228]/40 backdrop-blur-md flex items-center justify-center">
          <span className="font-dm text-[0.6rem] font-bold tracking-widest text-[#aff228]">
            {num}
          </span>
        </div>

        {/* Pace badge — top right */}
        <div
          className={`absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[0.55rem] font-bold tracking-[0.14em] uppercase backdrop-blur-md ${config.badge}`}
        >
          <span className={`w-1 h-1 rounded-full shrink-0 ${config.dot}`} aria-hidden="true" />
          {club.paceLevel}
        </div>

        {/* Club name pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-6">
          <h3 className="font-syne font-bold text-white text-[1.1rem] leading-tight tracking-[-0.03em] line-clamp-2">
            {club.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-3.5 pb-4 flex flex-col gap-3 flex-1">

        {/* Schedule */}
        <div className="flex items-center gap-2">
          <svg
            width="11" height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#aff228]/60 shrink-0"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="font-dm text-[0.65rem] text-white/45 leading-none">
            {club.schedule}
          </span>
        </div>

        {/* Founders */}
        {club.founders?.length > 0 && (
          <div className="pt-2.5 border-t border-white/6">
            <p className="font-dm text-[0.55rem] font-semibold tracking-[0.14em] uppercase text-white/28 mb-2">
              Organizers
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {club.founders.map((f) => (
                <a
                  key={f.handle}
                  href={f.igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-dm text-[0.65rem] text-white/40 hover:text-[#aff228] transition-colors duration-200"
                >
                  @{f.handle}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Instagram link */}
        <a
          href={club.igLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-auto w-full flex items-center justify-center gap-1.5 font-dm text-[0.7rem] font-semibold text-white/40 border border-white/8 rounded-xl py-2.5 hover:text-[#aff228] hover:border-[#aff228]/25 hover:bg-[#aff228]/5 transition-all duration-200"
        >
          <svg
            width="11" height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
          </svg>
          View on Instagram
        </a>
      </div>

      {/* Bottom kiwi bar on hover */}
      <div className="h-0.5 bg-[#aff228] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
    </div>
  );
}

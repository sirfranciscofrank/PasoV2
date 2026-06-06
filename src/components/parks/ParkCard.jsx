export function ParkCard({ park, index, onMouseEnter, onMouseLeave }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/8 hover:border-[#aff228]/35 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer bg-[#080808]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >

      {/* Image */}
      <div className="relative h-52 shrink-0 overflow-hidden">
        {park.img ? (
          <img
            src={park.img}
            alt={park.name}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-white/3 flex items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute font-syne font-bold text-[7rem] leading-none text-white/3 select-none pointer-events-none tracking-[-0.06em]"
            >
              {num}
            </span>
            <span className="font-dm text-[0.65rem] text-white/20 tracking-widest uppercase z-10">
              Photo coming soon
            </span>
          </div>
        )}

        {/* Gradient overlay — fades image into card bg */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />

        {/* Index badge */}
        <div className="absolute top-3.5 left-3.5 w-7 h-7 rounded-full bg-black/60 border border-[#aff228]/40 backdrop-blur-md flex items-center justify-center">
          <span className="font-dm text-[0.6rem] font-bold tracking-widest text-[#aff228]">
            {num}
          </span>
        </div>

        {/* Name + location pinned to bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-10">
          <p className="font-dm text-[0.58rem] font-semibold tracking-[0.16em] uppercase text-white/45 mb-1">
            {park.area} · {park.city}
          </p>
          <h3 className="font-syne font-bold text-white text-[1.15rem] leading-tight tracking-[-0.03em]">
            {park.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-3.5 pb-4 flex flex-col gap-3 flex-1">

        {/* Run type + distance */}
        <div className="flex flex-col gap-0.5">
          <span className="font-dm text-[0.58rem] font-bold tracking-wider uppercase text-[#aff228]/70 line-clamp-1">
            {park.runType}
          </span>
          {park.approxLoopDistance && (
            <span className="font-dm text-[0.6rem] text-white/30 line-clamp-1">
              {park.approxLoopDistance}
            </span>
          )}
        </div>

        {/* Tags */}
        {park.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {park.tags.map((tag) => (
              <span
                key={tag}
                className="font-dm text-[0.55rem] font-medium tracking-wide px-2 py-0.5 rounded-full bg-white/4 border border-white/8 text-white/38"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Directions */}
        <a
          href={park.locationLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-auto w-full flex items-center justify-center gap-1.5 font-dm text-[0.7rem] font-semibold text-white/40 border border-white/8 rounded-xl py-2.5 hover:text-[#aff228] hover:border-[#aff228]/25 hover:bg-[#aff228]/5 transition-all duration-200"
        >
          <svg
            width="10" height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          Get directions
        </a>
      </div>

      {/* Bottom kiwi bar on hover */}
      <div className="h-0.5 bg-[#aff228] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
    </div>
  );
}

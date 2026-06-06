import { CLUBS } from "../../data/clubs";
import { ClubCard } from "../clubs/ClubCard";

function VideoPanel({ club }) {
  if (club.videoSrc) {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#080808]">
        <video
          src={club.videoSrc}
          controls
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-white/8 bg-[#080808] flex flex-col items-center justify-center gap-4 min-h-70">
      <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center">
        <svg
          width="20" height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="text-white/18 translate-x-0.5"
        >
          <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
        </svg>
      </div>
      <span className="font-dm text-[0.65rem] text-white/22 tracking-wider uppercase">
        Video coming soon
      </span>
    </div>
  );
}

export function RecommendedClubs() {
  const club = CLUBS[0];

  return (
    <section aria-labelledby="clubs-heading" className="relative overflow-hidden w-full bg-black border-t border-white/6">

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-16 md:pt-24 md:pb-28">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-5 h-px bg-[#aff228]" aria-hidden="true" />
            <span className="font-dm text-[0.6rem] font-semibold tracking-[0.22em] text-[#aff228] uppercase">
              Featured Crew
            </span>
          </div>
          <h2
            id="clubs-heading"
            className="font-syne font-bold text-white text-2xl md:text-3xl tracking-[-0.03em] mb-1.5"
          >
            Meet a crew
          </h2>
          <p className="font-dm text-sm text-white/38">
            Start with one active community, then discover more as Paso grows.
          </p>
        </div>

        {/* Featured split: card left, video right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          <ClubCard club={club} index={0} />
          <VideoPanel club={club} />
        </div>

      </div>
    </section>
  );
}

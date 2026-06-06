import { CLUBS } from "../../data/clubs";

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
    <div className="aspect-video lg:aspect-4/3 rounded-2xl overflow-hidden border border-white/8 bg-[#080808] flex flex-col items-center justify-center gap-4">
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
      <div className="text-center px-8">
        <p className="font-dm text-[0.6rem] font-semibold tracking-[0.18em] text-white/30 uppercase mb-1.5">
          See the crew vibe
        </p>
        <p className="font-dm text-[0.6rem] text-white/18 leading-relaxed">
          Video coming soon — soon you'll be able to preview the pace, vibe, and routes before joining a run.
        </p>
      </div>
    </div>
  );
}

export function RecommendedClubs() {
  const club = CLUBS[0];

  return (
    <section aria-labelledby="clubs-heading" className="relative overflow-hidden w-full bg-black border-t border-white/6">
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-16 md:pt-24 md:pb-28">

        {/* Section label */}
        <div className="flex items-center gap-2.5 mb-12">
          <div className="w-5 h-px bg-[#aff228]" aria-hidden="true" />
          <span className="font-dm text-[0.6rem] font-semibold tracking-[0.22em] text-[#aff228] uppercase">
            Community to Know
          </span>
        </div>

        {/* Editorial split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — feature story */}
          <div className="flex flex-col">

            {/* Title + social proof */}
            <h2
              id="clubs-heading"
              className="font-syne font-bold text-white text-4xl md:text-5xl tracking-[-0.03em] leading-tight mb-2"
            >
              {club.name}
            </h2>
            <p className="font-dm text-[0.7rem] text-white/30 mb-6">
              Community&nbsp;·&nbsp;{club.followers}+ followers
            </p>

            {/* Description */}
            <p className="font-dm text-sm text-white/45 leading-relaxed mb-7 max-w-md">
              A Bangkok-based running community where you show up, move together, and friends are found. They share casual runs and community events for people who want running to feel more social.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {["Casual", "Social runs", "Bangkok", "Beginner-friendly"].map((tag) => (
                <span
                  key={tag}
                  className="font-dm text-[0.65rem] text-[#aff228]/70 border border-[#aff228]/20 rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Upcoming runs */}
            {club.upcomingEvents?.length > 0 && (
              <div className="mb-8">
                <p className="font-dm text-[0.55rem] font-semibold tracking-[0.16em] uppercase text-white/28 mb-4">
                  Upcoming runs
                </p>
                <ul className="flex flex-col gap-4">
                  {club.upcomingEvents.map((event) => (
                    <li key={event.name} className="flex items-start gap-4">
                      <span className="font-dm text-[0.65rem] font-semibold text-[#aff228]/60 w-8 shrink-0 pt-0.5">
                        {event.date}
                      </span>
                      <div>
                        <p className="font-dm text-[0.75rem] text-white/55 leading-snug">{event.name}</p>
                        <p className="font-dm text-[0.6rem] text-white/28 mt-0.5">{event.type}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Founders */}
            <div className="mb-9">
              <p className="font-dm text-[0.55rem] font-semibold tracking-[0.16em] uppercase text-white/28 mb-2.5">
                Founders
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                {club.founders?.map((f) => (
                  <a
                    key={f.handle}
                    href={f.igLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-dm text-sm text-white/38 hover:text-[#aff228] transition-colors duration-200"
                  >
                    @{f.handle}
                  </a>
                ))}
                <span className="text-white/15 font-dm text-sm">·</span>
                <a
                  href={club.igLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-dm text-sm text-white/25 hover:text-[#aff228] transition-colors duration-200"
                >
                  @friendsfound
                </a>
              </div>
            </div>

            {/* CTA */}
            <a
              href={club.igLink}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-2 bg-[#aff228] hover:bg-[#c8f542] text-black font-dm font-semibold text-sm rounded-full px-6 py-3 transition-colors duration-200"
            >
              View on Instagram
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* RIGHT — video / vibe */}
          <VideoPanel club={club} />
        </div>

      </div>
    </section>
  );
}

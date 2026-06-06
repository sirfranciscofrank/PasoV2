import { useState } from "react";
import { CLUBS } from "../../data/clubs";

function parseDateStr(dateStr) {
  const [day, month] = dateStr.split("/").map(Number);
  const now = new Date();
  const year = now.getMonth() + 1 > month ? now.getFullYear() + 1 : now.getFullYear();
  return new Date(year, month - 1, day);
}

function getDaysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((parseDateStr(dateStr) - today) / 86400000);
}

function fmtDate(dateStr) {
  const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const [day, month] = dateStr.split("/").map(Number);
  return { day, month: MONTHS[month - 1] };
}

function UpcomingRuns({ events }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-white/8"
      style={{ background: "rgba(5,5,5,1)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/[0.05]">
        <span className="font-syne font-bold text-[0.44rem] tracking-[0.28em] uppercase text-white/22">
          Upcoming Runs
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#aff228] animate-pulse"
            aria-hidden="true"
          />
          <span className="font-dm text-[0.44rem] text-[#aff228]/55">
            {events.length} scheduled
          </span>
        </div>
      </div>

      {/* Event rows */}
      <div>
        {events.map((event, i) => {
          const days = getDaysUntil(event.date);
          const { day, month } = fmtDate(event.date);
          const isNext = i === 0;
          const isLimited = event.type.toLowerCase().includes("limited");

          return (
            <div
              key={event.name}
              className="relative group"
              style={{
                borderBottom:
                  i < events.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
            >
              {/* Left accent bar for next event */}
              {isNext && (
                <div
                  className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r-full"
                  style={{ background: "rgba(175,242,40,0.55)" }}
                  aria-hidden="true"
                />
              )}

              {/* Hover tint */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: isNext
                    ? "rgba(175,242,40,0.02)"
                    : "rgba(255,255,255,0.008)",
                }}
                aria-hidden="true"
              />

              {/* Background tint for next event */}
              {isNext && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "rgba(175,242,40,0.018)" }}
                  aria-hidden="true"
                />
              )}

              <div className="relative flex items-center px-4 py-4">
                {/* Countdown */}
                <div className="shrink-0 w-14 flex flex-col items-center">
                  <span
                    className="font-syne font-bold tabular-nums leading-none"
                    style={{
                      fontSize: "1.65rem",
                      letterSpacing: "-0.04em",
                      color: isNext
                        ? "#aff228"
                        : "rgba(255,255,255,0.2)",
                    }}
                  >
                    {days < 0 ? "—" : String(days).padStart(2, "0")}
                  </span>
                  <span
                    className="font-syne font-bold text-[0.37rem] tracking-[0.22em] uppercase mt-1"
                    style={{
                      color: isNext
                        ? "rgba(175,242,40,0.48)"
                        : "rgba(255,255,255,0.14)",
                    }}
                  >
                    {Math.abs(days) === 1 ? "day" : "days"}
                  </span>
                </div>

                {/* Divider */}
                <div
                  className="shrink-0 mx-3 w-px h-9"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                  aria-hidden="true"
                />

                {/* Event details */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-syne font-bold text-[0.78rem] leading-tight truncate"
                    style={{
                      color: isNext
                        ? "rgba(255,255,255,0.82)"
                        : "rgba(255,255,255,0.32)",
                    }}
                  >
                    {event.name}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className="font-dm text-[0.5rem] font-medium px-2 py-[0.2rem] rounded-full border"
                      style={
                        isLimited
                          ? {
                              color: "rgba(251,191,36,0.78)",
                              borderColor: "rgba(251,191,36,0.22)",
                              background: "rgba(251,191,36,0.06)",
                            }
                          : isNext
                          ? {
                              color: "rgba(175,242,40,0.7)",
                              borderColor: "rgba(175,242,40,0.2)",
                              background: "rgba(175,242,40,0.05)",
                            }
                          : {
                              color: "rgba(255,255,255,0.2)",
                              borderColor: "rgba(255,255,255,0.08)",
                              background: "transparent",
                            }
                      }
                    >
                      {event.type}
                    </span>

                    {isNext && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-1 h-1 rounded-full bg-[#aff228] animate-pulse"
                          aria-hidden="true"
                        />
                        <span className="font-syne font-bold text-[0.37rem] tracking-[0.2em] uppercase text-[#aff228]/50">
                          Next
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Date badge */}
                <div className="shrink-0 ml-3 text-right">
                  <span
                    className="font-syne font-bold leading-none block"
                    style={{
                      fontSize: "1.05rem",
                      letterSpacing: "-0.02em",
                      color: isNext
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(255,255,255,0.16)",
                    }}
                  >
                    {day}
                  </span>
                  <span
                    className="font-syne font-bold text-[0.37rem] tracking-[0.18em] uppercase block mt-0.5"
                    style={{
                      color: isNext
                        ? "rgba(175,242,40,0.55)"
                        : "rgba(255,255,255,0.14)",
                    }}
                  >
                    {month}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-white/[0.05]">
        <p className="font-dm text-[0.46rem] text-white/14">
          More runs announced via Instagram
        </p>
      </div>
    </div>
  );
}

function VideoPanel({ club }) {
  const [active, setActive] = useState(0);
  const slots = club.videoSlots ?? [];

  if (club.videoSrc) {
    return (
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <video src={club.videoSrc} controls playsInline className="w-full h-full object-cover" />
      </div>
    );
  }

  const slot = slots[active];
  const [typePart, schedulePart] = slot.type.split("·").map((s) => s.trim());

  return (
    <div
      className="flex flex-col flex-1 min-h-0 rounded-2xl overflow-hidden border border-white/8"
      style={{ background: "#050505" }}
    >
      {/* Tab strip */}
      <div className="flex border-b border-white/[0.06]">
        {slots.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            className="relative flex-1 flex flex-col items-start px-3 py-3 transition-colors duration-200 hover:bg-white/[0.012]"
            style={{ background: active === i ? "rgba(175,242,40,0.035)" : undefined }}
          >
            {/* Active underline */}
            <div
              className="absolute bottom-0 left-0 right-0 transition-all duration-300"
              style={{
                height: "1.5px",
                background: active === i ? "rgba(175,242,40,0.75)" : "transparent",
              }}
              aria-hidden="true"
            />
            <span
              className="font-syne font-bold text-[0.37rem] tracking-[0.24em] uppercase mb-1 transition-colors duration-200"
              style={{ color: active === i ? "rgba(175,242,40,0.65)" : "rgba(255,255,255,0.16)" }}
            >
              {String(s.id).padStart(2, "0")}
            </span>
            <span
              className="font-syne font-bold text-[0.64rem] leading-tight transition-colors duration-200 text-left"
              style={{ color: active === i ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.26)" }}
            >
              {s.label}
            </span>
          </button>
        ))}
      </div>

      {/* Player */}
      <div className="relative aspect-[4/3] flex flex-col overflow-hidden">

        {/* Crosshatch grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
              "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />

        {/* Radial lime glow */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 42%, rgba(175,242,40,0.07) 0%, transparent 62%)" }}
          aria-hidden="true"
        />

        {/* Corner crosshairs */}
        <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 opacity-25" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-px bg-[#aff228]" />
          <div className="absolute top-0 left-0 h-full w-px bg-[#aff228]" />
        </div>
        <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 opacity-25" aria-hidden="true">
          <div className="absolute top-0 right-0 w-full h-px bg-[#aff228]" />
          <div className="absolute top-0 right-0 h-full w-px bg-[#aff228]" />
        </div>
        <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 opacity-25" aria-hidden="true">
          <div className="absolute bottom-0 left-0 w-full h-px bg-[#aff228]" />
          <div className="absolute bottom-0 left-0 h-full w-px bg-[#aff228]" />
        </div>
        <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 opacity-25" aria-hidden="true">
          <div className="absolute bottom-0 right-0 w-full h-px bg-[#aff228]" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-[#aff228]" />
        </div>

        {/* Top: type badge + schedule */}
        <div className="relative z-10 flex items-center justify-between px-4 pt-4">
          <span
            className="font-dm text-[0.49rem] font-medium px-2.5 py-[0.22rem] rounded-full border"
            style={{
              color: "rgba(175,242,40,0.72)",
              borderColor: "rgba(175,242,40,0.2)",
              background: "rgba(175,242,40,0.06)",
            }}
          >
            {typePart}
          </span>
          {schedulePart && (
            <span className="font-dm text-[0.46rem] text-white/22">{schedulePart}</span>
          )}
        </div>

        {/* Center: play button + label */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-3.5">
          <a
            href={club.igLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3.5"
          >
            <div
              className="w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{
                background: "rgba(175,242,40,0.07)",
                border: "1.5px solid rgba(175,242,40,0.24)",
                boxShadow: "0 0 28px rgba(175,242,40,0.07), inset 0 0 12px rgba(175,242,40,0.04)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                className="translate-x-[1.5px]"
                style={{ color: "rgba(175,242,40,0.72)" }}
              >
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
              </svg>
            </div>

            <div className="text-center">
              <p
                className="font-syne font-bold transition-colors duration-200 group-hover:text-white/75"
                style={{
                  fontSize: "0.88rem",
                  letterSpacing: "-0.01em",
                  color: "rgba(255,255,255,0.58)",
                }}
              >
                {slot.label}
              </p>
              <p className="font-dm text-[0.48rem] text-white/20 mt-0.5">
                tap to watch
              </p>
            </div>
          </a>
        </div>

        {/* Bottom: progress indicators + Instagram CTA */}
        <div className="relative z-10 flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {slots.map((_, i) => (
              <div
                key={i}
                className="h-px rounded-full transition-all duration-300"
                style={{
                  width: active === i ? "20px" : "6px",
                  background:
                    active === i ? "rgba(175,242,40,0.55)" : "rgba(255,255,255,0.1)",
                }}
              />
            ))}
          </div>
          <a
            href={club.igLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5"
          >
            <span className="font-dm text-[0.46rem] text-white/18 group-hover:text-white/38 transition-colors duration-200">
              Watch on Instagram
            </span>
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/14 group-hover:text-white/32 group-hover:translate-x-0.5 transition-all duration-200"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export function RecommendedClubs() {
  const club = CLUBS[0];

  return (
    <section
      aria-labelledby="clubs-heading"
      className="relative overflow-hidden w-full bg-black border-t border-white/6"
    >
      {/* Atmospheric glow */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 80% 0%, rgba(175,242,40,0.05) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-14 md:py-20">

        {/* Section label */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-5 h-px bg-[#aff228]" aria-hidden="true" />
            <span className="font-syne font-bold text-[0.52rem] tracking-[0.28em] text-[#aff228] uppercase">
              Community to Know
            </span>
          </div>
        </div>

        {/* Full-width headline */}
        <div className="mb-10 md:mb-12">
          <h2
            id="clubs-heading"
            className="font-syne font-bold leading-[0.88] tracking-[-0.04em] mb-6"
            style={{ fontSize: "clamp(3rem, 7.5vw, 6rem)" }}
          >
            <span className="text-white">Friends </span>
            <span className="text-[#aff228]">Found</span>
          </h2>

          {/* Decorative rule */}
          <div className="flex items-center gap-4 mb-6" aria-hidden="true">
            <div className="flex-1 h-px bg-white/7" />
            <span className="font-syne text-[0.42rem] tracking-[0.24em] uppercase text-white/18">Est. Bangkok</span>
            <div className="flex-1 h-px bg-white/7" />
          </div>

          {/* Stat grid */}
          <div
            className="grid grid-cols-3 divide-x divide-white/8 rounded-xl border border-white/8 overflow-hidden"
            style={{ background: "rgba(255,255,255,0.018)" }}
          >
            <div className="flex flex-col items-center py-3.5 px-2">
              <span className="font-syne font-bold text-lg leading-none text-white/80">
                {club.followers}
              </span>
              <span className="font-dm text-[0.45rem] uppercase tracking-[0.12em] text-white/22 mt-1.5">
                Followers
              </span>
            </div>
            <div className="flex flex-col items-center py-3.5 px-2">
              <span className="font-syne font-bold text-[0.82rem] leading-none text-white/48">
                Bangkok
              </span>
              <span className="font-dm text-[0.45rem] uppercase tracking-[0.12em] text-white/22 mt-1.5">
                Location
              </span>
            </div>
            <div className="flex flex-col items-center py-3.5 px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#aff228] animate-pulse" aria-hidden="true" />
                <span className="font-syne font-bold text-[0.72rem] leading-none text-[#aff228]/72">
                  Active
                </span>
              </span>
              <span className="font-dm text-[0.45rem] uppercase tracking-[0.12em] text-white/22 mt-1.5">
                Status
              </span>
            </div>
          </div>
        </div>

        {/* 50/50 body grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-32 items-stretch">

          {/* LEFT */}
          <div className="flex flex-col">
            <p className="font-dm text-[0.88rem] text-white/42 leading-[1.9] mb-8">
              A Bangkok-based running community where you show up, move together, and friends are found. Casual runs and community events for people who want running to feel more social.
            </p>

            {/* Tags — slash separated */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-8 pb-8 border-b border-white/6">
              <span className="font-syne font-bold text-[0.42rem] tracking-[0.26em] uppercase text-white/18 mr-1">
                Tags
              </span>
              {["Casual", "Social runs", "Bangkok", "Beginner-friendly"].map((tag, i, arr) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="font-dm text-[0.63rem] text-white/35">{tag}</span>
                  {i < arr.length - 1 && (
                    <span className="text-white/15" aria-hidden="true">/</span>
                  )}
                </span>
              ))}
            </div>

            {/* Founded by */}
            <div className="mb-8">
              <p className="font-syne font-bold text-[0.44rem] tracking-[0.28em] uppercase text-white/18 mb-3">
                Founded by
              </p>
              <div className="flex flex-col">
                {club.founders?.map((f) => (
                  <a
                    key={f.handle}
                    href={f.igLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-2.5 border-b border-white/5 last:border-0 hover:border-white/10 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#aff228]/28 group-hover:bg-[#aff228]/5 transition-all duration-200"
                        style={{ background: "rgba(255,255,255,0.03)" }}
                      >
                        <span className="font-syne font-bold text-[0.46rem] text-white/28 group-hover:text-[#aff228]/65 transition-colors duration-200">
                          {f.handle[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="font-dm text-[0.8rem] text-white/35 group-hover:text-white/62 transition-colors duration-200">
                        @{f.handle}
                      </span>
                    </div>
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/12 group-hover:text-[#aff228]/45 group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <a
              href={club.igLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group self-start inline-flex items-center gap-2.5 bg-[#aff228] hover:bg-[#c3ef3a] text-black font-syne font-bold text-[0.65rem] tracking-[0.08em] uppercase rounded-full px-6 py-3 transition-all duration-200"
            >
              View on Instagram
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-3 h-full">
            <VideoPanel club={club} />

            {club.upcomingEvents?.length > 0 && (
              <UpcomingRuns events={club.upcomingEvents} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

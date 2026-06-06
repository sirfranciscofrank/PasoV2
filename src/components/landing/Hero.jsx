import HeroBackground from "../../assets/HeroBackground.png";

export function Hero() {
  return (
    <section aria-labelledby="hero-headline" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Full-bleed background */}
      <img
        src={HeroBackground}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlays — purely decorative */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/45" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/90 via-black/20 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-transparent to-[#aff228]/35" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-linear-to-t from-black via-black/65 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-32">
        <div className="flex flex-col max-w-xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7" aria-hidden="true">
            <span className="block w-5 h-px bg-[#aff228]" />
            <span className="font-dm text-[0.6875rem] font-semibold tracking-[0.22em] text-[#aff228] uppercase">
              Bangkok Running Discovery
            </span>
          </div>

          {/* Headline */}
          <h1
            id="hero-headline"
            className="font-syne font-bold text-white leading-[0.92] tracking-[-0.04em] text-[clamp(2.75rem,6vw,5.5rem)] mb-6"
          >
            Your next Bangkok run starts here.
          </h1>

          {/* Subtext */}
          <p className="font-dm text-white/60 text-[0.9375rem] leading-relaxed mb-10 max-w-md">
            Discover routes, events, and running communities across the city.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              className="group inline-flex items-center gap-2 bg-[#aff228] text-black rounded-md px-6 py-3 font-dm text-[0.8125rem] font-semibold whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(175,242,40,0.4),0_0_28px_rgba(175,242,40,0.35),0_8px_24px_rgba(0,0,0,0.6)] active:translate-y-0 active:shadow-none"
            >
              Find a run
              <svg className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.75" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1.75 7h10.5M8.75 3.5 12.25 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/35 rounded-md px-6 py-3 font-dm text-[0.8125rem] font-semibold whitespace-nowrap transition-all duration-300"
            >
              How it works
            </button>
          </div>

        </div>
      </div>

      {/* Scroll cue — decorative */}
      <div aria-hidden="true" className="absolute bottom-18 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25 pointer-events-none">
        <span className="font-dm text-[0.5rem] tracking-[0.35em] text-white uppercase">Scroll</span>
        <div className="w-px h-8 bg-linear-to-b from-white to-transparent" />
      </div>

    </section>
  );
}

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

      {/* Overlays */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "300px 300px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/80 via-black/10 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-black via-black/60 to-transparent" />
      {/* Subtle kiwi glow bottom-right */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-transparent to-[#aff228]/20" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-32">
        <div className="flex flex-col max-w-2xl">

          {/* Eyebrow pill */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="flex items-center gap-2 bg-[#aff228]/10 border border-[#aff228]/20 rounded-full px-3.5 py-1.5">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#aff228] animate-pulse shrink-0" />
              <span className="font-dm text-[0.65rem] font-semibold tracking-[0.18em] text-[#aff228] uppercase">
                Bangkok Running Discovery
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1
            id="hero-headline"
            className="font-syne font-bold text-white leading-[0.92] tracking-[-0.04em] text-[clamp(2.75rem,6.5vw,5.75rem)] mb-6"
          >
            Your next<br />
            <span className="text-[#aff228]">Bangkok</span>{" "}
            run<br />
            starts here.
          </h1>

          {/* Subtext */}
          <p className="font-dm text-white/55 text-[0.9375rem] leading-relaxed mb-10 max-w-sm">
            Find runner-friendly parks, simple route notes, local conditions, and running crews across the city.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              className="group inline-flex items-center gap-2 bg-[#aff228] text-black rounded-xl px-7 py-3.5 font-dm text-[0.8125rem] font-semibold whitespace-nowrap transition-all duration-200 hover:bg-[#c5f030] hover:shadow-[0_8px_32px_rgba(175,242,40,0.35)] active:scale-[0.97]"
            >
              Find a run
              <svg className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1.75 7h10.5M8.75 3.5 12.25 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => document.getElementById("what-you-can-find")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 border border-white/20 bg-white/5 text-white/65 hover:text-white hover:border-white/35 hover:bg-white/10 rounded-xl px-7 py-3.5 font-dm text-[0.8125rem] font-semibold whitespace-nowrap transition-all duration-200"
            >
              How it works
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}

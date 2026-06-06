import HeroBackground from "../../assets/HeroBackground.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed background */}
      <img
        src={HeroBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />

      {/* Base darkening */}
      <div className="pointer-events-none absolute inset-0 bg-black/45" />

      {/* Top fade — seamless blend with transparent navbar */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/90 via-black/20 to-transparent" />

      {/* Bottom-right lime tint — brand color present in background */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-transparent via-transparent to-[#aff228]/35" />

      {/* Bottom fade — seamless blend into status bar */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 bg-linear-to-t from-black via-black/65 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-32">
        <div className="flex flex-col max-w-xl">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <span className="block w-5 h-px bg-[#aff228]" />
            <span className="font-dm text-[0.6875rem] font-semibold tracking-[0.22em] text-[#aff228] uppercase">
              Bangkok Running Discovery
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-syne font-bold text-white leading-[0.92] tracking-[-0.04em] text-[clamp(2.75rem,6vw,5.5rem)] mb-6">
            Your next Bangkok<br />
            run starts here.
          </h1>

          {/* Subtext */}
          <p className="font-dm text-white/45 text-[0.9375rem] leading-relaxed mb-10 max-w-md">
            Discover routes, events, and running communities across the city.
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <button className="group inline-flex items-center gap-2 bg-[#aff228] text-black rounded-md px-6 py-3 font-dm text-[0.8125rem] font-semibold whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(175,242,40,0.4),0_0_28px_rgba(175,242,40,0.35),0_8px_24px_rgba(0,0,0,0.6)] active:translate-y-0 active:shadow-none">
              Find a run
              <svg className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.75" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1.75 7h10.5M8.75 3.5 12.25 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button className="inline-flex items-center gap-2 border border-white/15 text-white/50 hover:text-white hover:border-white/30 rounded-md px-6 py-3 font-dm text-[0.8125rem] font-semibold whitespace-nowrap transition-all duration-300">
              How it works
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

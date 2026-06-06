export function LocationConsent({ onConfirm, onDismiss }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 bg-black/75 backdrop-blur-sm"
      onClick={onDismiss}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="loc-modal-title"
        className="relative w-full sm:max-w-sm bg-[#0d0d0d] border border-white/10 sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl shadow-black"
        onClick={e => e.stopPropagation()}
      >
        {/* Top kiwi accent line */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-px pointer-events-none"
          style={{ background: "linear-gradient(90deg, transparent, rgba(175,242,40,0.6), transparent)" }}
        />

        {/* Visual — GPS lock rings */}
        <div className="relative flex items-center justify-center py-12 bg-[#090909]">
          <div aria-hidden="true" className="relative flex items-center justify-center">
            {[88, 62, 38].map((size, i) => (
              <div
                key={size}
                className="absolute rounded-full border animate-pulse"
                style={{
                  width: size,
                  height: size,
                  borderColor: `rgba(175,242,40,${0.18 - i * 0.05})`,
                  animationDelay: `${i * 450}ms`,
                  animationDuration: "2.8s",
                }}
              />
            ))}
            <div
              className="relative w-11 h-11 rounded-full flex items-center justify-center"
              style={{ background: "rgba(175,242,40,0.09)", border: "1px solid rgba(175,242,40,0.25)" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="rgba(175,242,40,0.9)" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
            </div>
          </div>

          {/* Ambient glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(175,242,40,0.07) 0%, transparent 65%)" }}
          />
        </div>

        <div aria-hidden="true" className="h-px bg-white/6" />

        {/* Content */}
        <div className="px-7 pt-6 pb-8">
          <div className="flex items-center gap-2 mb-3" aria-hidden="true">
            <span className="w-4 h-px bg-[#aff228]/55" />
            <span className="font-dm text-[0.6rem] font-semibold tracking-[0.2em] uppercase text-[#aff228]/65">
              Location access
            </span>
          </div>

          <h2 id="loc-modal-title" className="font-syne font-bold text-white text-xl leading-tight mb-2.5 tracking-[-0.02em]">
            Live conditions for your run
          </h2>
          <p className="font-dm text-sm text-white/42 leading-relaxed mb-7">
            Paso fetches real-time air quality, temperature, and UV data for your exact location. Never stored, never shared.
          </p>

          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={onConfirm}
              className="group relative w-full bg-[#aff228] text-black font-dm font-bold text-sm py-3.5 rounded-2xl overflow-hidden transition-all duration-200 hover:bg-[#c5f030] hover:shadow-[0_4px_24px_rgba(175,242,40,0.3)] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2">
                Allow location access
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1.75 7h10.5M8.75 3.5 12.25 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            <button
              type="button"
              onClick={onDismiss}
              className="w-full text-white/28 hover:text-white/55 font-dm text-sm py-2.5 transition-colors duration-200 rounded-xl"
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

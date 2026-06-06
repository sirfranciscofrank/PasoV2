const NAV_LINKS = [
  { label: "Explore",       href: "#" },
  { label: "How it works",  href: "#what-you-can-find" },
];

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative w-full bg-black border-t border-white/6 overflow-hidden">

      {/* Giant faint wordmark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-syne font-bold text-white leading-none"
          style={{
            fontSize: "clamp(7rem, 20vw, 15rem)",
            opacity: 0.025,
            letterSpacing: "-0.04em",
          }}
        >
          PASO
        </span>
      </div>

      {/* Atmospheric glow — bottom center */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(175,242,40,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-16">

        {/* Top: brand left — nav right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-14">

          {/* Brand block */}
          <div className="flex flex-col gap-5 max-w-xs">
            <a href="/" className="flex items-center gap-2.5 no-underline w-fit">
              <img src="/favicon1.png" alt="Paso logo" className="h-8 w-8 rounded-lg" />
              <span className="font-syne text-[1.2rem] font-bold text-white tracking-[-0.03em] leading-none">
                Paso
              </span>
            </a>
            <p
              className="font-syne font-bold text-white/38 leading-[1.15] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.4rem)" }}
            >
              Bangkok's running guide,<br />built by runners.
            </p>
            <p className="font-dm text-[0.82rem] text-white/45 leading-[1.75]">
              Routes, clubs, and weather — everything you need to lace up and go.
            </p>
          </div>

          {/* Nav */}
          <nav
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8"
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-center gap-0 no-underline overflow-hidden"
              >
                <span
                  className="block h-px bg-[#aff228] shrink-0 transition-all duration-200"
                  style={{ width: 0 }}
                  aria-hidden="true"
                />
                <span
                  className="font-syne font-bold text-[0.78rem] text-white/50 group-hover:text-white/82 transition-all duration-200"
                  style={{ marginLeft: 0 }}
                >
                  {label}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-6" aria-hidden="true" />

        {/* Bottom strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-dm text-[0.68rem] text-white/32">
            © 2026 Paso · Bangkok, Thailand
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#aff228] animate-pulse"
                aria-hidden="true"
              />
              <span className="font-dm text-[0.65rem] text-[#aff228]/70">
                Building in public
              </span>
            </div>
            <div className="w-px h-3 bg-white/12" aria-hidden="true" />
            <a
              href="https://github.com/sirfranciscofrank"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="group flex items-center gap-1.5"
            >
              <span className="text-white/35 group-hover:text-[#aff228] transition-colors duration-200">
                <GitHubIcon />
              </span>
              <span className="font-dm text-[0.65rem] text-white/32 group-hover:text-white/58 transition-colors duration-200">
                sirfranciscofrank
              </span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

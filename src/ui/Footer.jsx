const NAV_LINKS = [
  { label: "Explore",         href: "#" },
  { label: "About",           href: "#" },
  { label: "Submit a Route",  href: "#" },
];

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/8">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">

          {/* Left — logo + tagline */}
          <div className="flex flex-col gap-2">
            <a href="/" className="flex items-center gap-2.5 no-underline w-fit">
              <img src="/favicon1.png" alt="Paso logo" className="h-7 w-7 rounded-[5px]" />
              <span className="font-syne text-[1.3rem] font-bold text-white tracking-[-0.03em] leading-none">
                Paso
              </span>
            </a>
            <p className="font-dm text-sm text-white/35 leading-relaxed">
              Discover Bangkok's best running routes.
            </p>
          </div>

          {/* Middle — nav */}
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-dm text-sm text-white/45 no-underline transition-colors duration-200 w-fit"
                style={{ "--hover-color": "#1D9E75" }}
                onMouseEnter={e => e.currentTarget.style.color = "#1D9E75"}
                onMouseLeave={e => e.currentTarget.style.color = ""}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right — built by + GitHub */}
          <div className="flex flex-col items-start sm:items-end gap-3">
            <p className="font-dm text-sm text-white/35">
              Built by <span className="text-white/60">sirfranciscofrank</span>
            </p>
            <a
              href="https://github.com/sirfranciscofrank"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="text-white/35 transition-colors duration-200"
              onMouseEnter={e => e.currentTarget.style.color = "#1D9E75"}
              onMouseLeave={e => e.currentTarget.style.color = ""}
            >
              <GitHubIcon />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

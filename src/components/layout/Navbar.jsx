import { useState, useEffect } from "react";

const NAV_LINKS = [
  { name: "How it works", href: "#what-you-can-find" },
  { name: "Communities",  href: "#communities" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          scrolled
            ? "bg-black/88 backdrop-blur-2xl border-b border-white/6 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="flex items-center justify-between px-8 md:px-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 no-underline shrink-0">
            <img src="/favicon1.png" alt="Paso logo" className="h-8 w-8 rounded-lg" />
            <span className="font-syne text-[1.2rem] font-bold text-white tracking-[-0.03em] leading-none">
              Paso
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            <ul role="list" className="flex items-center gap-0.5 m-0 p-0 list-none">
              {NAV_LINKS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-syne font-bold text-[0.73rem] tracking-[0.01em] text-white/40 hover:text-white/75 no-underline px-4 py-2 rounded-lg hover:bg-white/4 whitespace-nowrap transition-all duration-200 inline-block"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <span aria-hidden="true" className="block w-px h-4 bg-white/10 mx-2 shrink-0" />

            <button
              type="button"
              className="group inline-flex items-center gap-2 bg-[#aff228] hover:bg-[#c3ef3a] text-black rounded-full px-5 py-2.5 font-syne font-bold text-[0.72rem] tracking-[0.04em] whitespace-nowrap shrink-0 transition-all duration-200 active:scale-[0.97]"
            >
              Explore routes
              <svg
                className="w-3 h-3 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1.75 7h10.5M8.75 3.5 12.25 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-center gap-1.25 p-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              aria-hidden="true"
              className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${
                menuOpen ? "translate-y-[-6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-6"
        >
          <div
            className="absolute bottom-0 left-0 right-0 h-[40%] pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(175,242,40,0.07) 0%, transparent 70%)",
            }}
          />

          <ul role="list" className="flex flex-col items-center gap-4 m-0 p-0 list-none">
            {NAV_LINKS.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="font-syne text-[3rem] font-bold text-white/55 hover:text-[#aff228] no-underline tracking-[-0.04em] leading-none transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="w-8 h-px bg-[#aff228]/30" aria-hidden="true" />

          <button
            type="button"
            className="inline-flex items-center gap-2 bg-[#aff228] hover:bg-[#c3ef3a] text-black rounded-full px-8 py-4 font-syne font-bold text-[0.9rem] tracking-[0.04em] transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Explore routes
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M1.75 7h10.5M8.75 3.5 12.25 7l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

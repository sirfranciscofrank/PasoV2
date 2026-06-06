import { useState, useEffect } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { name: "Explore", href: "#" },
    { name: "Routes", href: "#" },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black py-5">
        <div className="flex items-center justify-between px-8 md:px-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 no-underline shrink-0">
            <img src="/favicon1.png" alt="Paso logo" className="h-7 w-7 rounded-[5px]" />
            <span className="font-syne text-[1.3rem] font-bold text-white tracking-[-0.03em] leading-none">
              Paso
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative font-dm text-sm text-white/55 hover:text-white no-underline px-4 py-2 whitespace-nowrap transition-colors duration-200"
              >
                {item.name}
                <span className="absolute bottom-1.5 left-4 right-4 h-px bg-[#aff228] rounded-sm scale-x-0 origin-left transition-transform duration-250 group-hover:scale-x-100" />
              </a>
            ))}

            <span className="block w-px h-4 bg-white/10 mx-3 shrink-0" />

            <button className="group inline-flex items-center gap-1.75 bg-[#aff228] text-black rounded-md px-5 py-2 font-dm text-[0.8125rem] font-semibold whitespace-nowrap shrink-0 transition-all duration-300 hover:translate-y-[-1.5px] hover:shadow-[0_0_0_1px_rgba(175,242,40,0.45),0_0_22px_rgba(175,242,40,0.3),0_6px_20px_rgba(0,0,0,0.4)] active:translate-y-0">
              Find a route
              <svg
                className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1.75 7h10.5M8.75 3.5 12.25 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.25 p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`block w-5 h-[1.5px] bg-white/85 rounded-sm transition-all duration-300 ${menuOpen ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white/85 rounded-sm transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-[0.4]" : ""}`} />
            <span className={`block w-5 h-[1.5px] bg-white/85 rounded-sm transition-all duration-300 ${menuOpen ? "translate-y-[-6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-5">
          <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(175,242,40,0.06)_0%,transparent_70%)] pointer-events-none" />

          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-syne text-[3rem] font-bold text-white/45 hover:text-[#aff228] no-underline tracking-[-0.04em] leading-none transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}

          <span className="block w-px h-8 bg-white/8 my-1" />

          <button
            className="font-dm inline-flex items-center gap-2 bg-[#aff228] text-black rounded-md px-8 py-3.5 text-base font-semibold mt-1"
            onClick={() => setMenuOpen(false)}
          >
            Find a route
          </button>
        </div>
      )}
    </>
  );
}

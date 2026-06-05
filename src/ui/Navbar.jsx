import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { name: "Explore", href: "#" },
    { name: "Routes", href: "#" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-10 transition-all duration-500",
          scrolled
            ? "py-3.5 bg-black/80 backdrop-blur-2xl border-b border-[#aff228]/25 shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
            : "py-5 bg-black border-b border-[#aff228]/[0.12]",
        ].join(" ")}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 no-underline shrink-0">
          <img src="/favicon1.png" alt="Paso logo" className="h-8 w-8 rounded-[6px]" />
          <span className="font-syne text-[1.375rem] font-bold text-[#FAF9F6] tracking-[-0.03em] leading-none">
            Paso
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group relative font-dm text-sm text-[#FAF9F6]/60 hover:text-[#FAF9F6] no-underline px-[15px] py-2 whitespace-nowrap transition-colors duration-[250ms]"
            >
              {item.name}
              {/* Sliding lime underline */}
              <span className="absolute bottom-1 left-[15px] right-[15px] h-[1.5px] bg-[#aff228] rounded-sm scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}

          {/* Divider */}
          <span className="block w-px h-[18px] bg-[#FAF9F6]/10 mx-3.5 shrink-0" />

          {/* CTA */}
          <button className="group inline-flex items-center gap-[7px] bg-[#aff228] text-black rounded-full px-5 py-[9px] font-dm text-[0.8125rem] font-semibold whitespace-nowrap shrink-0 transition-all duration-300 hover:-translate-y-[1.5px] hover:shadow-[0_0_0_1px_rgba(175,242,40,0.45),0_0_22px_rgba(175,242,40,0.35),0_6px_20px_rgba(0,0,0,0.4)] active:translate-y-0 active:shadow-[0_0_12px_rgba(175,242,40,0.35)]">
            Find a route
            <svg
              className="w-[14px] h-[14px] shrink-0 transition-transform duration-300 group-hover:translate-x-[2.5px]"
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
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-[22px] h-[1.5px] bg-[#FAF9F6]/85 rounded-sm transition-all duration-300 ${
              menuOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[1.5px] bg-[#FAF9F6]/85 rounded-sm transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-[0.4]" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[1.5px] bg-[#FAF9F6]/85 rounded-sm transition-all duration-300 ${
              menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-5">
          {/* Subtle lime glow at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(175,242,40,0.06)_0%,transparent_70%)] pointer-events-none" />

          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-syne text-[3rem] font-bold text-[#FAF9F6]/50 hover:text-[#aff228] no-underline tracking-[-0.04em] leading-none transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}

          <span className="block w-px h-8 bg-[#FAF9F6]/[0.08] my-1" />

          <button
            className="font-dm inline-flex items-center gap-2 bg-[#aff228] text-black rounded-full px-8 py-3.5 text-base font-semibold mt-1"
            onClick={() => setMenuOpen(false)}
          >
            Find a route
          </button>
        </div>
      )}
    </>
  );
}

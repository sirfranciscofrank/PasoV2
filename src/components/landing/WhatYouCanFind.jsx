export function WhatYouCanFind() {
  return (
    <section
      id="what-you-can-find"
      aria-label="What Paso helps you find"
      className="w-full bg-black border-t border-white/6"
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-10 md:py-14">
        <p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.25em] text-lime-400">
          What Paso helps you find
        </p>

        <h2 className="font-syne font-bold text-white leading-[1.08] tracking-[-0.045em] text-[clamp(2.25rem,5vw,4.5rem)] max-w-5xl">
          Find the route,{" "}
          <span className="text-lime-400">check the conditions,</span>{" "}
          meet the crew.
        </h2>

        <p className="mt-6 font-mono text-xs font-bold uppercase tracking-[0.22em] text-white/40">
          Start with live conditions ↓
        </p>
      </div>
    </section>
  );
}
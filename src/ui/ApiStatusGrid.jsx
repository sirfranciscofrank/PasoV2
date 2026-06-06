const cards = [
  {
    id: 1,
    label: "API One",
    description: "Short description",
    status: "online",
    detail: "Connected successfully",
  },
  {
    id: 2,
    label: "API Two",
    description: "Short description",
    status: "loading",
    detail: "Fetching data…",
  },
  {
    id: 3,
    label: "API Three",
    description: "Short description",
    status: "error",
    detail: "Unable to reach endpoint",
  },
];

const statusMap = {
  online:  { dot: "bg-[#aff228]",  pulse: false, label: "Online",    labelCls: "text-[#aff228]",  border: "border-[#aff228]/20", glow: "shadow-[0_0_40px_rgba(175,242,40,0.05)]" },
  loading: { dot: "bg-amber-400",  pulse: true,  label: "Fetching…", labelCls: "text-amber-400",  border: "border-amber-400/20", glow: "" },
  error:   { dot: "bg-red-500",    pulse: false, label: "Error",     labelCls: "text-red-400",    border: "border-red-500/20",  glow: "shadow-[0_0_40px_rgba(239,68,68,0.06)]" },
  idle:    { dot: "bg-white/20",   pulse: false, label: "Idle",      labelCls: "text-white/30",   border: "border-white/8",     glow: "" },
};

function StatusDot({ status }) {
  const { dot, pulse } = statusMap[status] ?? statusMap.idle;
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0">
      {pulse && <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dot} opacity-60`} />}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dot}`} />
    </span>
  );
}

function ApiCard({ card, index }) {
  const { label, labelCls, border, glow } = statusMap[card.status] ?? statusMap.idle;

  return (
    <div
      className={`relative flex flex-col bg-white/[0.025] border rounded-xl p-4 transition-all duration-500 hover:bg-white/[0.04] hover:border-white/15 ${border} ${glow}`}
    >
      {/* Index */}
      <span className="absolute top-3.5 right-3.5 font-syne text-[0.625rem] font-bold text-white/10 tracking-[0.2em]">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Header */}
      <div className="flex items-start gap-2.5 mb-3">
        <div className="mt-0.5">
          <StatusDot status={card.status} />
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="font-syne font-bold text-white text-sm leading-tight tracking-[-0.02em]">
            {card.label}
          </h3>
          <p className="font-dm text-[0.7rem] text-white/35 leading-snug">
            {card.description}
          </p>
        </div>
      </div>

      {/* Divider + status label */}
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/6">
        <span className={`font-dm text-[0.625rem] font-semibold tracking-[0.15em] uppercase ${labelCls}`}>
          {label}
        </span>
      </div>

      {/* Detail */}
      <p className="font-dm text-[0.7rem] text-white/30 leading-relaxed flex-1">
        {card.detail}
      </p>
    </div>
  );
}

export function ApiStatusGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-8 md:px-16 py-12">
      <div className="flex items-center gap-3 mb-3">
        <span className="block w-5 h-px bg-[#aff228]" />
        <span className="font-dm text-[0.6875rem] font-semibold tracking-[0.22em] text-[#aff228] uppercase">
          System Status
        </span>
      </div>
      <h2 className="font-syne font-bold text-white text-[clamp(1.75rem,3vw,2.5rem)] tracking-[-0.03em] leading-tight mb-2">
        API Connections
      </h2>
      <p className="font-dm text-white/35 text-sm mb-6">
        Live status for each integrated data source.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <ApiCard key={card.id} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}

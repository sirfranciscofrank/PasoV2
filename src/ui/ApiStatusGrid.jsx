import { useState } from "react";
import useAQI from "../hooks/getAQI";
import useWeather from "../hooks/getWeather";
import { LocationConsent } from "./LocationConsent";
import { computeRunScore, getRunScoreInfo, buildSummary } from "../hooks/getRunScore";

function getAQIInfo(aqi) {
  if (aqi <= 50)  return { label: "Good",      color: "#aff228", advice: "Great for running" };
  if (aqi <= 100) return { label: "Moderate",  color: "#f5c518", advice: "Caution advised" };
  if (aqi <= 150) return { label: "Sensitive", color: "#ff8c00", advice: "Limit outdoor exercise" };
  if (aqi <= 200) return { label: "Unhealthy", color: "#ff4444", advice: "Avoid outdoor running" };
  return                 { label: "Hazardous", color: "#c084fc", advice: "Stay indoors" };
}

function getTempInfo(temp) {
  if (temp <= 25) return { label: "Cool",     color: "#aff228" };
  if (temp <= 30) return { label: "Warm",     color: "#86efac" };
  if (temp <= 33) return { label: "Hot",      color: "#f5c518" };
  if (temp <= 36) return { label: "Very Hot", color: "#f97316" };
  return               { label: "Extreme",   color: "#ff4444" };
}

function getConditionsInfo(code) {
  if (code === 0 || code <= 3) return { color: "#aff228" };
  if (code <= 48)              return { color: "#f5c518" };
  if (code <= 82)              return { color: "#60a5fa" };
  return                              { color: "#ff4444" };
}

function getUVInfo(uv) {
  if (uv <= 2)  return { label: "Low",       color: "#aff228" };
  if (uv <= 5)  return { label: "Moderate",  color: "#f5c518" };
  if (uv <= 7)  return { label: "High",      color: "#f97316" };
  if (uv <= 10) return { label: "Very High", color: "#ff4444" };
  return               { label: "Extreme",   color: "#c084fc" };
}

function getWeatherDesc(code) {
  if (code === 0)  return "Clear Sky";
  if (code <= 3)   return "Partly Cloudy";
  if (code <= 48)  return "Foggy";
  if (code <= 55)  return "Drizzle";
  if (code <= 65)  return "Rainy";
  if (code <= 77)  return "Snowy";
  if (code <= 82)  return "Rain Showers";
  if (code <= 99)  return "Thunderstorm";
  return "Unknown";
}

const SKL = "animate-pulse rounded bg-white/[0.07] mx-auto";

const RING_R = 34;
const RING_CIRC = 2 * Math.PI * RING_R;

function Badge({ label, color }) {
  return (
    <span
      className="font-dm text-[0.6rem] font-semibold tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full"
      style={{ color, background: color + "1a" }}
    >
      {label}
    </span>
  );
}

function ScoreRing({ score, color }) {
  const filled = score !== null ? (score / 100) * RING_CIRC : 0;
  return (
    <svg
      width="88" height="88"
      viewBox="0 0 88 88"
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    >
      {/* Track */}
      <circle
        cx="44" cy="44" r={RING_R}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Progress arc */}
      {score !== null && (
        <circle
          cx="44" cy="44" r={RING_R}
          fill="none"
          stroke={color ?? "rgba(255,255,255,0.3)"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${RING_CIRC}`}
          transform="rotate(-90 44 44)"
          style={{ transition: "stroke-dasharray 1.1s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
      )}
    </svg>
  );
}

function RunScoreTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        aria-label="About Run Score"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="flex items-center justify-center w-3.5 h-3.5 rounded-full border border-white/18 text-white/30 hover:text-white/70 hover:border-white/40 font-dm text-[0.5rem] font-bold transition-all duration-200 cursor-default"
      >
        ?
      </button>

      <div
        role="tooltip"
        aria-hidden={!open}
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-52 bg-[#0c0c0c] border border-white/8 rounded-xl p-4 z-50 shadow-2xl shadow-black pointer-events-none transition-all duration-200 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 invisible"
        }`}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <span aria-hidden="true" className="block w-3 h-px bg-[#aff228]" />
          <p className="font-syne text-xs font-bold text-white tracking-wide">Run Score</p>
        </div>
        <p className="font-dm text-[0.65rem] text-white/50 leading-relaxed mb-3">
          A single 0–100 number that summarizes current outdoor running conditions.
        </p>
        <div className="space-y-1.5 border-t border-white/6 pt-2.5">
          {[
            ["AQI",         "Air quality"],
            ["Temperature", "Heat stress"],
            ["Rain",        "Precipitation"],
            ["UV Index",    "Sun exposure"],
          ].map(([factor, note]) => (
            <div key={factor} className="flex items-baseline justify-between gap-2">
              <span className="font-dm text-[0.6rem] font-semibold text-[#aff228]/75">{factor}</span>
              <span className="font-dm text-[0.6rem] text-white/35">{note}</span>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#0c0c0c] border-r border-b border-white/8 rotate-45" />
      </div>
    </div>
  );
}

function FeaturedScore({ score, scoreInfo, loading }) {
  return (
    <div className="w-[29%] shrink-0 flex flex-col items-center justify-center py-7 px-5 text-center gap-2.5 relative overflow-hidden">
      {/* Faint ambient glow */}
      {scoreInfo && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 60%, ${scoreInfo.color}0d 0%, transparent 65%)`,
          }}
        />
      )}

      <div className="flex items-center justify-center gap-1.5 relative">
        <span className="font-dm text-[0.65rem] font-semibold tracking-[0.2em] text-white/50 uppercase">
          Run Score
        </span>
        <RunScoreTooltip />
      </div>

      {loading ? (
        <>
          <span className="sr-only">Loading Run Score</span>
          <div aria-hidden="true" className="flex flex-col items-center gap-2.5 pt-1">
            <div className={`w-22 h-22 rounded-full ${SKL}`} />
            <div className={`h-3.5 w-14 ${SKL}`} />
            <div className={`h-3 w-20 ${SKL}`} />
          </div>
        </>
      ) : (
        <>
          <div className="relative w-22 h-22 flex items-center justify-center">
            <ScoreRing score={score} color={scoreInfo?.color} />
            <div className="relative flex flex-col items-center gap-0">
              <span
                className="font-syne font-bold leading-none tracking-[-0.04em] text-[2rem]"
                aria-label={score !== null ? `${score} out of 100` : "Score unavailable"}
                style={{ color: scoreInfo?.color ?? "white" }}
              >
                {score !== null ? score : "—"}
              </span>
              {score !== null && (
                <span aria-hidden="true" className="font-dm text-[0.55rem] text-white/28 tracking-wider mt-0.5">
                  / 100
                </span>
              )}
            </div>
          </div>

          {scoreInfo && (
            <div className="flex flex-col items-center gap-1 relative">
              <Badge label={scoreInfo.label} color={scoreInfo.color} />
              <p className="font-dm text-[0.7rem] text-white/45 leading-snug">{scoreInfo.desc}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function MetricCol({ label, primary, badge, badgeColor, valueColor, sub, loading }) {
  return (
    <dl className="flex-1 px-3.5 py-6 flex flex-col items-center justify-center text-center gap-1.5 min-w-0 relative">
      {/* Per-status top accent tick */}
      {!loading && valueColor && (
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[1.5px] rounded-full"
          style={{ background: valueColor, opacity: 0.45 }}
        />
      )}

      <dt>
        <span className="font-dm text-[0.65rem] font-semibold tracking-[0.18em] text-white/50 uppercase whitespace-nowrap">
          {label}
        </span>
      </dt>

      {loading ? (
        <>
          <dd className="sr-only">Loading {label} data</dd>
          <div aria-hidden="true" className="flex flex-col items-center gap-2 pt-1 w-full">
            <div className={`h-6 w-14 ${SKL}`} />
            <div className={`h-3.5 w-10 ${SKL}`} />
            <div className={`h-3 w-16 ${SKL}`} />
          </div>
        </>
      ) : (
        <>
          <dd
            className="font-syne font-bold text-[1.125rem] leading-none tracking-[-0.03em]"
            style={{ color: valueColor ?? "white" }}
          >
            {primary}
          </dd>
          {badge && <dd><Badge label={badge} color={badgeColor} /></dd>}
          {sub && (
            <dd className="font-dm text-[0.68rem] text-white/40 leading-snug w-full truncate mt-0.5">
              {sub}
            </dd>
          )}
        </>
      )}
    </dl>
  );
}

function IdleBody({ onOpen }) {
  return (
    <div className="flex items-center gap-6 px-6 py-5">
      {/* GPS rings */}
      <div
        aria-hidden="true"
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: 52, height: 52 }}
      >
        {[52, 36, 22].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border animate-pulse"
            style={{
              width: size,
              height: size,
              borderColor: `rgba(175,242,40,${0.15 - i * 0.04})`,
              animationDelay: `${i * 500}ms`,
              animationDuration: "2.8s",
            }}
          />
        ))}
        <div
          className="relative w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "rgba(175,242,40,0.07)", border: "1px solid rgba(175,242,40,0.18)" }}
        >
          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="rgba(175,242,40,0.65)" aria-hidden="true">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-syne font-semibold text-white/70 text-[0.875rem] leading-tight mb-0.5">
          Real-time run conditions
        </p>
        <p className="font-dm text-xs text-white/30 leading-relaxed">
          AQI, temperature, UV index and your run score — live, for where you are.
        </p>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onOpen}
        className="shrink-0 flex items-center gap-1.5 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 text-white/55 hover:text-white/85 font-dm text-xs font-semibold px-4 py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap"
      >
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="rgba(175,242,40,0.7)" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
        </svg>
        Use my location
      </button>
    </div>
  );
}

export function ApiStatusGrid() {
  const [locState, setLocState] = useState("idle"); // idle | modal | requesting | granted | denied
  const [coords, setCoords]     = useState(null);

  const { data: aqiData,     loading: aqiLoading     } = useAQI(coords);
  const { data: weatherData, loading: weatherLoading } = useWeather(coords);

  const loading        = aqiLoading || weatherLoading;
  const aqiInfo        = aqiData     ? getAQIInfo(aqiData.aqi)                   : null;
  const tempInfo       = weatherData ? getTempInfo(weatherData.temp)              : null;
  const conditionsInfo = weatherData ? getConditionsInfo(weatherData.weatherCode) : null;
  const uvInfo         = weatherData ? getUVInfo(weatherData.uvIndex)             : null;
  const runScore       = computeRunScore(aqiData, weatherData);
  const scoreInfo      = getRunScoreInfo(runScore);
  const weatherDesc    = weatherData ? getWeatherDesc(weatherData.weatherCode)    : null;
  const summary        = buildSummary(runScore, aqiData, weatherData);

  function requestLocation() {
    setLocState("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocState("granted");
      },
      () => setLocState("denied"),
    );
  }

  return (
    <>
      {locState === "modal" && (
        <LocationConsent
          onConfirm={requestLocation}
          onDismiss={() => setLocState("idle")}
        />
      )}

      <section
        aria-label="Live running conditions"
        className="w-full bg-black"
        style={{
          borderTop: `1px solid ${locState === "granted" && scoreInfo && !loading
            ? scoreInfo.color + "28"
            : "rgba(255,255,255,0.06)"
          }`,
        }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-3 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#aff228] opacity-55" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#aff228]" />
              </span>
              <span className="font-dm text-[0.65rem] font-semibold tracking-[0.2em] text-white/55 uppercase">
                Live Conditions
              </span>
              {locState === "granted" && aqiData?.station && (
                <span className="font-dm text-[0.65rem] text-white/35">· {aqiData.station}</span>
              )}
            </div>

            {/* Right: location status */}
          
            {locState === "requesting" && (
              <span className="flex items-center gap-1.5 font-dm text-[0.65rem] text-white/35">
                <span aria-hidden="true" className="inline-block w-2.5 h-2.5 border border-white/20 border-t-white/60 rounded-full animate-spin" />
                Locating…
              </span>
            )}
            {locState === "denied" && (
              <span className="font-dm text-[0.65rem] text-red-400/55">Location blocked</span>
            )}
            {locState === "granted" && (
              <span aria-hidden="true" className="font-dm text-[0.65rem] text-white/30 hidden sm:block">
                Updated just now
              </span>
            )}
          </div>

          {/* Divider */}
          <div aria-hidden="true" className="h-px bg-white/5 mx-6" />

          {/* Body */}
          {locState === "idle" || locState === "modal" ? (
            <IdleBody onOpen={() => setLocState("modal")} />
          ) : locState === "requesting" ? (
            <div className="flex items-center justify-center gap-2.5 py-8 px-6">
              <span aria-hidden="true" className="w-3 h-3 border border-white/18 border-t-white/50 rounded-full animate-spin shrink-0" />
              <p className="font-dm text-sm text-white/30">Finding your location…</p>
            </div>
          ) : locState === "denied" ? (
            <div className="flex items-center justify-center py-8 px-6">
              <p className="font-dm text-sm text-white/30 text-center">
                Location blocked — check your browser settings and{" "}
                <button
                  type="button"
                  onClick={() => setLocState("modal")}
                  className="text-white/50 hover:text-white/75 underline underline-offset-2 transition-colors"
                >
                  try again
                </button>.
              </p>
            </div>
          ) : (
            <>
              {/* Summary */}
              {summary && (
                <>
                  <div className="px-6 py-3">
                    <div className="flex items-start gap-3">
                      <div
                        aria-hidden="true"
                        className="w-0.5 self-stretch rounded-full shrink-0"
                        style={{ background: "rgba(175,242,40,0.4)", minHeight: "1em" }}
                      />
                      <p className="font-dm text-[0.8125rem] text-white/65 leading-snug">{summary}</p>
                    </div>
                  </div>
                  <div aria-hidden="true" className="h-px bg-white/5 mx-6" />
                </>
              )}

              {/* Metric columns */}
              <div className="flex divide-x divide-white/4">
                <FeaturedScore score={runScore} scoreInfo={scoreInfo} loading={loading} />

                <MetricCol
                  label="Air Quality"
                  primary={aqiData ? `AQI ${aqiData.aqi}` : "—"}
                  badge={aqiInfo?.label}
                  badgeColor={aqiInfo?.color}
                  valueColor={aqiInfo?.color}
                  sub={
                    aqiData?.pm25 != null
                      ? `PM2.5 ${aqiData.pm25} µg/m³ · ${aqiInfo?.advice}`
                      : aqiInfo?.advice
                  }
                  loading={aqiLoading}
                />

                <MetricCol
                  label="Temperature"
                  primary={weatherData ? `${weatherData.temp}°C` : "—"}
                  badge={tempInfo?.label}
                  badgeColor={tempInfo?.color}
                  valueColor={tempInfo?.color}
                  sub={
                    weatherData
                      ? [
                          `Feels ${weatherData.feelsLike}°C`,
                          aqiData?.humidity != null ? `· ${aqiData.humidity}% humidity` : null,
                        ].filter(Boolean).join(" ")
                      : undefined
                  }
                  loading={weatherLoading}
                />

                <MetricCol
                  label="Conditions"
                  primary={weatherDesc ?? "—"}
                  badge={weatherData ? `${weatherData.rainChance}% rain` : undefined}
                  badgeColor="#60a5fa"
                  valueColor={conditionsInfo?.color}
                  sub={weatherData ? `Wind ${weatherData.windSpeed} km/h` : undefined}
                  loading={weatherLoading}
                />

                <MetricCol
                  label="UV Index"
                  primary={weatherData ? `${weatherData.uvIndex}` : "—"}
                  badge={uvInfo?.label}
                  badgeColor={uvInfo?.color}
                  valueColor={uvInfo?.color}
                  sub={
                    weatherData
                      ? weatherData.uvIndex >= 6
                        ? "Apply SPF 50+"
                        : "Low UV risk today"
                      : undefined
                  }
                  loading={weatherLoading}
                />
              </div>
            </>
          )}

          <div aria-hidden="true" className="h-1" />
        </div>
      </section>
    </>
  );
}

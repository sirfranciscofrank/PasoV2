import { useState } from "react";
import useAQI from "../hooks/getAQI";
import useWeather from "../hooks/getWeather";

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
  if (code <= 65)              return { color: "#60a5fa" };
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

function computeRunScore(aqiData, weatherData) {
  if (!aqiData || !weatherData) return null;
  let score = 100;

  const aqi = aqiData.aqi;
  if (aqi > 200)      score -= 45;
  else if (aqi > 150) score -= 35;
  else if (aqi > 100) score -= 20;
  else if (aqi > 50)  score -= 8;

  const t = weatherData.temp;
  if (t > 38)      score -= 25;
  else if (t > 35) score -= 15;
  else if (t > 32) score -= 8;
  else if (t < 15) score -= 10;

  if (weatherData.rainChance > 70)      score -= 20;
  else if (weatherData.rainChance > 40) score -= 10;
  else if (weatherData.rainChance > 20) score -= 4;

  if (weatherData.uvIndex >= 11)     score -= 15;
  else if (weatherData.uvIndex >= 8) score -= 10;
  else if (weatherData.uvIndex >= 6) score -= 5;

  return Math.max(0, Math.min(100, score));
}

function getRunScoreInfo(score) {
  if (score === null) return null;
  if (score >= 80) return { label: "Optimal", color: "#aff228", desc: "Perfect for a long run" };
  if (score >= 65) return { label: "Good",    color: "#86efac", desc: "Go for it" };
  if (score >= 45) return { label: "Fair",    color: "#f5c518", desc: "Manageable, stay hydrated" };
  if (score >= 25) return { label: "Poor",    color: "#f97316", desc: "Tough conditions" };
  return                  { label: "Avoid",   color: "#ff4444", desc: "Skip the run today" };
}

const SKL = "animate-pulse rounded bg-white/[0.07] mx-auto";

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
        className="flex items-center justify-center w-3.5 h-3.5 rounded-full border border-white/20 text-white/35 hover:text-white/75 hover:border-white/45 font-dm text-[0.5rem] font-bold transition-all duration-200 cursor-default"
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
        {/* Caret */}
        <div aria-hidden="true" className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#0c0c0c] border-r border-b border-white/8 rotate-45" />
      </div>
    </div>
  );
}

function MetricCol({ label, primary, badge, badgeColor, valueColor, sub, loading, isScore, showTooltip }) {
  return (
    <dl className={`flex-1 px-4 py-6 flex flex-col items-center text-center gap-1.5 min-w-0 ${isScore ? "bg-white/2" : ""}`}>
      <dt>
        <div className="flex items-center justify-center gap-1.5">
          <span className="font-dm text-xs font-semibold tracking-[0.18em] text-white/65 uppercase whitespace-nowrap">
            {label}
          </span>
          {showTooltip && <RunScoreTooltip />}
        </div>
      </dt>

      {loading ? (
        <>
          <dd className="sr-only">Loading {label} data</dd>
          <div aria-hidden="true" className="flex flex-col items-center gap-2 pt-1 w-full">
            <div className={`h-6 w-16 ${SKL}`} />
            <div className={`h-4 w-12 ${SKL}`} />
            <div className={`h-3 w-20 ${SKL}`} />
          </div>
        </>
      ) : (
        <>
          <dd
            className={`font-syne font-bold leading-none tracking-[-0.03em] ${isScore ? "text-2xl" : "text-xl"}`}
            aria-label={isScore && primary !== "—" ? `${primary} out of 100` : undefined}
            style={{ color: valueColor ?? "white" }}
          >
            {primary}
            {isScore && (
              <span aria-hidden="true" className="text-sm text-white/50 font-dm font-normal tracking-normal ml-0.5">/100</span>
            )}
          </dd>
          {badge && (
            <dd><Badge label={badge} color={badgeColor} /></dd>
          )}
          {sub && (
            <dd className="font-dm text-[0.72rem] text-white/60 leading-snug w-full truncate">
              {sub}
            </dd>
          )}
        </>
      )}
    </dl>
  );
}

export function ApiStatusGrid() {
  const { data: aqiData,     loading: aqiLoading     } = useAQI();
  const { data: weatherData, loading: weatherLoading } = useWeather();

  const loading        = aqiLoading || weatherLoading;
  const aqiInfo        = aqiData     ? getAQIInfo(aqiData.aqi)                   : null;
  const tempInfo       = weatherData ? getTempInfo(weatherData.temp)              : null;
  const conditionsInfo = weatherData ? getConditionsInfo(weatherData.weatherCode) : null;
  const uvInfo         = weatherData ? getUVInfo(weatherData.uvIndex)             : null;
  const runScore       = computeRunScore(aqiData, weatherData);
  const scoreInfo      = getRunScoreInfo(runScore);
  const weatherDesc    = weatherData ? getWeatherDesc(weatherData.weatherCode)    : null;

  return (
    <section aria-label="Live running conditions" className="w-full bg-black border-t border-white/6">
      <div className="max-w-7xl mx-auto">

        {/* Live header */}
        <div className="flex items-center justify-between px-6 pt-3.5 pb-3">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#aff228] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#aff228]" />
            </span>
            <span className="font-dm text-xs font-semibold tracking-[0.18em] text-white/65 uppercase">
              Live Conditions
            </span>
            {aqiData?.station && (
              <span className="font-dm text-xs text-white/50">
                · {aqiData.station}
              </span>
            )}
          </div>
          <span aria-hidden="true" className="font-dm text-xs text-white/40 hidden sm:block">
            Updated just now
          </span>
        </div>

        {/* Rule */}
        <div aria-hidden="true" className="h-px bg-white/5 mx-6" />

        {/* Metric columns */}
        <div className="flex divide-x divide-white/5">

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
                  ? "Apply SPF 50+ sunscreen"
                  : "Low UV risk today"
                : undefined
            }
            loading={weatherLoading}
          />

          <MetricCol
            label="Run Score"
            showTooltip
            primary={runScore !== null ? `${runScore}` : "—"}
            badge={scoreInfo?.label}
            badgeColor={scoreInfo?.color}
            valueColor={scoreInfo?.color}
            sub={scoreInfo?.desc}
            loading={loading}
            isScore
          />

        </div>

        <div aria-hidden="true" className="h-1" />
      </div>
    </section>
  );
}

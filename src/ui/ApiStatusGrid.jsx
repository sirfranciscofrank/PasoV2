import useAQI from "../hooks/getAQI";
import useWeather from "../hooks/getWeather";

function getAQIInfo(aqi) {
  if (aqi <= 50)  return { label: "Good",      color: "#aff228", advice: "Safe to run outdoors" };
  if (aqi <= 100) return { label: "Moderate",  color: "#f5c518", advice: "Caution for sensitive runners" };
  if (aqi <= 150) return { label: "Sensitive", color: "#ff8c00", advice: "Limit outdoor exercise" };
  if (aqi <= 200) return { label: "Unhealthy", color: "#ff4444", advice: "Avoid outdoor running" };
  return                  { label: "Hazardous",color: "#c084fc", advice: "Stay indoors" };
}

function getWeatherDesc(code) {
  if (code === 0) return "Clear sky";
  if (code <= 3)  return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 55) return "Drizzle";
  if (code <= 65) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Rain showers";
  if (code <= 99) return "Thunderstorm";
  return "Unknown";
}

const WindIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
  </svg>
);

const ThermIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
  </svg>
);

const CloudIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
    <line x1="11" y1="13" x2="11" y2="17" />
    <line x1="8"  y1="13" x2="8"  y2="17" />
    <line x1="14" y1="13" x2="14" y2="17" />
  </svg>
);

function Col({ icon, iconColor, label, sub, children }) {
  return (
    <div className="flex-1 flex items-center gap-3 px-6 py-4">
      <span className="shrink-0 opacity-75" style={{ color: iconColor }}>{icon}</span>
      <div className="min-w-0">
        <p className="font-dm text-[0.6rem] font-semibold tracking-[0.18em] text-white/30 uppercase mb-0.5">
          {label}
        </p>
        <div className="flex items-center gap-2 mb-0.5">{children}</div>
        <p className="font-dm text-[0.65rem] text-white/28 truncate">{sub}</p>
      </div>
    </div>
  );
}

export function ApiStatusGrid() {
  const { data: aqi,     loading: aqiLoading     } = useAQI();
  const { data: weather, loading: weatherLoading } = useWeather();

  const aqiInfo = aqi ? getAQIInfo(aqi.aqi) : null;

  return (
    <div className="w-full border-t border-white/5">
      <div className="max-w-7xl mx-auto flex divide-x divide-white/5">

        {/* Air Quality */}
        <Col
          icon={<WindIcon />}
          iconColor={aqiInfo?.color ?? "#aff228"}
          label="Air Quality"
          sub={aqiLoading ? "Fetching…" : (aqiInfo?.advice ?? "—")}
        >
          {aqiLoading ? (
            <span className="font-syne font-bold text-white/20 text-sm animate-pulse">AQI —</span>
          ) : (
            <>
              <span className="font-syne font-bold text-white text-sm tracking-[-0.02em]">
                AQI {aqi?.aqi}
              </span>
              {aqiInfo && (
                <span
                  className="font-dm text-[0.6rem] font-semibold tracking-widest uppercase px-1.5 py-0.5 rounded-full"
                  style={{ color: aqiInfo.color, background: aqiInfo.color + "22" }}
                >
                  {aqiInfo.label}
                </span>
              )}
            </>
          )}
        </Col>

        {/* Temperature */}
        <Col
          icon={<ThermIcon />}
          iconColor="#f97316"
          label="Temperature"
          sub={weatherLoading ? "Fetching…" : (weather ? `Feels like ${weather.feelsLike}°C` : "—")}
        >
          {weatherLoading ? (
            <span className="font-syne font-bold text-white/20 text-sm animate-pulse">—°C</span>
          ) : (
            <span className="font-syne font-bold text-white text-sm tracking-[-0.02em]">
              {weather?.temp ?? "—"}°C
            </span>
          )}
        </Col>

        {/* Weather */}
        <Col
          icon={<CloudIcon />}
          iconColor="#60a5fa"
          label="Weather"
          sub={weatherLoading ? "Fetching…" : (weather ? `${weather.rainChance}% rain · Wind ${weather.windSpeed} km/h` : "—")}
        >
          {weatherLoading ? (
            <span className="font-syne font-bold text-white/20 text-sm animate-pulse">—</span>
          ) : (
            <span className="font-syne font-bold text-white text-sm tracking-[-0.02em]">
              {weather ? getWeatherDesc(weather.weatherCode) : "—"}
            </span>
          )}
        </Col>

      </div>
    </div>
  );
}

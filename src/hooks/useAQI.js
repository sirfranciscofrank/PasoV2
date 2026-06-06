import { useState, useEffect } from "react";

export function getAQIInfo(aqi) {
  if (aqi <= 50)  return { label: "Good",      color: "#aff228", advice: "Great for running" };
  if (aqi <= 100) return { label: "Moderate",  color: "#f5c518", advice: "Caution advised" };
  if (aqi <= 150) return { label: "Sensitive", color: "#ff8c00", advice: "Limit outdoor exercise" };
  if (aqi <= 200) return { label: "Unhealthy", color: "#ff4444", advice: "Avoid outdoor running" };
  return                 { label: "Hazardous", color: "#c084fc", advice: "Stay indoors" };
}

export function getTempInfo(temp) {
  if (temp <= 25) return { label: "Cool",     color: "#aff228" };
  if (temp <= 30) return { label: "Warm",     color: "#86efac" };
  if (temp <= 33) return { label: "Hot",      color: "#f5c518" };
  if (temp <= 36) return { label: "Very Hot", color: "#f97316" };
  return               { label: "Extreme",   color: "#ff4444" };
}

export function getConditionsInfo(code) {
  if (code === 0 || code <= 3) return { color: "#aff228" };
  if (code <= 48)              return { color: "#f5c518" };
  if (code <= 82)              return { color: "#60a5fa" };
  return                              { color: "#ff4444" };
}

export function getUVInfo(uv) {
  if (uv <= 2)  return { label: "Low",       color: "#aff228" };
  if (uv <= 5)  return { label: "Moderate",  color: "#f5c518" };
  if (uv <= 7)  return { label: "High",      color: "#f97316" };
  if (uv <= 10) return { label: "Very High", color: "#ff4444" };
  return               { label: "Extreme",   color: "#c084fc" };
}

export function getWeatherDesc(code) {
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

const token = import.meta.env.VITE_WAQI_TOKEN;

const useAQI = (coords) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coords) return;

    setLoading(true);
    setData(null);
    setError(null);

    const fetchAQI = async () => {
      try {
        const res = await fetch(
          `https://api.waqi.info/feed/geo:${coords.lat};${coords.lng}/?token=${token}`
        );
        const json = await res.json();

        if (json.status !== "ok") throw new Error("AQI fetch failed");

        setData({
          aqi:      json.data.aqi,
          pm25:     json.data.iaqi?.pm25?.v ?? null,
          temp:     json.data.iaqi?.t?.v    ?? null,
          humidity: json.data.iaqi?.h?.v    ?? null,
          station:  json.data.city?.name,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAQI();
  }, [coords?.lat, coords?.lng]);

  return { data, loading, error };
};

export default useAQI;

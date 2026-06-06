import { useState, useEffect } from "react";

console.log('AQI KEY:', import.meta.env.VITE_WAQI_TOKEN);

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

import { useState, useEffect } from "react";
import { getLocation } from "./getLocation";

const token = import.meta.env.VITE_WAQI_TOKEN;

const useAQI = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAQI = async () => {
      try {
        const { lat, lng } = await getLocation();
        const res = await fetch(
          `https://api.waqi.info/feed/geo:${lat};${lng}/?token=${token}`
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
  }, []);

  return { data, loading, error };
};

export default useAQI;

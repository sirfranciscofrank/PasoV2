import { useState, useEffect } from "react";
import { getLocation } from "./getLocation";

const useWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { lat, lng } = await getLocation();
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m,uv_index&timezone=Asia%2FBangkok`;
        const res = await fetch(url);
        const json = await res.json();

        if (!json.current) throw new Error("Weather fetch failed");

        const c = json.current;
        setData({
          temp:        c.temperature_2m,
          feelsLike:   c.apparent_temperature,
          rainChance:  c.precipitation_probability,
          weatherCode: c.weathercode,
          windSpeed:   c.windspeed_10m,
          uvIndex:     c.uv_index,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { data, loading, error };
};

export default useWeather;

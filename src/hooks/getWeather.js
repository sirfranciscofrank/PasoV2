import { useState, useEffect } from "react";

const useWeather = (coords) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!coords) return;

    setLoading(true);
    setData(null);
    setError(null);

    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,apparent_temperature,precipitation_probability,weathercode,windspeed_10m,uv_index&timezone=Asia%2FBangkok`;
        const res = await fetch(url);
        const json = await res.json();

        if (!json.current) throw new Error("Weather fetch failed");

        const current = json.current;
        setData({
          temp:        current.temperature_2m,
          feelsLike:   current.apparent_temperature,
          rainChance:  current.precipitation_probability,
          weatherCode: current.weathercode,
          windSpeed:   current.windspeed_10m,
          uvIndex:     current.uv_index,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords?.lat, coords?.lng]);

  return { data, loading, error };
};

export default useWeather;

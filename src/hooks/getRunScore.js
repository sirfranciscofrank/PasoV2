export function computeRunScore(aqiData, weatherData) {
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

export function getRunScoreInfo(score) {
  if (score === null) return null;
  if (score >= 80) return { label: "Optimal", color: "#aff228", desc: "Perfect for a long run" };
  if (score >= 65) return { label: "Good",    color: "#86efac", desc: "Go for it" };
  if (score >= 45) return { label: "Fair",    color: "#f5c518", desc: "Manageable, stay hydrated" };
  if (score >= 25) return { label: "Poor",    color: "#f97316", desc: "Tough conditions" };
  return                  { label: "Avoid",   color: "#ff4444", desc: "Skip the run today" };
}

export function buildSummary(runScore, aqiData, weatherData) {
  if (runScore === null || !aqiData || !weatherData) return null;

  const opening =
    runScore >= 80 ? "Great time for a run" :
    runScore >= 65 ? "Good time for a run" :
    runScore >= 45 ? "Manageable conditions" :
    runScore >= 25 ? "Tough conditions today" :
                     "Best to skip the run today";

  const factors = [];

  if (aqiData.aqi <= 50)       factors.push("clean air");
  else if (aqiData.aqi <= 100) factors.push("moderate air quality");
  else if (aqiData.aqi <= 150) factors.push("poor air quality");
  else                         factors.push("hazardous air");

  if (weatherData.temp <= 25)      factors.push("cool temperature");
  else if (weatherData.temp <= 30) factors.push("comfortable temperature");
  else if (weatherData.temp <= 33) factors.push("warm weather");
  else if (weatherData.temp <= 36) factors.push("hot conditions");
  else                             factors.push("extreme heat");

  if (weatherData.uvIndex <= 2)      factors.push("low UV");
  else if (weatherData.uvIndex <= 5) factors.push("moderate UV");
  else if (weatherData.uvIndex <= 7) factors.push("high UV");
  else                               factors.push("very high UV");

  if (weatherData.rainChance >= 60)      factors.push("heavy rain chance");
  else if (weatherData.rainChance >= 30) factors.push(`${weatherData.rainChance}% rain chance`);

  const top = factors.slice(0, 3);
  const joined =
    top.length === 1 ? top[0] :
    top.length === 2 ? `${top[0]} and ${top[1]}` :
    `${top[0]}, ${top[1]}, and ${top[2]}`;

  return `${opening} — ${joined}.`;
}

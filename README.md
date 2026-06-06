# Paso

<img src="public/favicon1.png" alt="Paso logo" width="100" />

**Find your pace. Find your people.**

Paso is a web app for runners in Bangkok to find compatible running partners and coordinate runs more easily.

Runners can match by pace, location, time of day, and run type. Paso also helps runners discover group runs, community events, and curated Bangkok routes with weather and air quality information.

---

## Stack

- **React 19** + **Vite**
- **Tailwind CSS v4**
- ESLint with React Hooks plugin

## APIs

| API | Provider | Used for |
|-----|----------|----------|
| **Air Quality (AQI)** | [WAQI](https://waqi.info/) | Real-time AQI, PM2.5, humidity by GPS coordinates |
| **Weather** | [Open-Meteo](https://open-meteo.com/) | Temperature, feels-like, rain chance, wind speed, UV index, weather code |
| **Geolocation** | Browser (`navigator.geolocation`) | User coordinates — requested on demand, never stored |

> The **Run Score** (0–100) is computed client-side from the above data — no additional API required.

## Getting Started

```bash
npm install
npm run dev
```

## Status

No deadline. No rush. Built in public by a beginner.

This is a full rebuild in React — the previous version taught me enough to know it needed to be rewritten. Progress is real but slow, code gets rewritten as I improve, and nothing ships until I actually understand it.

If you're a Bangkok runner, this is being built for you.
If you're learning to code, maybe this build log helps you too.

## Why This Exists

I run in Bangkok. Finding people to run with, tracking local races, and connecting with the running community here is messier than it should be. So I'm building the thing I actually want to use.

---

> **Find your running people in Bangkok — matched by pace, place, and time.**

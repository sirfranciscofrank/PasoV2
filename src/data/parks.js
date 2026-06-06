import lumphini from "../assets/parkimages/lumphini.webp";
import benjakitti from "../assets/parkimages/benjakitti.webp";
import suanLuang from "../assets/parkimages/suan-luang.webp";

export const PARKS = [
  {
    id: 1,
    name: "Lumphini Park",
    area: "Pathum Wan",
    district: "Pathum Wan",
    city: "Bangkok",
    img: lumphini,

    tags: ["Popular", "Flat path", "Good for jogging"],
    runType: "Easy city run",
    vibe: "Classic central Bangkok park with lake and shade",
    routeHint: "Popular loop-style running path around the park",
    approxLoopDistance: "Around 2.5 km",
    surface: "Paved park paths",

    openingHours: "04:30–22:00",
    locationLink: "https://www.google.com/maps/search/?api=1&query=Lumphini+Park+Bangkok",
    sourceNote: "Loop distance and park info should be treated as approximate.",
  },
  {
    id: 2,
    name: "Benjakitti Park",
    area: "Khlong Toei",
    district: "Khlong Toei",
    city: "Bangkok",
    img: benjakitti,

    tags: ["Scenic", "Lake view", "Good for evening run"],
    runType: "Scenic park run",
    vibe: "Urban park with lake, forest park area, walkways, and city views",
    routeHint: "Good for relaxed jogging, walking, and connecting toward Lumphini via the Green Bridge",
    approxLoopDistance: "Around 2.8 km jogging track",
    surface: "Paved paths and elevated walkways",

    openingHours: "04:30–21:00",
    locationLink: "https://www.google.com/maps/search/?api=1&query=Benjakitti+Park+Bangkok",
    sourceNote: "Benjakitti has park, forest park, walking, jogging, and cycling areas.",
  },
  {
    id: 3,
    name: "Suan Luang Rama IX",
    area: "Prawet",
    district: "Prawet",
    city: "Bangkok",
    img: suanLuang,

    tags: ["Large park", "Quiet", "Longer run"],
    runType: "Longer relaxed run",
    vibe: "Large botanical-style park with gardens, lake, and open green space",
    routeHint: "Good for slower longer runs or relaxed walking in a large park",
    approxLoopDistance: "Around 4.9–5.6 km route depending on path",
    surface: "Paved park paths",

    openingHours: "05:00–19:00",
    locationLink: "https://www.google.com/maps/search/?api=1&query=Suan+Luang+Rama+IX+Bangkok",
    sourceNote: "Route length varies by path; avoid showing this as exact.",
  },
];

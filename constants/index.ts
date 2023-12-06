export const API_BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${process.env.EXPO_PUBLIC_NASA_API_KEY}`;

export const highEnergyUnpleasantEmotions = [
  "Uneasy",
  "Peeved",
  "Nervous",
  "Worried",
  "Troubled",
  "Contempt",
  "Envious",
  "Repulsed",
  "Frustrated",
  "Embarrassed",
  "Concerned",
  "Tense",
  "Confused",
  "Fomo",
  "Jittery",
  "Angry",
  "Scared",
  "Jealous"
];

export const highEnergyPleasantEmotions = [
  "Accomplished",
  "Hopeful",
  "Wishful",
  "Delighted",
  "Playful",
  "Pleased",
  "Challenged",
  "Engaged",
  "Confident",
  "Alive",
  "Focused",
  "Pleasant",
  "Optimistic",
  "Motivated",
  "Happy",
  "Upbeat",
  "Curious",
  "Cheerful"
];
export const emotions = [
  ...highEnergyUnpleasantEmotions,
  ...highEnergyPleasantEmotions
];

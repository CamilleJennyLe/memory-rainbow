import type { DeckConfig } from "../card-deck/card-deck.type";

export function saveDeckConfig(config: DeckConfig) {
  try {
    localStorage.setItem("deck-config", JSON.stringify(config));
  } catch (error) {
    console.error("Failed to save card deck config to localStorage:", error);
  }
}
export function getDeckConfig(): DeckConfig {
  try {
    const config = localStorage.getItem("deck-config");
    return config
      ? JSON.parse(config)
      : { includeRainbow: true, includeCats: false };
  } catch (error) {
    console.error("Failed to get card deck config from localStorage:", error);
    return { includeRainbow: true, includeCats: false };
  }
}

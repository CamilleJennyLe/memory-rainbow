import { aquaticImageUrls } from "../card/aquatic/aquatic";
import { catImageUrls } from "../card/cats/cats";
import { useDeckStore } from "../card-deck/card-deck-store/card-deck.store";

function preloadImages(urls: string[]): void {
  for (const url of urls) {
    const img = new Image();
    img.src = url;
  }
}

function preloadCatDeck(): void {
  const { config } = useDeckStore.getState();
  if (!config.includeCats) return;
  preloadImages(catImageUrls);
}

function preloadAquaticDeck(): void {
  const { config } = useDeckStore.getState();
  if (!config.includeAquatic) return;
  preloadImages(aquaticImageUrls);
}

export function preloadAllDecks(): void {
  const { config } = useDeckStore.getState();
  if (config.includeCats) {
    preloadCatDeck();
  }
  if (config.includeAquatic) {
    preloadAquaticDeck();
  }
}

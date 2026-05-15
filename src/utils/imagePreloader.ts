import ventreImage from "../assets/cats/chat_blanc_ventre.png";
import rondImage from "../assets/cats/chat_blond_rond.png";
import briocheImage from "../assets/cats/chat_brioche.png";
import allongeCoteImage from "../assets/cats/chat_british_allongé_coté.png";
import toiletteVentreImage from "../assets/cats/chat_calico_toilette_ventre.png";
import toilettePatteImage from "../assets/cats/chat_noir_toilette.png";
import feuleImage from "../assets/cats/chat_zoro_feule.png";
import { catDeck } from "../card-deck/card-deck";
import { useDeckStore } from "../card-deck/card-deck-store/card-deck.store";

const catClassToImage: Record<string, string> = {
  ventre: ventreImage,
  rond: rondImage,
  brioche: briocheImage,
  allonge__cote: allongeCoteImage,
  toilette__ventre: toiletteVentreImage,
  toilette__patte: toilettePatteImage,
  feule: feuleImage,
};

export function getCatImageUrl(className: string): string | undefined {
  return catClassToImage[className];
}

export function preloadImages(urls: string[]): void {
  for (const url of urls) {
    const img = new Image();
    img.src = url;
  }
}

export function preloadCatDeck(): void {
  const { config } = useDeckStore.getState();
  if (!config.includeCats) return;
  const urls: string[] = [];
  for (const card of catDeck) {
    const url = getCatImageUrl(card.cardClassName);
    if (url) urls.push(url);
  }
  preloadImages(urls);
}

export function preloadAllDecks(): void {
  preloadCatDeck();
}

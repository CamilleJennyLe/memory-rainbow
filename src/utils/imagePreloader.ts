import ventreImage from "../assets/cats/chat_blanc_ventre.png";
import rondImage from "../assets/cats/chat_blond_rond.png";
import briocheImage from "../assets/cats/chat_brioche.png";
import allongeCoteImage from "../assets/cats/chat_british_allongé_coté.png";
import toiletteVentreImage from "../assets/cats/chat_calico_toilette_ventre.png";
import toilettePatteImage from "../assets/cats/chat_noir_toilette.png";
import feuleImage from "../assets/cats/chat_zoro_feule.png";
import chatonsImage from "../assets/cats/chatons.png";
import chatCartonImage from "../assets/cats/chat_carton.png";
import chatPanierImage from "../assets/cats/chat_panier.png";
import chatPouletRotiImage from "../assets/cats/chat_poulet_roti.png";
import mamanChatonsImage from "../assets/cats/maman_chatons.png";
import { useDeckStore } from "../card-deck/card-deck-store/card-deck.store";

export function preloadImages(urls: string[]): void {
  for (const url of urls) {
    const img = new Image();
    img.src = url;
  }
}

export function preloadCatDeck(): void {
  const { config } = useDeckStore.getState();
  if (!config.includeCats) return;
  const urls = [
    ventreImage,
    rondImage,
    briocheImage,
    allongeCoteImage,
    toiletteVentreImage,
    toilettePatteImage,
    feuleImage,
    chatonsImage,
    chatCartonImage,
    chatPanierImage,
    chatPouletRotiImage,
    mamanChatonsImage,
  ];
  preloadImages(urls);
}

export function preloadAllDecks(): void {
  preloadCatDeck();
}

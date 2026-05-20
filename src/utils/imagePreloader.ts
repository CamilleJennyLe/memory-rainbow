import poissonClownImage from "../assets/aquatic/poisson_clown.png";
import bulotsImage from "../assets/aquatic/bulots.png";
import huitreImage from "../assets/aquatic/huitre.png";
import crevettesImage from "../assets/aquatic/crevettes.png";
import baleineImage from "../assets/aquatic/baleine.png";
import tortuesMarinesImage from "../assets/aquatic/tortues marines.png";
import concombreImage from "../assets/aquatic/concombre.png";
import requinBlancImage from "../assets/aquatic/requin_blanc.png";
import sireneImage from "../assets/aquatic/sirene.png";
import mureneImage from "../assets/aquatic/murene.png";
import neonImage from "../assets/aquatic/neon.png";
import poissonRougeImage from "../assets/aquatic/poisson_rouge.png";
import requinMarteauImage from "../assets/aquatic/requin_marteau.png";
import hippocampesImage from "../assets/aquatic/hippocampes.png";
import recifCoralienImage from "../assets/aquatic/recif_coralien.png";
import poissonGlobeImage from "../assets/aquatic/poisson_globe.png";
import pieuvreImage from "../assets/aquatic/pieuvre.png";
import homardImage from "../assets/aquatic/homard.png";
import medusesImage from "../assets/aquatic/meduses.png";
import alguesImage from "../assets/aquatic/algues.png";
import foguImage from "../assets/aquatic/fogu.png";
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

function preloadImages(urls: string[]): void {
  for (const url of urls) {
    const img = new Image();
    img.src = url;
  }
}

function preloadCatDeck(): void {
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

function preloadAquaticDeck(): void {
  const { config } = useDeckStore.getState();
  if (!config.includeAquatic) return;
  const urls = [
    poissonClownImage,
    bulotsImage,
    huitreImage,
    crevettesImage,
    baleineImage,
    tortuesMarinesImage,
    concombreImage,
    requinBlancImage,
    sireneImage,
    mureneImage,
    neonImage,
    poissonRougeImage,
    requinMarteauImage,
    hippocampesImage,
    recifCoralienImage,
    poissonGlobeImage,
    pieuvreImage,
    homardImage,
    medusesImage,
    alguesImage,
    foguImage,
  ];
  preloadImages(urls);
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

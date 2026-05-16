export const catBelly = "ventre";
export const catRond = "rond";
export const catBrioche = "brioche";
export const catAllongeCote = "allonge__cote";
export const catToiletteVentre = "toilette__ventre";
export const catToilettePatte = "toilette__patte";
export const catFeule = "feule";
export const catOns = "chatons";
export const catCarton = "carton";
export const catPanier = "panier";
export const catPouletRoti = "poulet-roti";
export const catMamanChatons = "maman-chatons";
export const catClassNames: CatClassName[] = [
  catBelly,
  catRond,
  catBrioche,
  catAllongeCote,
  catToiletteVentre,
  catToilettePatte,
  catFeule,
  catOns,
  catCarton,
  catPanier,
  catPouletRoti,
  catMamanChatons,
];

export type CatClassName =
  | typeof catBelly
  | typeof catRond
  | typeof catBrioche
  | typeof catAllongeCote
  | typeof catToiletteVentre
  | typeof catToilettePatte
  | typeof catFeule
  | typeof catOns
  | typeof catCarton
  | typeof catPanier
  | typeof catPouletRoti
  | typeof catMamanChatons;

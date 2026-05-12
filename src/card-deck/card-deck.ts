import type { CardState } from "../board/card.types";
import {
  catAllongeCote,
  catBelly,
  catBrioche,
  catFeule,
  catRond,
  catToilettePatte,
  catToiletteVentre,
} from "../card/cats/cats.type";
import {
  red,
  orange,
  yellow,
  green,
  blue,
  purple,
} from "../card/rainbow/rainbow.type";

export const rainbowDeck: CardState[] = [
  { cardClassName: red },
  { cardClassName: orange },
  { cardClassName: yellow },
  { cardClassName: green },
  { cardClassName: blue },
  { cardClassName: purple },
];

export const catDeck: CardState[] = [
  { cardClassName: catBelly },
  { cardClassName: catRond },
  { cardClassName: catBrioche },
  { cardClassName: catAllongeCote },
  { cardClassName: catToiletteVentre },
  { cardClassName: catToilettePatte },
  { cardClassName: catFeule },
];

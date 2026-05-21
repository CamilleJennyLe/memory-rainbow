import type { CardState } from "../board/card.types";
import { aquaticClassNames } from "../card/aquatic/aquatic.type";
import { catClassNames, getCatCardStyle } from "../card/cats/cats";
import {
  blue,
  green,
  orange,
  purple,
  red,
  yellow,
} from "../card/rainbow/rainbow.type";

export const rainbowDeck: CardState[] = [
  { cardClassName: red },
  { cardClassName: orange },
  { cardClassName: yellow },
  { cardClassName: green },
  { cardClassName: blue },
  { cardClassName: purple },
];

export const catDeck: CardState[] = catClassNames.map((className) => ({
  cardClassName: className,
  faceStyle: getCatCardStyle(className),
}));

export const aquaticDeck: CardState[] = aquaticClassNames.map((className) => ({
  cardClassName: className,
}));

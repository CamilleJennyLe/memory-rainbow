import type { CardColor } from "../card/rainbow/rainbow.type";
import type { CatClassName } from "../card/cats/cats.type";

export type CardClassName = CardColor | CatClassName;
export interface CardState {
  cardClassName: CardClassName;
  flipped?: boolean;
  pairFound?: boolean;
}

import type { AquaticClassName } from "../card/aquatic/aquatic.type";
import type { CardColor } from "../card/rainbow/rainbow.type";
import type { CatClassName } from "../card/cats/cats.type";

export type CardClassName = CardColor | CatClassName | AquaticClassName;
export interface CardState {
  cardClassName: CardClassName;
  flipped?: boolean;
  pairFound?: boolean;
}

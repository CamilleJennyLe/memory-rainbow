import type { CSSProperties } from "react";
import type { AquaticClassName } from "../card/aquatic/aquatic";
import type { CardColor } from "../card/rainbow/rainbow.type";
import type { CatClassName } from "../card/cats/cats.type";

export type CardClassName = CardColor | CatClassName | AquaticClassName;
export interface CardState {
  cardClassName: CardClassName;
  faceStyle?: CSSProperties;
  flipped?: boolean;
  pairFound?: boolean;
}

export const red = "red";
export const orange = "orange";
export const yellow = "yellow";
export const green = "green";
export const blue = "blue";
export const purple = "purple";

type CardColor =
  | typeof red
  | typeof orange
  | typeof yellow
  | typeof green
  | typeof blue
  | typeof purple;

export interface CardState {
  color: CardColor;
  flipped?: boolean;
  pairFound?: boolean;
}

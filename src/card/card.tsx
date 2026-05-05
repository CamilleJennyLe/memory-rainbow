import type { CardColor } from "./card-colors";
import "./card.css";

interface CardProps {
  colorClassName: CardColor;
}
function Card({ colorClassName }: CardProps) {
  return <div className={`card ${colorClassName}`} />;
}

export default Card;

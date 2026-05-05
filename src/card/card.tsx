import { useState } from "react";
import type { CardColor } from "./card-colors";
import "./card.css";

interface CardProps {
  cardFrontClassname: CardColor;
}
function Card({ cardFrontClassname }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
      className={`card ${isFlipped ? cardFrontClassname : "card-back"}`}
      onClick={() => setIsFlipped(true)}
    />
  );
}

export default Card;

import type { CardColor, CardState } from "../shared/types/card.types";
import "./card.css";
import { useBoardStore } from "../board/board.store";

interface CardProps {
  cardFrontClassname: CardColor;
  cardState: CardState;
  index: number;
}
function Card({ cardFrontClassname, cardState, index }: CardProps) {
  const { flipCard } = useBoardStore();
  return (
    <div
      className={`card ${cardState.flipped ? cardFrontClassname : "card-back"}`}
      onClick={() => flipCard(index)}
    />
  );
}

export default Card;

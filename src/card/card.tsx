import "./card.css";
import { useBoardStore } from "../board/board.store";

interface CardProps {
  index: number;
}
function Card({ index }: CardProps) {
  const { flipCard, board } = useBoardStore();
  const cardState = board[index];
  return (
    <div
      className={`card ${cardState.flipped ? cardState.color : "card-back"}`}
      onClick={() => flipCard(index)}
    />
  );
}

export default Card;

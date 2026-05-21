import "./card.css";
import { useBoardStore } from "../board/board-store/board.store";

interface CardProps {
  index: number;
}

function Card({ index }: CardProps) {
  const { flipCard, board } = useBoardStore();
  const cardState = board[index];
  return (
    <div
      className={`card ${cardState.flipped ? cardState.cardClassName : "card-back"}`}
      style={cardState.flipped ? cardState.faceStyle : undefined}
      onClick={() => flipCard(index)}
    />
  );
}

export default Card;

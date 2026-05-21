import "./card.css";
import { useBoardStore } from "../board/board-store/board.store";
import { getCatCardStyle } from "./cats/cats";

interface CardProps {
  index: number;
}

function Card({ index }: CardProps) {
  const { flipCard, board } = useBoardStore();
  const cardState = board[index];
  const catStyle = cardState.flipped
    ? getCatCardStyle(cardState.cardClassName)
    : undefined;
  return (
    <div
      className={`card ${cardState.flipped ? cardState.cardClassName : "card-back"}`}
      style={catStyle}
      onClick={() => flipCard(index)}
    />
  );
}

export default Card;

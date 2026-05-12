import "./card.css";
import { useBoardStore } from "../board/board.store";
import "./rainbow/rainbow.css";
interface CardProps {
  index: number;
}
function Card({ index }: CardProps) {
  const { flipCard, board } = useBoardStore();
  const cardState = board[index];
  return (
    <div
      className={`card ${cardState.flipped ? cardState.cardClassName : "card-back"}`}
      onClick={() => flipCard(index)}
    />
  );
}

export default Card;

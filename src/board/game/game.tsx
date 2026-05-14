import { useBoardStore } from "../board-store/board.store";
import Card from "../../card/card.tsx";
import "./game.css";
import { Settings } from "lucide-react";

interface GameProps {
  showDeckConfig: () => void;
}
export function Game({ showDeckConfig: setShowDeckConfig }: GameProps) {
  const { board, numberOfMoves, newGame } = useBoardStore();
  return (
    <>
      <div className="actions">
        <p>Nombre de coups: {numberOfMoves}</p>
        <button className="new-game-button" onClick={newGame}>
          Nouvelle partie
        </button>
        <button className="settings-button" onClick={() => setShowDeckConfig()}>
          <Settings className="settings-icon" />
        </button>
      </div>
      <div className="memory-board">
        {board.map((card, index) => (
          <Card key={`${index}-${card.cardClassName}`} index={index} />
        ))}
      </div>
    </>
  );
}

import { useBoardStore } from "../board-store/board.store";
import Card from "../../card/card.tsx";
import "./game.css";
import { Settings } from "lucide-react";
import { useDeckStore } from "../../card-deck/card-deck-store/card-deck.store.ts";

interface GameProps {
  showDeckConfig: () => void;
}
export function Game({ showDeckConfig: setShowDeckConfig }: GameProps) {
  const { board, numberOfMoves, newGame } = useBoardStore();
  const { difficulty } = useDeckStore();
  return (
    <>
      <div className="actions">
        <button className="settings-button" onClick={() => setShowDeckConfig()}>
          <Settings className="settings-icon" />
        </button>
        <button className="new-game-button" onClick={newGame}>
          Rejouer
        </button>
        <p>
          Coups:{" "}
          <span className="game-moves">
            {numberOfMoves} / {difficulty}
          </span>
        </p>
      </div>
      <div className="memory-board">
        {board.map((card, index) => (
          <Card key={`${index}-${card.cardClassName}`} index={index} />
        ))}
      </div>
    </>
  );
}

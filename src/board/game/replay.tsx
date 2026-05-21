import { useBoardStore } from "../board-store/board.store";
import { RainbowButton } from "../../common/rainbow-button/rainbow-button";

export function Replay() {
  const { newGame } = useBoardStore();
  return <RainbowButton onClick={newGame}>Rejouer</RainbowButton>;
}

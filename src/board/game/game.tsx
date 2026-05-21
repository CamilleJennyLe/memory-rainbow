import Card from "../../card/card.tsx";
import { useDevice } from "../../utils/hooks/use-device.ts";
import { useBoardStore } from "../board-store/board.store";
import { DesktopHeader } from "./desktop/header.tsx";
import "./game.css";
import { MobileHeader } from "./mobile/header.tsx";

export function Game() {
  const { board } = useBoardStore();
  const { isDesktop } = useDevice();
  return (
    <>
      {isDesktop ? <DesktopHeader /> : <MobileHeader />}
      <div className="memory-board">
        {board.map((card, index) => (
          <Card key={`${index}-${card.cardClassName}`} index={index} />
        ))}
      </div>
    </>
  );
}

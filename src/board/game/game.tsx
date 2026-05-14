import Card from "../../card/card.tsx";
import { useDevice } from "../../utils/hooks/use-device.ts";
import { useBoardStore } from "../board-store/board.store";
import { DesktopHeader } from "./desktop/header.tsx";
import "./game.css";
import { MobileHeader } from "./mobile/header.tsx";

interface GameProps {
  showDeckConfig: () => void;
}
export function Game({ showDeckConfig: setShowDeckConfig }: GameProps) {
  const { board } = useBoardStore();
  const { isDesktop } = useDevice();
  return (
    <>
      {isDesktop ? (
        <DesktopHeader setShowDeckConfig={setShowDeckConfig} />
      ) : (
        <MobileHeader setShowDeckConfig={setShowDeckConfig} />
      )}
      <div className="memory-board">
        {board.map((card, index) => (
          <Card key={`${index}-${card.cardClassName}`} index={index} />
        ))}
      </div>
    </>
  );
}

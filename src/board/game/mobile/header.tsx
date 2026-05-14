import { Settings } from "lucide-react";
import { Moves } from "../moves";
import { Replay } from "../replay";
import "../game.css";

interface MobileHeaderProps {
  setShowDeckConfig: () => void;
}
export function MobileHeader({ setShowDeckConfig }: MobileHeaderProps) {
  return (
    <div className="actions">
      <button className="settings-button" onClick={() => setShowDeckConfig()}>
        <Settings className="settings-icon" />
      </button>
      <Replay />
      <Moves />
    </div>
  );
}

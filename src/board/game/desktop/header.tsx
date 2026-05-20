import { Settings } from "lucide-react";
import { ShortStatistics } from "../short-statistics";
import { Replay } from "../replay";
import "../game.css";

interface DesktopHeaderProps {
  setShowDeckConfig: () => void;
}
export function DesktopHeader({ setShowDeckConfig }: DesktopHeaderProps) {
  return (
    <div className="actions">
      <button className="settings-button" onClick={() => setShowDeckConfig()}>
        <Settings className="settings-icon" />
      </button>
      <ShortStatistics />
      <Replay />
    </div>
  );
}

import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { ShortStatistics } from "../short-statistics";
import { Replay } from "../replay";
import "../game.css";

export function DesktopHeader() {
  return (
    <div className="actions">
      <Link to="/config" className="settings-button">
        <Settings className="settings-icon" />
      </Link>
      <ShortStatistics />
      <Replay />
    </div>
  );
}

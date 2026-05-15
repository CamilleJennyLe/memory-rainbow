import { useState } from "react";
import { useDeckStore } from "./card-deck-store/card-deck.store";
import { useBoardStore } from "../board/board-store/board.store";
import "./card-deck-config.css";

interface CardDeckConfigProps {
  hideDeckConfig: () => void;
}
export function CardDeckConfig({ hideDeckConfig }: CardDeckConfigProps) {
  const { config, setConfig } = useDeckStore();
  const [localConfig, setLocalConfig] = useState(config);
  const { newGame } = useBoardStore();
  function handleConfigChange() {
    setConfig(localConfig);
    newGame();
    hideDeckConfig();
  }
  const anyDeckSelected = localConfig.includeRainbow || localConfig.includeCats;
  return (
    <div className="card-deck-config">
      <h3>Configuration du jeu de cartes</h3>
      <label>
        <input
          type="checkbox"
          name="includeRainbow"
          checked={localConfig.includeRainbow}
          onChange={(e) =>
            setLocalConfig({
              ...localConfig,
              includeRainbow: e.target.checked,
            })
          }
          className="card-deck-config-checkbox"
        />
        Cartes aux couleurs de l'arc-en-ciel
      </label>
      <label>
        <input
          type="checkbox"
          name="includeCats"
          checked={localConfig.includeCats}
          onChange={(e) =>
            setLocalConfig({ ...localConfig, includeCats: e.target.checked })
          }
          className="card-deck-config-checkbox"
        />
        Cartes de chats
      </label>
      <button
        onClick={handleConfigChange}
        className="card-deck-config-button"
        disabled={!anyDeckSelected}
      >
        Enregistrer
      </button>
    </div>
  );
}

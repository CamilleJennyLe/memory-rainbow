import { useState } from "react";
import { useDeckStore } from "./card-deck-store/card-deck.store";
import { useBoardStore } from "../board/board-store/board.store";
import { RainbowButton } from "../common/rainbow-button/rainbow-button";
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
  const anyDeckSelected =
    localConfig.includeRainbow ||
    localConfig.includeCats ||
    localConfig.includeAquatic;
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
        Cartes chats
      </label>
      <label>
        <input
          type="checkbox"
          name="includeAquatic"
          checked={localConfig.includeAquatic}
          onChange={(e) =>
            setLocalConfig({ ...localConfig, includeAquatic: e.target.checked })
          }
          className="card-deck-config-checkbox"
        />
        Cartes aquatiques
      </label>
      <RainbowButton onClick={handleConfigChange} disabled={!anyDeckSelected}>
        Enregistrer
      </RainbowButton>
    </div>
  );
}

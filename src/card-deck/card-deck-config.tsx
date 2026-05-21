import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeckStore } from "./card-deck-store/card-deck.store";
import { useBoardStore } from "../board/board-store/board.store";
import { Checkbox } from "../common/checkbox/checkbox";
import { RainbowButton } from "../common/rainbow-button/rainbow-button";
import "./card-deck-config.css";

export function CardDeckConfig() {
  const navigate = useNavigate();
  const { config, setConfig } = useDeckStore();
  const [localConfig, setLocalConfig] = useState(config);
  const { newGame } = useBoardStore();
  function handleConfigChange() {
    setConfig(localConfig);
    newGame();
    navigate("/");
  }
  const anyDeckSelected =
    localConfig.includeRainbow ||
    localConfig.includeCats ||
    localConfig.includeAquatic;
  return (
    <div className="card-deck-config">
      <h3>Configuration du jeu de cartes</h3>
      <label>
        <Checkbox
          name="includeRainbow"
          checked={localConfig.includeRainbow}
          onChange={(e) =>
            setLocalConfig({
              ...localConfig,
              includeRainbow: e.target.checked,
            })
          }
        />
        Cartes aux couleurs de l'arc-en-ciel
      </label>
      <label>
        <Checkbox
          name="includeCats"
          checked={localConfig.includeCats}
          onChange={(e) =>
            setLocalConfig({ ...localConfig, includeCats: e.target.checked })
          }
        />
        Cartes chats
      </label>
      <label>
        <Checkbox
          name="includeAquatic"
          checked={localConfig.includeAquatic}
          onChange={(e) =>
            setLocalConfig({ ...localConfig, includeAquatic: e.target.checked })
          }
        />
        Cartes aquatiques
      </label>
      <RainbowButton onClick={handleConfigChange} disabled={!anyDeckSelected}>
        Enregistrer
      </RainbowButton>
    </div>
  );
}

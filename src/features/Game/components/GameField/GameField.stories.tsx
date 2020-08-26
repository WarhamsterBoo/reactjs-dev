import { DEAD, GameSettings, GameStatus } from "@/features/Game";
import { matrixGenerator } from "@/utils/arrayUtils";
import { action } from "@storybook/addon-actions";
import React, { useState } from "react";
import { GameField } from "./GameField";

export default { title: "Game Field Component" };

export const GameFieldStory: React.FC<{}> = () => {
  const [settings, setSettings] = useState<GameSettings>({
    xDimension: 10,
    yDimension: 10,
    fillingPercentage: 10,
    speed: 10,
    status: GameStatus.Stopped,
  });

  return (
    <GameField
      creatures={matrixGenerator(10, 10, DEAD)}
      settings={settings}
      applySettings={action("applySettings")}
      onControlActionClick={action("onControlActionClick")}
      onSettingsChange={(newSettings) => {
        action("onSettingsChange")(newSettings);
        setSettings(newSettings);
      }}
      toggleCreatureState={action("toggleCreatureState")}
    />
  );
};

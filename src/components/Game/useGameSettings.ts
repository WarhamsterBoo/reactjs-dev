import { GameSettings } from "commonTypes/game";
import { useState, useCallback } from "react";

export const useGameSettings = (): [
  GameSettings,
  (settings: GameSettings) => void
] => {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    xDimension: 10,
    yDimension: 10,
    fillingPercentage: 0,
  });

  const onSettingsSubmit = useCallback(
    (settings: GameSettings) => {
      setGameSettings({
        ...settings,
        fillingPercentage: settings.fillingPercentage / 100,
      });
    },
    [gameSettings]
  );

  return [gameSettings, onSettingsSubmit];
};

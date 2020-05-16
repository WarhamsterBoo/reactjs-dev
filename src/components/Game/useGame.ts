import { GameSettings } from "commonTypes/game";
import { useState, useCallback } from "react";

export const useGame = (): [GameSettings, (settings: GameSettings) => void] => {
  const [gameSettings, setGameSettings] = useState<GameSettings>({
    xDimension: 10,
    yDimension: 10,
    fillingPercentage: 0,
  });

  const onSettingsSubmit = useCallback(
    (settings: GameSettings) => {
      setGameSettings(settings);
    },
    [gameSettings]
  );

  return [gameSettings, onSettingsSubmit];
};

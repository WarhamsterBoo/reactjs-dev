import { ControlAction, GameSettings } from "commonTypes/GameSettings";
import { useCallback, useState } from "react";

export const defaultGameSettings: GameSettings = {
  xDimension: 10,
  yDimension: 10,
  fillingPercentage: 0,
};

export const useGameSettings = (): [
  GameSettings,
  (settings: GameSettings) => void,
  (action: ControlAction) => void
] => {
  const [gameSettings, setGameSettings] = useState<GameSettings>(
    defaultGameSettings
  );

  const onSettingsSubmit = useCallback(
    (settings) => {
      setGameSettings({
        ...settings,
        fillingPercentage: settings.fillingPercentage / 100,
      });
    },
    [gameSettings]
  );

  const onConrolActionPerformed = useCallback((action) => {
    if (action == "stop") {
      setGameSettings(defaultGameSettings);
    }
  }, []);

  return [gameSettings, onSettingsSubmit, onConrolActionPerformed];
};

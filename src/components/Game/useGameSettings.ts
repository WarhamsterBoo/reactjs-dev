import { useCallback, useState } from "react";

export const defaultGameSettings: GameSettings = {
  xDimension: 10,
  yDimension: 10,
  fillingPercentage: 0,
};

// TODO should be replaced with redux
export const useGameSettings = (): {
  settings: GameSettings;
  onSettingsSubmit: (settings: GameSettings) => void;
  onControlActionClick: (action: ControlAction) => void;
} => {
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

  return {
    settings: gameSettings,
    onSettingsSubmit: onSettingsSubmit,
    onControlActionClick: onConrolActionPerformed,
  };
};

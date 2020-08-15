import { GameSettings, GameStatus } from "@/features/Game/gameStore";
import { action } from "@storybook/addon-actions";
import React, { useState } from "react";
import { SettingsForm } from "./SettingsForm";

export default { title: "Settings Form Component" };

export const SettingsFormStory: React.FC<{}> = () => {
  const [settings, setSettings] = useState<GameSettings>({
    xDimension: 10,
    yDimension: 10,
    fillingPercentage: 10,
    speed: 10,
    status: GameStatus.Stopped,
  });

  return (
    <SettingsForm
      gameSettings={settings}
      applySettings={action("onSubmit")}
      onSettingsChange={(newSettings) => setSettings(newSettings)}
    />
  );
};

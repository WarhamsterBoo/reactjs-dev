import { action } from "@storybook/addon-actions";
import React from "react";
import { SettingsForm } from "./SettingsForm";

export default { title: "Settings Form Component" };

export const SettingsFormStory: React.FC<{}> = () => {
  return (
    <SettingsForm
      gameSettings={{ xDimension: 10, yDimension: 10, fillingPercentage: 0.1 }}
      applySettings={action("onSubmit")}
      onSettingsChange={action("onChange")}
    />
  );
};

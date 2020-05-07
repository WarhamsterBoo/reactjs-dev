import { action } from "@storybook/addon-actions";
import React from "react";
import { SettingsForm } from "./SettingsForm";

export default { title: "Settings Form Component" };

export const SettingsFormStory: React.FC<{}> = () => {
  return <SettingsForm onSettingsSubmit={action("onSubmit")} />;
};

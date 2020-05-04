import { action } from "@storybook/addon-actions";
import React from "react";
import { Settings } from "./Settings";

export default { title: "Settings Component" };

export const SettingsStory: React.FC<{}> = () => {
  return <Settings onSubmit={action("onSubmit")} />;
};

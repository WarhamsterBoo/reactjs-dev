import { action } from "@storybook/addon-actions";
import React from "react";
import { ControlPanel } from "./ControlPanel";

export default { title: "Control Panel Component" };

export const ControlPanelStory: React.FC<{}> = () => {
  return <ControlPanel onControlButtonClick={action("button-click")} />;
};

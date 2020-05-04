import React from "react";
import { ControlPanel } from "./ControlPanel";
import { action } from "@storybook/addon-actions";

export default { title: "Control Panel Component" };

export const ControlPanelStory: React.FC<{}> = () => {
  return <ControlPanel onClick={action("button-click")} />;
};

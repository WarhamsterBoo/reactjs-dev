import { withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { World } from "./World";

export default { title: "Hello component", decorators: [withKnobs] };

export const HelloStory: React.FC<{}> = () => {
  return <World />;
};

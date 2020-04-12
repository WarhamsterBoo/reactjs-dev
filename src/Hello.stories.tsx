import React from "react";
import Hello from "./Hello";
import { withKnobs, text } from "@storybook/addon-knobs";

export default { title: "Hello component", decorators: [withKnobs] };

export const HelloStory: React.FC<{}> = () => {
  const userName = text("User name", "me");

  return <Hello name={userName} />;
};

import { action } from "@storybook/addon-actions";
import { boolean, number, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import { Cell } from "./Cell";

export default { title: "Cell component", decorators: [withKnobs] };

export const CellStory: React.FC<{}> = () => {
  const hasAliveCreature = boolean("Has alive creature", false);
  const x = number("x coordinate", 5);
  const y = number("y coordinate", 12);

  return (
    <Cell
      x={x}
      y={y}
      hasAliveCreature={hasAliveCreature}
      onClick={action("button-click")}
    />
  );
};

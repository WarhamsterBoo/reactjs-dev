import React from "react";
import { StyledCell } from "./StyledCell";

export interface CellProps {
  x: number;
  y: number;
  hasAliveCreature: boolean;
  onClick: (x: number, y: number) => void;
  transitionMs?: number;
}

export const Cell: React.FC<CellProps> = ({
  x,
  y,
  hasAliveCreature,
  onClick,
  transitionMs = 500,
}) => {
  return (
    <StyledCell
      hasAliveCreature={hasAliveCreature}
      transitionMs={transitionMs}
      onClick={() => onClick(x, y)}
    />
  );
};

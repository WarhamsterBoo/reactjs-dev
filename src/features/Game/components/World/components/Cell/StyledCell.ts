import { css } from "@emotion/core";
import styled from "@emotion/styled";

export const BaseCell = css`
  width: 20px;
  height: 20px;
  border: none;
  margin: 1px;
  display: inline-block;
  line-height: 25px;
  text-align: center;
  vertical-align: bottom;
`;

export const CellWithAliveCreature = css`
  background: #41ff00;
  border-radius: 5px;
`;

export const CellWithDeadCreature = css`
  background: #454a43;
`;

interface StyledCellProps {
  hasAliveCreature: Boolean;
  transitionMs: number;
}

export const StyledCell = styled.button`
  ${BaseCell};
  transition: background-color
    ${({ transitionMs }: StyledCellProps) => transitionMs / 1000}s ease;
  ${({ hasAliveCreature }: StyledCellProps) =>
    hasAliveCreature ? CellWithAliveCreature : CellWithDeadCreature};
`;

import { css } from "@emotion/core";

export const BaseCreature = css`
  width: 20px;
  height: 20px;
  border: none;
  margin: 1px;
  display: inline-block;
  line-height: 25px;
  text-align: center;
  vertical-align: bottom;
`;

export const BornCreature = css`
  background: #208000;
  border-radius: 5px;
`;

export const AliveCreature = css`
  background: #41ff00;
  border-radius: 5px;
`;

export const DyingCreature = css`
  background: #9fff80;
  border-radius: 5px;
`;

export const DeadCreature = css`
  background: #454a43;
`;

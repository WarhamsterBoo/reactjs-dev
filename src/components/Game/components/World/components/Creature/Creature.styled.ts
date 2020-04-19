import { css } from "@emotion/core";

export const BaseCreature = css`
  width: 25px;
  height: 25px;
  border: 1px solid;
  display: inline-block;
  border-radius: 5px;
  line-height: 25px;
  text-align: center;
  margin: 5px;
  vertical-align: bottom;
`;

export const AliveCreature = css`
  background: #13d473;
`;

export const DeadCreature = css`
  background: #777777;
`;

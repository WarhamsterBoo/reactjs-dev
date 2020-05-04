import styled from "@emotion/styled";
import { Button } from "shared/";

export const FormWrapper = styled.div`
  width: 200px;
  height: 120px;
  display: flex;
  flex-direction: column;
  border: solid 1px black;
  padding: 10px 10px 10px 10px;
  justify-content: space-around;
  align-items: center;
`;

export const StartButton = styled(Button)`
  text-align: center;
`;

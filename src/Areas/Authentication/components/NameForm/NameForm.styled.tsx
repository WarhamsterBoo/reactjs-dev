import styled from "@emotion/styled";
import { colors } from "@/styles/colors";

export const Form = styled.form`
  width: 200px;
  height: 120px;
  padding: 10px 10px 10px 10px;

  border: solid 1px black;
  background-color: ${colors.mainForm};

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

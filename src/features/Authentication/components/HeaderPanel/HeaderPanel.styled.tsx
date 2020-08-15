import styled from "@emotion/styled";
import { colors } from "@/styles/colors";

export const HeaderContainer = styled.div`
  min-width: 600px;

  padding: 7px 20px 7px 20px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: ${colors.mainArea};
`;

export const Greeting = styled.div`
  color: ${colors.mainGreen};
  font-family: Inconsolata, monospace;
`;

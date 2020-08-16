import { colors } from "@/styles/colors";
import styled from "@emotion/styled";

export const GameFieldWrapper = styled.div`
  min-width: 600px;
  min-height: 400px;

  background-color: ${colors.mainArea};

  display: flex;
  flex-direction: column;
  justify-content space-between;
  align-content: space-between;
  align-items: center;
`;

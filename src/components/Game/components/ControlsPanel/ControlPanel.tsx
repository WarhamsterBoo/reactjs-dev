import React from "react";
import { ButtonsContainer, ControlButton } from "./ControlPanel.styled";

export interface ControlPanelProps {}

export const ControlPanel: React.FC<ControlPanelProps> = () => {
  return (
    <ButtonsContainer>
      <ControlButton>Stop</ControlButton>
      <ControlButton>Pause</ControlButton>
      <ControlButton>Faster</ControlButton>
      <ControlButton>1x</ControlButton>
      <ControlButton>Slower</ControlButton>
    </ButtonsContainer>
  );
};

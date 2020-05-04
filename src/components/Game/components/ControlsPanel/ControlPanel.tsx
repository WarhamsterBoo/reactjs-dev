import React, { useCallback } from "react";
import { ButtonsContainer, ControlButton } from "./ControlPanel.styled";

export type Action = "stop" | "run" | "pause" | "slower" | "normal" | "faster";

export interface ControlPanelProps {
  onClick: (action: Action) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onClick }) => {
  const onClickHandler = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const target = ev.target as HTMLButtonElement;
      onClick(target.id as Action);
    },
    [onClick]
  );

  return (
    <ButtonsContainer>
      <ControlButton id={"stop"} onClick={onClickHandler}>
        Stop
      </ControlButton>
      <ControlButton id={"run"} onClick={onClickHandler}>
        Run
      </ControlButton>
      <ControlButton id={"pause"} onClick={onClickHandler}>
        Pause
      </ControlButton>
      <ControlButton id={"faster"} onClick={onClickHandler}>
        Faster
      </ControlButton>
      <ControlButton id={"normal"} onClick={onClickHandler}>
        Normal
      </ControlButton>
      <ControlButton id={"slower"} onClick={onClickHandler}>
        Slower
      </ControlButton>
    </ButtonsContainer>
  );
};

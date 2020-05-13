import React, { useCallback } from "react";
import { Button } from "shared";
import { ButtonsContainer } from "./ControlPanel.styled";

export type Action = "stop" | "run" | "pause" | "slower" | "normal" | "faster";

export interface ControlPanelProps {
  onControlButtonClick: (action: Action) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onControlButtonClick,
}) => {
  const onClickHandler = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const target = ev.target as HTMLButtonElement;
      onControlButtonClick(target.id as Action);
    },
    [onControlButtonClick]
  );

  return (
    <ButtonsContainer>
      <Button id="stop" onClick={onClickHandler}>
        Stop
      </Button>
      <Button id="run" onClick={onClickHandler}>
        Run
      </Button>
      <Button id="pause" onClick={onClickHandler}>
        Pause
      </Button>
      <Button id="faster" onClick={onClickHandler}>
        Faster
      </Button>
      <Button id="normal" onClick={onClickHandler}>
        Normal
      </Button>
      <Button id="slower" onClick={onClickHandler}>
        Slower
      </Button>
    </ButtonsContainer>
  );
};

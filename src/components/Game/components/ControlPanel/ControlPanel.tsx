import React, { useCallback } from "react";
import { ButtonsContainer } from "./ControlPanel.styled";
import { Button } from "shared";

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

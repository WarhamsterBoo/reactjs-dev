import React, { useCallback } from "react";
import { Button } from "@/components";
import { ButtonsContainer } from "./ControlPanel.styled";

export type ControlAction =
  | "reset"
  | "run"
  | "stop"
  | "slower"
  | "normal"
  | "faster";

export interface ControlPanelProps {
  onControlButtonClick: (action: ControlAction) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onControlButtonClick,
}) => {
  const onClickHandler = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const target = ev.target as HTMLButtonElement;
      onControlButtonClick(target.id as ControlAction);
    },
    [onControlButtonClick]
  );

  return (
    <ButtonsContainer>
      <Button id="reset" onClick={onClickHandler}>
        Stop
      </Button>
      <Button id="run" onClick={onClickHandler}>
        Run
      </Button>
      <Button id="stop" onClick={onClickHandler}>
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

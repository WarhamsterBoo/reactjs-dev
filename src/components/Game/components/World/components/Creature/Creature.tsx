import React, { useEffect, useState } from "react";
import { StyledCreature, StyledCreaturePhase } from "./StyledCreature";

export interface CreatureProps {
  x: number;
  y: number;
  isAlive: boolean;
  onClick: (x: number, y: number) => void;
  transitionMs?: number;
}

export const Creature: React.FC<CreatureProps> = ({
  x,
  y,
  isAlive,
  onClick,
  transitionMs = 500,
}) => {
  const [creaturePhase, setCreaturePhase] = useState<StyledCreaturePhase>(
    StyledCreaturePhase.Dead
  );
  const [firstUpdate, setFirstUpdate] = useState(true);

  useEffect(() => {
    setCreaturePhase(
      isAlive ? StyledCreaturePhase.Alive : StyledCreaturePhase.Dead
    );
  }, []);

  useEffect(() => {
    if (firstUpdate) {
      setFirstUpdate(false);
      return;
    }

    setCreaturePhase(
      isAlive ? StyledCreaturePhase.Born : StyledCreaturePhase.Dying
    );

    const timer = setTimeout(() => {
      setCreaturePhase(
        isAlive ? StyledCreaturePhase.Alive : StyledCreaturePhase.Dead
      );
    }, transitionMs);

    return () => {
      clearTimeout(timer);
    };
  }, [isAlive]);

  return <StyledCreature phase={creaturePhase} onClick={() => onClick(x, y)} />;
};

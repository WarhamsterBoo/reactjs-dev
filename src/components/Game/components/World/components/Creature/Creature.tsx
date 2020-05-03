import React, { useEffect, useState } from "react";
import { StyledCreature, StyledCreaturePhase } from "./StyledCreature";

export interface CreatureProps {
  x: number;
  y: number;
  IsAlive: boolean;
  onClick: (x: number, y: number) => void;
  transitionMs?: number;
}

export const Creature: React.FC<CreatureProps> = ({
  x,
  y,
  IsAlive,
  onClick,
  transitionMs = 500,
}) => {
  const [creaturePhase, setCreaturePhase] = useState<StyledCreaturePhase>(
    StyledCreaturePhase.Dead
  );
  const [firstUpdate, setFirstUpdate] = useState(true);

  useEffect(() => {
    setCreaturePhase(
      IsAlive ? StyledCreaturePhase.Alive : StyledCreaturePhase.Dead
    );
  }, []);

  useEffect(() => {
    if (firstUpdate) {
      setFirstUpdate(false);
      return;
    }

    setCreaturePhase(
      IsAlive ? StyledCreaturePhase.Born : StyledCreaturePhase.Dying
    );

    const timer = setTimeout(() => {
      setCreaturePhase(
        IsAlive ? StyledCreaturePhase.Alive : StyledCreaturePhase.Dead
      );
    }, transitionMs);

    return () => {
      clearTimeout(timer);
    };
  }, [IsAlive]);

  return <StyledCreature phase={creaturePhase} onClick={() => onClick(x, y)} />;
};

import { SerializedStyles } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useEffect, useState, useRef } from "react";
import {
  AliveCreature,
  BaseCreature,
  DeadCreature,
  BornCreature,
  DyingCreature,
} from "./Creature.styled";

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
  const [creatureStyle, setCreatureStyle] = useState<SerializedStyles>(
    DeadCreature
  );
  const firstUpdate = useRef(true);

  useEffect(() => {
    setCreatureStyle(IsAlive ? AliveCreature : DeadCreature);
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    setCreatureStyle(IsAlive ? BornCreature : DyingCreature);

    const timer = setTimeout(() => {
      setCreatureStyle(IsAlive ? AliveCreature : DeadCreature);
    }, transitionMs);

    return () => {
      clearTimeout(timer);
    };
  }, [IsAlive]);

  const StyledCreature = styled.button`
    ${BaseCreature};
    ${creatureStyle};
  `;

  return <StyledCreature onClick={() => onClick(x, y)} />;
};

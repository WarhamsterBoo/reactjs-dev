import { SerializedStyles } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { AliveCreature, BaseCreature, DeadCreature } from "./Creature.styled";

export interface CreatureProps {
  x: number;
  y: number;
  IsAlive: boolean;
  onClick: (x: number, y: number) => void;
}

export const Creature: React.FC<CreatureProps> = ({
  x,
  y,
  IsAlive,
  onClick,
}) => {
  const [creatureStyle, setCreatureStyle] = useState<SerializedStyles>(
    IsAlive ? AliveCreature : DeadCreature
  );

  useEffect(() => {
    setCreatureStyle(IsAlive ? AliveCreature : DeadCreature);
  }, [IsAlive]);

  const StyledCreature = styled.button`
    ${BaseCreature};
    ${creatureStyle};
  `;

  return <StyledCreature onClick={() => onClick(x, y)} />;
};

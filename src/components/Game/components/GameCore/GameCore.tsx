import React, { useEffect, useState } from "react";

export interface GameCoreProps {
  settings: GameSettings;
  world: WorldPresenter;
  creatures: WorldCreature[][];
  generateCreatures: () => void;
}

// TODO probably should be deleted
export const GameCore: React.FC<GameCoreProps> = ({
  settings,
  world: World,
  creatures,
  generateCreatures,
}) => {
  const [innerCreatures, setCreatures] = useState(creatures);

  // TODO think about merging these two useEffect hooks into one
  useEffect(() => {
    setCreatures((prevState) =>
      Array.from({ length: settings.xDimension }).map((_, i) =>
        Array.from({ length: settings.yDimension }).map((_, j) => {
          return prevState[i] && prevState[i][j]
            ? prevState[i][j]
            : { isAlive: false };
        })
      )
    );
  }, [settings.xDimension, settings.yDimension]);

  useEffect(() => {
    generateCreatures();
  }, [settings.fillingPercentage]);

  useEffect(() => {
    generateCreatures();
  }, []);

  useEffect(() => {
    setCreatures(creatures);
  }, [creatures]);

  const toggleCreatureState = (x: number, y: number) => {
    setCreatures((prevState) => {
      return prevState.map((row, rowIndex) => {
        if (rowIndex == x) {
          return row.map((value, inRowIndex) => ({
            isAlive: inRowIndex == y ? !value.isAlive : value.isAlive,
          }));
        }
        return row;
      });
    });
  };

  return <World creatures={innerCreatures} onClick={toggleCreatureState} />;
};

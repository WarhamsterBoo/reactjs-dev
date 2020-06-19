import React, { useCallback } from "react";
import { connect } from "react-redux";
import { ControlPanel, SettingsForm, World } from "./components";
import { GameWrapper } from "./Game.styled";
import { GameState, gameStore, CreatureCoordinates } from "./gameStore";

interface GameProps {
  settings: GameSettings;
  onSettingsSubmit: (settings: GameSettings) => void;
  onControlActionClick: (action: ControlAction) => void;
  creatures: WorldCreature[][];
  toggleCreatureState: (coordinates: CreatureCoordinates) => void;
}

const GameComponent: React.FC<GameProps> = ({
  settings,
  onSettingsSubmit,
  onControlActionClick,
  creatures,
  toggleCreatureState,
}) => {
  const onCreatureClick = useCallback(
    (x: number, y: number) => toggleCreatureState({ x, y }),
    [toggleCreatureState]
  );

  return (
    <GameWrapper>
      <SettingsForm
        gameSettings={settings}
        onSettingsSubmit={onSettingsSubmit}
      />
      <World creatures={creatures} onClick={onCreatureClick} />;
      <ControlPanel onControlButtonClick={onControlActionClick} />
    </GameWrapper>
  );
};

const mapStateToProps = (state: GameState) => {
  return {
    settings: state.settings,
    creatures: state.creatures,
  };
};

const mapDispatchToProps = {
  onSettingsSubmit: gameStore.actions.changeSettingsTo,
  onControlActionClick: gameStore.actions.stop,
  toggleCreatureState: gameStore.actions.toggleCreatureState,
};

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComponent);

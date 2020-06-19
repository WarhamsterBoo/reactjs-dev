import React from "react";
import { connect } from "react-redux";
import { ControlPanel, GameCore, SettingsForm, World } from "./components";
import { GameWrapper } from "./Game.styled";
import { gameStore, GameState } from "./gameStore";

interface GameProps {
  settings: GameSettings;
  onSettingsSubmit: (settings: GameSettings) => void;
  onControlActionClick: (action: ControlAction) => void;
  creatures: WorldCreature[][];
  generateCreatures: () => void;
}

const GameComponent: React.FC<GameProps> = ({
  settings,
  onSettingsSubmit,
  onControlActionClick,
  creatures,
  generateCreatures,
}) => {
  return (
    <GameWrapper>
      <SettingsForm
        gameSettings={settings}
        onSettingsSubmit={onSettingsSubmit}
      />
      <GameCore
        settings={settings}
        world={World}
        creatures={creatures}
        generateCreatures={generateCreatures}
      />
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
  generateCreatures: gameStore.actions.generateNewCreatures,
};

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComponent);

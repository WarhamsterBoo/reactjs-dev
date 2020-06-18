import React from "react";
import { connect } from "react-redux";
import {
  ControlPanel,
  Engine,
  GameCore,
  SettingsForm,
  World,
} from "./components";
import { GameWrapper } from "./Game.styled";
import { gameStore, GameState } from "./gameStore";

interface GameProps {
  settings: GameSettings;
  onSettingsSubmit: (settings: GameSettings) => void;
  onControlActionClick: (action: ControlAction) => void;
}

const GameComponent: React.FC<GameProps> = ({
  settings,
  onSettingsSubmit,
  onControlActionClick,
}) => {
  return (
    <GameWrapper>
      <SettingsForm
        gameSettings={settings}
        onSettingsSubmit={onSettingsSubmit}
      />
      <GameCore settings={settings} world={World} engine={Engine} />
      <ControlPanel onControlButtonClick={onControlActionClick} />
    </GameWrapper>
  );
};

const mapStateToProps = (state: GameState) => {
  return {
    settings: state.settings,
  };
};

const mapDispatchToProps = {
  onSettingsSubmit: gameStore.actions.changeSettingsTo,
  onControlActionClick: gameStore.actions.stop,
};

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComponent);

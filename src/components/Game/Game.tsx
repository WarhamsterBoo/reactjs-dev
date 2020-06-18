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
import { settingsSlice } from "./settings";

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

const mapStateToProps = (state: GameSettings) => {
  return {
    settings: state,
  };
};

const mapDispatchToProps = {
  onSettingsSubmit: settingsSlice.actions.changeSettingsTo,
  onControlActionClick: settingsSlice.actions.stop,
};

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComponent);

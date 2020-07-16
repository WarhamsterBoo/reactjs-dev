import { AppState } from "@/AppStore";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { ControlAction, ControlPanel, SettingsForm, World } from "./components";
import { GameWrapper } from "./Game.styled";
import {
  CreatureCoordinates,
  GameSettings,
  gameStore,
  Population,
} from "./gameStore";

interface GameProps {
  settings: GameSettings;
  onControlActionClick: (action: ControlAction) => void;
  creatures: Population;
  toggleCreatureState: (coordinates: CreatureCoordinates) => void;
  applySettings: () => void;
  onSettingsChange: (settings: GameSettings) => void;
}

const GameComponent: React.FC<GameProps> = ({
  settings,
  onControlActionClick,
  creatures,
  toggleCreatureState,
  applySettings,
  onSettingsChange,
}) => {
  const onCreatureClick = useCallback(
    (x: number, y: number) => toggleCreatureState({ x, y }),
    [toggleCreatureState]
  );

  return (
    <GameWrapper>
      <SettingsForm
        gameSettings={settings}
        onSettingsChange={onSettingsChange}
        applySettings={applySettings}
      />
      <World creatures={creatures} onClick={onCreatureClick} />
      <ControlPanel onControlButtonClick={onControlActionClick} />
    </GameWrapper>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    settings: state.game.settings,
    creatures: state.game.creatures,
  };
};

const mapDispatchToProps = {
  onControlActionClick: gameStore.actions.stop,
  toggleCreatureState: gameStore.actions.toggleCreatureState,
  applySettings: gameStore.actions.applySettings,
  onSettingsChange: gameStore.actions.changeSettings,
};

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameComponent);

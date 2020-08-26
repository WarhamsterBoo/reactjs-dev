import { AppState } from "@/AppStore";
import { connect } from "react-redux";
import { GameField } from "./components";
import { gameStore } from "./gameStore";

const mapStateToProps = (state: AppState) => {
  return {
    settings: state.game.settings,
    creatures: state.game.creatures,
  };
};

const mapDispatchToProps = {
  onControlActionClick: gameStore.actions.executeControlAction,
  toggleCreatureState: gameStore.actions.toggleCreatureState,
  applySettings: gameStore.actions.applySettings,
  onSettingsChange: gameStore.actions.changeSettings,
};

export const Game = connect(mapStateToProps, mapDispatchToProps)(GameField);

import { Game } from "components/Game";
import { withAuthentication } from "hoc/withAuthentication";

export const GameScreen = withAuthentication(Game);

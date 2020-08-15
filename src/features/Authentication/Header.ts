import { AppState } from "@/AppStore";
import { connect } from "react-redux";
import { authStore } from "./authStore";
import { HeaderPanel } from "./components";

const mapStateToProps = (state: AppState) => ({
  userName: state.auth.userName,
});

const mapDispatchToProps = {
  logOutUser: authStore.actions.logout,
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderPanel);

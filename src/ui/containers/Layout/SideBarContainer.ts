import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import SideBar from "src/ui/components/Layout/SideBar";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
  };
};

export default connect(mapStateToProps, null)(SideBar);

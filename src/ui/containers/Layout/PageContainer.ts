import { appReducers } from "src/ui/reducers";
import { connect } from "react-redux";
import Page from "src/ui/components/Layout/Page";

const mapStateToProps = (state: appReducers) => {
  return {
    theme: state.settingsReducer.theme,
    breadCrumb: state.AppReducer.breadCrumb,
  };
};

export default connect(mapStateToProps, null)(Page);

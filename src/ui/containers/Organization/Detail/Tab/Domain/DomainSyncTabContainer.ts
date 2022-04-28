import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import SyncTab from "src/ui/components/Organization/Detail/DetailPanel/Domains/Tabs/Sync";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  let { settingsReducer } = state;
  return {
    theme: settingsReducer.theme,
    domain: state.Organization.domain,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnSyncDomain: (id: string) => {
      console.log("sync");
    },
    OnStopSyncDomain: (id: string) => {
      console.log("stop sync");
    },
  };
};

const SyncTabContainer = connect(mapStateToProps, mapDispatchToProps)(SyncTab);

export default SyncTabContainer;

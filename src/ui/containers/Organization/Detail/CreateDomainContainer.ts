import { connect } from "react-redux";
import { compose } from "redux";
import CreateNewDomain from "src/ui/components/Organization/Detail/DetailPanel/Domains/Create";
import { CreateNewDomainProps } from "src/ui/components/Organization/Detail/DetailPanel/Domains/Create/CreateModels";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { appReducers } from "src/ui/reducers";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { TypeConfirm } from "src/entity/enums";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    organizationInfomation: state.Organization.organizationInfomation,
    workingDomains: state.Organization.workingDomains,
    isWorking: state.AppReducer.isWorking,
    isConfirmCreate: state.AppReducer.isConfirmCreate,
    theme: state.settingsReducer.theme,
    confirmType: state.AppReducer.confirmType,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  props: CreateNewDomainProps
) => {
  return {
    OnStoreWorkingCreateDomains: async (domains: BaseDomain[]) => {
      dispatch(
        OrganizationReduxAction.StoreUpdateWorkingCreateDomains(domains)
      );
    },
    OnUpdateIsConfirmCreate: async (val: boolean): Promise<void> => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmCreateAct(val));
    },
    OnUpdateWorkingStatus: async (val: boolean): Promise<void> => {
      dispatch(ApplicationReduxActionTS.UpdateWorkingStatusAct(val));
    },
    OnUpdateConfirmType: (type: TypeConfirm) => {
      dispatch(ApplicationReduxActionTS.UpdateConfirmType(type));
    },
  };
};

const CreateDomainContainer = compose(
  connect(mapStateToProps, mapDispatchToProps, null, {
    forwardRef: true,
  })(CreateNewDomain)
);

export default CreateDomainContainer;

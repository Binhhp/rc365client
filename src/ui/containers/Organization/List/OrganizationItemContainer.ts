import { connect } from "react-redux";
import { appReducers } from "src/ui/reducers";
import OrganizationItem from "src/ui/components/Organization/List/Item";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { UpdateNameOrganizationRequest } from "src/repositories/request";
import { OrganizationUpdateNameResponse } from "src/repositories/response";
import { Dispatch } from "redux";

const mapStateToProps = (state: appReducers) => {
  return {
    isHaveMessageSignalR: state.AppReducer.isHaveMessageSignalR,
    organizationList: state.Organization.organizationList,
    breadCrumb: state.AppReducer.breadCrumb,
    orgInfo: state.Organization.organizationInfomation,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    OnHandleUpdateOrganizationName: async (
      id: string,
      name: string
    ): Promise<OrganizationUpdateNameResponse> => {
      let _organizationManager = OrganizationManager.Instance;
      let req = new UpdateNameOrganizationRequest();
      req.name = name;
      dispatch(OrganizationReduxAction.StoreChangeLoadingOrganizatonList());
      return await _organizationManager
        .UpdateNameOrganization(id, req)
        .then((res) => {
          if (res) {
            dispatch(OrganizationReduxAction.StoreOrganizationsList());
            dispatch(
              OrganizationReduxAction.StoreChangeLoadingOrganizatonList()
            );
          }
          return res;
        });
    },
    OnHandleUpdateBreadCrumb: async (nodes: INodes[]) => {
      dispatch(ApplicationReduxActionTS.UpdateBreadCrumb(nodes));
    },
  };
};

const OrganizationItemContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationItem);

export default OrganizationItemContainer;

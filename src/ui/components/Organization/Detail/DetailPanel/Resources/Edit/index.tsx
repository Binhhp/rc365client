import * as React from "react";
import {
  EditResourceWrapper,
  MainContentWrapper,
  FooterPanelWrapper,
} from "./EditStyle";
import {IEditResourceProps, IEditResourceState} from "./EditModels";
import Pivot from "aod-dependencies/Pivot/CustomPivot";
import {PivotItem} from "aod-dependencies/Pivot";
import GalleryTab from "src/ui/containers/Organization/Detail/Tab/Resource/ResourceGalleryTabContainer";
import GeneralTab from "src/ui/containers/Organization/Detail/Tab/Resource/ResourceGeneralTabContainer";
import OrderTab from "src/ui/containers/Organization/Detail/Tab/Resource/ResourceOrderTabContainer";
import SyncTab from "src/ui/containers/Organization/Detail/Tab/Resource/ResourceSyncTabContainer";
import GroupTab from "src/ui/containers/Organization/Detail/Tab/Resource/ResourceGroupTabContainer";
import SensorTab from "src/ui/containers/Organization/Detail/Tab/Resource/ResourceSensorTabContainer";
import {EditResourcePivotItem} from "src/common/constants";
import {EditResourceTabs, TypeConfirm} from "src/entity/enums";
import Button from "aod-dependencies/Button";
import { WorkingEditTab } from "src/common/classes/WorkingEditTab";
import { BuildRCAttribute, ValidateFunctions } from "src/common/functions";
import { IMinMaxLength } from "src/common/interfaces/IMinMaxLength";
import { IconGeneralProps } from "src/common/style";
import { Icon } from "aod-dependencies/@uifabric/icons";
import { Redirect } from "react-router-dom";
import { OrganizationManager } from "src/services/implements/OrganizationManager";
import { IOrganizationManager } from "src/services/interface";
import {
  BaseResource,
  OnHandleMapDataToBaseResource,
} from "src/common/classes/BaseResource";
import { IsCanBeReload } from "src/services/implements/SignalRManager";

export default class EditResource extends React.Component<IEditResourceProps,
  IEditResourceState> {
  private Action: React.RefObject<HTMLInputElement | any>;

  constructor(props: IEditResourceProps) {
    super(props);
    this.state = {
      crtTab: EditResourceTabs.General,
      isConfirm: false,
      isRedirect: false,
      selectedKey: null,
      resourceId: this.props.resource?.id,
      resource: new BaseResource(),
      cId: "",
      workflowId: "",
      loading: false,
    };
    this.Action = React.createRef();
  }

  UNSAFE_componentWillMount() {
    if (this.state.resourceId && this.state.cId === "") {
      this.onGetResourceInformation();
    }
  }

  private onGetResourceInformation = async () => {
    if (this.state.cId !== "" || this.state.workflowId !== "") {
      this.setState({workflowId: "", cId: ""});
    }
    let _organizationManager: IOrganizationManager = OrganizationManager.Instance;
    if (this.state.resourceId && this.props.organizationInfomation?.id) {
      this.setState({ loading: true });
      const resource = await _organizationManager.GetResourceById(this.props.organizationInfomation.id, this.state.resourceId);
      let rs = OnHandleMapDataToBaseResource(resource);
      this.setState({ resource: rs, loading: false });
    }
  };

  onSetCidAndWorkflowId = (cId: string, workflowId: string) => {
    this.setState({cId: cId, workflowId: workflowId});
  };

  componentDidUpdate() {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId
    );
    if (isReload) {
      this.onGetResourceInformation();
      this.props.OnReloadOrganization(true);
      this.props.OnClearCidAndWorkflowId();
    }
  }

  private FocusToFirstInvalidItemInEdit = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.FocusToFirstInvalidItemInEdit();
  };

  private _mapEditTab = (str?: string): EditResourceTabs => {
    if (str) {
      switch (str) {
        case "Groups":
          return EditResourceTabs.Groups;
        case "Gallery":
          return EditResourceTabs.Gallery;
        case "Sync Status":
          return EditResourceTabs.Sync;
        case "Order Configuration":
          return EditResourceTabs.Order;
        case "Sensors":
          return EditResourceTabs.Sensors;
        default:
          return EditResourceTabs.General;
      }
    }
    return EditResourceTabs.General;
  };

  private _onChangeTab = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ): void => {
    if (item) {
      let {headerText} = item.props;
      let type = this._mapEditTab(headerText);
      if (
        this.props.workingEditTab &&
        this.props.workingEditTab.resourceTabs !== type &&
        this.props.OnUpdateWorkingEditTab
      ) {
        let workingEditTab =
          this.props.workingEditTab.Clone() as WorkingEditTab;
        workingEditTab.resourceTabs = type;
        this.props.OnUpdateWorkingEditTab(workingEditTab);
      }
    }
  };

  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onHandleResetStoreUpdate = () => {
    if (this.props.OnResetOrganizationStore) {
      this.props.OnResetOrganizationStore();
    }
  };

  private _onHandleUpdatePanel = (val: boolean) => {
    if (this.props.OnHandleUpdateDisabledPanelPage) {
      this.props.OnHandleUpdateDisabledPanelPage(val);
    }
  };

  private _onCheckIsHaveUserInvalid = (): boolean => {
    const fieldLenth: IMinMaxLength[] = [
      {key: "phone", max: 16, min: 9},
      {key: "email", max: 64},
    ];
    if (this.props.resource) {
      let exceptKeys = ["deadlineMess", "minHoursMess"];
      if (this.props.resource.phone?.trim() === "") {
        exceptKeys.push("phone");
      }
      let isInvalid = this.props.resource.IsHaveInvalidLengthField(
        exceptKeys,
        fieldLenth
      );
      if (
        !this.props.resource.email ||
        (this.props.resource.email &&
          this.props.resource.email.trim() === "") ||
        !this.props.resource.name ||
        (this.props.resource.name && this.props.resource.name?.trim() === "") ||
        !this.props.resource.displayName ||
        (this.props.resource.displayName &&
          this.props.resource.displayName?.trim() === "") ||
        // this.props.resource.domain.trim() === "" ||
        this.props.resource.capacity > 50000 ||
        this.props.resource.capacity < 0 ||
        isInvalid ||
        !ValidateFunctions.onValidateIsEmail(this.props.resource.email.trim())
        // ValidateFunction.IsValidEmailName(this.props.resource.email.trim())
      ) {
        return true;
      }
    }
    return false;
  };

  RenderTabContent = () => {
    if (this.props.workingEditTab) {
      let workingEditTab = this.props.workingEditTab.Clone() as WorkingEditTab;
      let crtTab = workingEditTab.resourceTabs;
      switch (crtTab) {
        case EditResourceTabs.Gallery:
          return <GalleryTab ref={this.Action}/>;

        case EditResourceTabs.Order:
          return <OrderTab ref={this.Action}/>;

        case EditResourceTabs.Sync:
          return (
            <SyncTab
              OnSetCIdAndWorkflowId={this.onSetCidAndWorkflowId}
              resource={this.state.resource}
            />
          );

        case EditResourceTabs.Groups:
          return <GroupTab/>;

        case EditResourceTabs.Sensors:
          return <SensorTab/>;

        default:
          return (
            <GeneralTab
              // resource={this.state.resource}
              loading={this.state.loading}
              ref={this.Action}
            />
          );
      }
    }
    return (
      <GeneralTab
        // resource={this.state.resource}
        loading={this.state.loading}
        ref={this.Action}
      />
    );
  };

  RenderContentConfirm = (): string => {
    let {confirmType} = this.props;
    if (confirmType) {
      switch (confirmType) {
        case TypeConfirm.Delete:
          return "Are you sure want to delete this user ?";

        case TypeConfirm.Update:
          return "Are you sure want to save this changes ?";

        case TypeConfirm.Cancel:
          return "Your changes will be lost, are you sure want to leave ?";

        default:
          return "";
      }
    }
    return "";
  };

  // onHandleConfirmSelection = async (val: boolean) => {
  //   if (!val) {
  //     this.props.onSetTypeConfirmUpdateTS &&
  //       (await this.props.onSetTypeConfirmUpdateTS());
  //     this.setState({ isConfirm: false });
  //   }
  //   if (val) {
  //     this.props.onSetTabSelectedListTS && this.props.onSetTabSelectedListTS();
  //     switch (this.props.typeConfirmUpdate) {
  //       case TypeConfirm.Delete:
  //         return this.onHandleDeleteResource();
  //       case TypeConfirm.Update:
  //         return this.onHandleUpdateResource();
  //       case TypeConfirm.Cancel:
  //         return this.onHandleCancelEditResource();
  //       default:
  //         return;
  //     }
  //   }
  // };

  onHandleDeleteResource = () => {
    this._onHandleResetStoreUpdate();
  };

  onHandleUpdateResource = () => {
    this._onHandleResetStoreUpdate();
  };

  onHandleCancelEditResource = () => {
    this._onHandleResetStoreUpdate();
  };

  onHandleCancelPanel = () => {
    if (!this.props.isWorking) {
      this._onHandleUpdatePanel(false);
    }
    if (this.props.isWorking) {
      this._onHandleUpdateConfirmType(TypeConfirm.Cancel);
    }
  };

  onHandleDelete = () => {
    this._onHandleUpdateConfirmType(TypeConfirm.Delete);
  };

  onSubmitUpdate = async () => {
    let isHaveInvalid = await this._onCheckIsHaveUserInvalid();
    if (this.props.isWorking && !isHaveInvalid) {
      this._onHandleUpdateConfirmType(TypeConfirm.Submit);
    } else {
      this.FocusToFirstInvalidItemInEdit();
    }
  };

  mapWorkingTabToNumber = (): string => {
    if (this.props.workingEditTab) {
      switch (this.props.workingEditTab.resourceTabs) {
        case EditResourceTabs.General:
          return "0";
        case EditResourceTabs.Order:
          return "1";
        case EditResourceTabs.Groups:
          return "2";
        case EditResourceTabs.Gallery:
          return "3";
        case EditResourceTabs.Sensors:
          return "4";
        case EditResourceTabs.Sync:
          return "5";
        default:
          return "";
      }
    }
    return "";
  };

  onHandleMoveToCalendar = () => {
    if (!this.props.isWorking) {
      this.setState({isRedirect: true});
    }
  };

  render() {
    let idRsName = BuildRCAttribute("sp.resource.name");
    let idAppointmentBtn = BuildRCAttribute("btn.appointment");
    if (this.state.isRedirect) {
      return <Redirect to={`/calendar`}/>;
    }
    return (
      <EditResourceWrapper
        className="EditResourceWrapper"
        theme={this.props.theme}
      >
        {/* {!this.props.typeConfirmUpdate && !this.state.isConfirm ? ( */}
        <div className="editResource__content">
          <div className="edtRs__row">
            <h4 className="edit__organizationName" {...idRsName}>
              {this.props.resource && this.props.resource.name}
            </h4>
            <div
              {...idAppointmentBtn}
              onClick={this.onHandleMoveToCalendar}
              className={
                this.props.isWorking
                  ? "blk__synchronized is-disabled"
                  : "blk__synchronized"
              }
            >
              <Icon
                iconName={IconGeneralProps.appointmentsIcon.iconName}
                className="ico__synchronized"
                rcName="sync"
              />
              <span>Appointments</span>
            </div>
          </div>
          <MainContentWrapper
            className="MainContentWrapper"
            theme={this.props.theme}
          >
            <Pivot
              styles={{
                itemContainer: {
                  width: "100%",
                  height: "100%",
                },
              }}
              rcName="edtResource"
              onLinkClick={this._onChangeTab}
              darkMode={this.props.theme}
              selectedKey={this.mapWorkingTabToNumber()}
            >
              {EditResourcePivotItem.map((item, index) => {
                return (
                  <PivotItem
                    key={index}
                    headerText={item.text}
                    itemIcon={item.iconName}
                  >
                    {this.RenderTabContent()}
                  </PivotItem>
                );
              })}
            </Pivot>
          </MainContentWrapper>
        </div>
        {!this.props.isSearchInPanel &&
          this.props.workingEditTab &&
          ![
            EditResourceTabs.Groups,
            EditResourceTabs.Sync,
            EditResourceTabs.Sensors,
          ].includes(this.props.workingEditTab.resourceTabs) && (
            <FooterPanelWrapper
              className="FooterPanelWrapper"
              theme={this.props.theme}
            >
              <div className="footer__actionBtn">
                <Button
                  onClick={this.onSubmitUpdate}
                  darkMode={this.props.theme}
                  type="Primary"
                  text="Update"
                  rcName="edtResource.Update"
                  disabled={this.props.isWorking ? false : true}
                />
                <Button
                  onClick={this.onHandleDelete}
                  darkMode={this.props.theme}
                  text="Delete"
                  rcName="edtResource.delete"
                />
              </div>
              <Button
                onClick={this.onHandleCancelPanel}
                darkMode={this.props.theme}
                text="Cancel"
                rcName="CancelInPanel-Btn"
              />
            </FooterPanelWrapper>
          )}
      </EditResourceWrapper>
    );
  }
}

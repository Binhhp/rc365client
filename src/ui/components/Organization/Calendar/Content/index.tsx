import { Icon } from "aod-dependencies/@uifabric/icons";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import Button from "aod-dependencies/Button";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { Panel, PanelType } from "aod-dependencies/Panel";
import * as React from "react";
import { Redirect } from "react-router-dom";
import {
  BuildFunction,
  BuildRCAttribute,
  TimeFunction,
} from "src/common/functions";
import { IconGeneralProps, PanelStyle } from "src/common/style";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import CalendarTable from "src/ui/containers/Organization/Calendar/CalendarTableContainer";
import CreateAppointment from "src/ui/containers/Organization/Calendar/CreateAppointmentContainer";
import SynchronizedCalendar from "src/ui/containers/Organization/Calendar/SyncCalendarContainer";
import SensorList from "src/ui/containers/Sensor/SensorListContainer";
import { ICalendarContentProps, ICalendarContentStates } from "./ContentModels";
import {
  ActionButtonWrapper,
  CalendarWrapper,
  FooterPanelWrapper,
  HeaderWrapper,
} from "./ContentStyle";
import { ConfirmContentWrapper } from "./List/ListStyle";

class Calendar extends React.Component<
  ICalendarContentProps,
  ICalendarContentStates
> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ICalendarContentProps) {
    super(props);
    this.state = {
      cId: "",
      isRedirect: false,
      isDisabled: false,
      isSyncPanel: false,
    };
    this.Action = React.createRef();
  }

  componentDidMount() {
    let rootNode = {
      id: "1",
      text: "Organizations",
      isSelected: true,
      parentId: "#",
      url: "organizations",
    };
    let root = BuildFunction.buildNodeForBreadcrumb(rootNode);
    let breadNodes = [root];
    if (
      this.props.orgInfo &&
      this.props.orgInfo.id !== "" &&
      this.props.resource
    ) {
      let OrgNode = {
        id: this.props.orgInfo.id,
        text: this.props.orgInfo.name,
        isSelected: true,
        parentId: "1",
        url: `?orgId=${this.props.orgInfo.id}`,
      };
      let RsNode = {
        id: this.props.resource.id,
        text: this.props.resource.displayName,
        isSelected: true,
        parentId: this.props.orgInfo.id,
        url: `?orgId=${this.props.orgInfo.id}`,
      };
      let rsNode = BuildFunction.buildNodeForBreadcrumb(RsNode);
      let orgNode = BuildFunction.buildNodeForBreadcrumb(OrgNode);
      breadNodes = [...breadNodes, orgNode, rsNode];
      this._onHandleUpdateBreadCrumb(breadNodes);
    } else {
      this.setState({ isRedirect: true });
    }
  }

  componentDidUpdate(
    prevProps: ICalendarContentProps,
    prevStates: ICalendarContentStates
  ) {
    if (
      this.props.sensorTypeOpts &&
      this.props.sensorTypeOpts.length > 0 &&
      this.state.isDisabled
    ) {
      this.setState({ isDisabled: false });
    }
  }

  private _onGetSelectedData = (items: any[]) => {
    console.log(items);
  };

  private _onHandleUpdateBreadCrumb = (nodes: INodes[]) => {
    if (this.props.OnUpdateBeardCrumb) {
      this.props.OnUpdateBeardCrumb(nodes);
    }
  };

  private _onHandleRef = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleUpdateStore();
  };

  private _onHandleValidateField = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleValideField();
  };

  private _onHandleReloadList = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleGetDataForm();
  };

  private _onHandleVisiblePanel = (val?: boolean) => {
    if (
      this.props.OnUpdateVisiblePagePanel &&
      typeof val === "undefined" &&
      typeof this.props.isPanelPageOpen !== "undefined"
    ) {
      this.props.OnUpdateVisiblePagePanel(!this.props.isPanelPageOpen);
    }
    if (
      typeof val !== "undefined" &&
      this.props.isPanelPageOpen !== val &&
      this.props.OnUpdateVisiblePagePanel
    ) {
      this.props.OnUpdateVisiblePagePanel(val);
    }
  };

  private _onUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.confirmType !== type && this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onHandleResetStore = () => {
    if (this.props.OnResetApplicationStore) {
      this.props.OnResetApplicationStore();
    }
  };
  private _onHandleCreate = () => {
    if (
      this.props.OnCreateAppointment &&
      this.props.workingAppointment &&
      this.props.resource &&
      this.props.timeZones
    ) {
      this.props.OnCreateAppointment(
        this.props.resource.id,
        this.props.workingAppointment,
        this.props.timeZones
      );
    }
  };

  private _onHandleDelete = () => {
    if (
      this.props.OnDeleteAppointment &&
      this.props.workingCalendar &&
      this.props.selectedAppointments &&
      this.props.selectedAppointments.length > 0 &&
      this.props.resource
    ) {
      this.props.OnDeleteAppointment(
        this.props.resource.id,
        this.props.selectedAppointments
      );
    }
  };

  private _onHandleDeleteItems = async () => {
    // let crtItem = await this._mapCurrentSelectedItem();
    if (
      this.props.selectedAppointments &&
      this.props.selectedAppointments.length > 0 &&
      !this.props.isWorking &&
      !this.props.isPanelPageOpen
    ) {
      this._onUpdateConfirmType(TypeConfirm.Delete);
      this._onHandleVisiblePanel(true);
    }
  };

  private _onHandleSubmitCreate = async () => {
    await this._onHandleRef();
    let isHaveErrors = this._CheckFieldErrorByWorkingTab();
    if (isHaveErrors && this.props.isWorking) {
      this._onHandleValidateField();
    }
    if (!isHaveErrors && this.props.isWorking) {
      this._onUpdateConfirmType(TypeConfirm.ReviewSS);
    }
  };

  private _CheckFieldErrorByWorkingTab = () => {
    if (this.props.workingAppointment) {
      return this.props.workingAppointment.isHaveEmptyField();
    }
    return true;
  };

  private _onHandleCancelPanel = () => {
    this.setState({ isSyncPanel: false });
    if (
      (this.props.confirmType === TypeConfirm.Null && !this.props.isWorking) ||
      this.props.confirmType === TypeConfirm.Delete
    ) {
      this._onHandleVisiblePanel(false);
      this._onHandleResetStore();
    }
    if (this.props.isWorking && this.props.confirmType === TypeConfirm.Null) {
      this._onUpdateConfirmType(TypeConfirm.Cancel);
    }
    if (this.props.confirmType && this.props.confirmType !== TypeConfirm.Null) {
      this._onUpdateConfirmType(TypeConfirm.Null);
    }
  };

  private _onHandleCancelConfirm = () => {
    this._onUpdateConfirmType(TypeConfirm.Null);
    if (this.props.confirmType === TypeConfirm.Delete) {
      this._onHandleVisiblePanel(false);
      this._onHandleResetStore();
    }
  };

  private _onHandleSubmitConfirm = async () => {
    if (this.props.confirmType === TypeConfirm.Submit) {
      this._onHandleCreate();
      this._onHandleResetStore();
      // this._onHandleVisiblePanel(false);
    }
    if (this.props.confirmType === TypeConfirm.Delete) {
      this._onHandleDelete();
      this._onHandleResetStore();
    }
    if (
      this.props.confirmType === TypeConfirm.Unavailable ||
      this.props.confirmType === TypeConfirm.Cancel
    ) {
      // this._onUpdateConfirmType(TypeConfirm.Null);
      // this._onHandleVisiblePanel(false);
      this._onHandleResetStore();
    }
  };

  RenderTabContent = () => {
    return <SensorList cId={this.state.cId} />;
  };

  RenderFooterPanel = () => {
    return (
      <FooterPanelWrapper>
        <Button
          onClick={this._onHandleSubmitCreate}
          darkMode={this.props.theme}
          type="Primary"
          text="Create"
          rcName={`create.apm`}
          disabled={!this.props.isWorking}
        />
        <Button
          onClick={this._onHandleCancelPanel}
          darkMode={this.props.theme}
          text="Cancel"
          rcName={`cancel.apm`}
        />
      </FooterPanelWrapper>
    );
  };

  RenderConfirmContent = () => {
    let idSubject = BuildRCAttribute("sp.cfm.subject");
    let idRsName = BuildRCAttribute("sp.cfm.RsName");
    let idRsTimezone = BuildRCAttribute("sp.cfm.RsTimezone");
    let idStartTime = BuildRCAttribute("sp.cfm.startTime");
    let idEndTime = BuildRCAttribute("sp.cfm.endTime");
    if (
      this.props.workingAppointment &&
      this.props.resource &&
      this.props.confirmType === TypeConfirm.Submit
    ) {
      return (
        <ConfirmContentWrapper theme={this.props.theme} className="cfm__blk">
          <div className="cfm__content">
            <span className="cfm__subject" {...idSubject}>
              {this.props.workingAppointment.subject}
            </span>
            <span className="cfm__rsInfo">
              <span {...idRsName}>{this.props.resource.name}</span>
              <span {...idRsTimezone}>
                {this.props.resource.timeZone
                  ? `(${this.props.resource.timeZone})`
                  : ""}
              </span>
            </span>
          </div>
          <div className="cfm__times">
            <div className="cfm__time__blk">
              <span className="cfm__title">Start Time</span>
              <span {...idStartTime} className="start__time">
                {TimeFunction.onFormatDateTimeUTC(
                  this.props.workingAppointment.startTime.dateTime
                )}
              </span>
            </div>
            <Icon
              className="cfn__ico"
              iconName={IconGeneralProps.rightIcon.iconName}
            />
            <div className="cfm__time__blk">
              <span className="cfm__title">End Time</span>
              <span {...idEndTime} className="start__time">
                {TimeFunction.onFormatDateTimeUTC(
                  this.props.workingAppointment.endTime.dateTime
                )}
              </span>
            </div>
          </div>
        </ConfirmContentWrapper>
      );
    }
    return null;
  };

  RenderAddNewContent = () => {
    if (this.state.isSyncPanel && this.props.confirmType === TypeConfirm.Null) {
      return <SynchronizedCalendar />;
    } else if (this.props.confirmType === TypeConfirm.Null) {
      return <CreateAppointment />;
    } else {
      return (
        <Confirm
          onHandleSubmit={this._onHandleSubmitConfirm}
          onHandleCancel={this._onHandleCancelConfirm}
          rcName="appointment"
          content={
            this.props.confirmType === TypeConfirm.Unavailable
              ? "This function is still in stages of development."
              : undefined
          }
        >
          {this.RenderConfirmContent()}
        </Confirm>
      );
    }
  };

  onHandleOpenSyncPanel = async () => {
    await this.setState({ isSyncPanel: true });
    this._onHandleVisiblePanel(true);
  };

  onHandeBuildPanelTitle = (): string => {
    if (this.state.isSyncPanel) {
      return "Synchronized";
    } else if (this.props.confirmType === TypeConfirm.Null) {
      return "Create appointment";
    } else {
      return "Confirmation";
    }
  };

  render() {
    let idBlockSync = BuildRCAttribute("blk.synchronized");
    if (this.state.isRedirect) {
      return <Redirect to="/organizations" />;
    }
    return (
      <CalendarWrapper className="CalendarWrapper" theme={this.props.theme}>
        <HeaderWrapper className="HeaderWrapper" theme={this.props.theme}>
          <ActionButtonWrapper
            className="ActionButtonWrapper"
            theme={this.props.theme}
          >
            <CommandBarButton
              onClick={() => this._onHandleVisiblePanel()}
              iconProps={IconGeneralProps.addIcon}
              text="Create"
              rcName={`create.appointment`}
              darkMode={this.props.theme}
            />
            <CommandBarButton
              disabled={
                !this.props.selectedAppointments ||
                this.props.selectedAppointments.length < 1
              }
              iconProps={IconGeneralProps.deleteIcon}
              text="Delete"
              rcName={`delete.appointment`}
              darkMode={this.props.theme}
              onClick={this._onHandleDeleteItems}
            />
            <CommandBarButton
              iconProps={IconGeneralProps.refreshIcon}
              text="Reload"
              rcName={`reload.appointment`}
              darkMode={this.props.theme}
              onClick={this._onHandleReloadList}
            />
          </ActionButtonWrapper>
          <div
            {...idBlockSync}
            onClick={this.onHandleOpenSyncPanel}
            className="blk__synchronized"
          >
            <Icon iconName="Sync" className="ico__synchronized" rcName="sync" />
            <span>Calendar synchronized</span>
          </div>
        </HeaderWrapper>
        <CalendarTable
          ref={this.Action}
          onGetItemsSelected={this._onGetSelectedData}
          conversationId={this.state.cId}
        />
        <Customizer scopedSettings={{ Layer: { hostId: "main-panel" } }}>
          <Panel
            isOpen={
              this.props.isPanelPageOpen &&
              this.props.panelType === TypePanel.Create
            }
            // isOpen={true}
            hasCloseButton
            headerText={this.onHandeBuildPanelTitle()}
            focusTrapZoneProps={{
              isClickableOutsideFocusTrap: true,
              forceFocusInsideTrap: false,
            }}
            isBlocking={false}
            onDismiss={this._onHandleCancelPanel}
            isLightDismiss={true}
            styles={PanelStyle(this.props.theme)}
            type={
              this.props.confirmType === TypeConfirm.Delete
                ? PanelType.smallFixedFar
                : PanelType.medium
            }
            rcName="appointment"
          >
            {this.RenderAddNewContent()}
          </Panel>
        </Customizer>
      </CalendarWrapper>
    );
  }
}

export default Calendar;

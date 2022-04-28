import * as React from "react";
import { IEditControlllerProps, IEditControllerStates } from "./EditModels";
import {
  EditControllerWrapper,
  FooterWrapper,
  ResourceEdtWrapper,
  PivotContentWrapper,
} from "./EditStyle";
import Button from "aod-dependencies/Button";
import { TypeConfirm } from "src/entity/enums";
import { Icon } from "aod-dependencies/@uifabric/icons";
import Toggle from "aod-dependencies/Toggle/CustomToggle";
import { BuildRCAttribute } from "src/common/functions";
import Pivot from "aod-dependencies/Pivot/CustomPivot";
import { PivotItem } from "aod-dependencies/Pivot";
import { SensorsEditControllerPivotItems } from "src/common/constants";
import { Stack } from "aod-dependencies/Stack";
import {
  BaseController,
  ControllerDto,
} from "src/common/classes/BaseController";
import SensorTab from "src/ui/containers/Sensor/Tabs/Controllers/SensorTabContainer";
import ConfigurationTab from "src/ui/containers/Sensor/Tabs/Controllers/ConfigurationTabContainer";

class EditController extends React.Component<
  IEditControlllerProps,
  IEditControllerStates
> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IEditControlllerProps) {
    super(props);
    this.state = {
      crtTab: "0",
      controller: new BaseController(),
      selectedItems: [],
      isCollapsed: true,
    };
    this.Action = React.createRef();
  }

  componentDidMount() {
    if (this.props.controller) {
      let dto = new ControllerDto();
      dto.controllerStatus = this.props.controller.controllerStatus;
      dto.occupationStatus = this.props.controller.occupationStatus;
      dto.reservationTime = this.props.controller.reservationTime;
      dto.resourceId = this.props.controller.resourceId;
      dto.resourceName = this.props.controller.resourceName;
      dto.sensorControllerId = this.props.controller.sensorControllerId;
      dto.sensorTime = this.props.controller.sensorTime;
      dto.sensors = this.props.controller.sensors;
      dto.timeZone = this.props.controller.timeZone;
      dto.totalSensors = this.props.controller.totalSensors;
      dto.resourceInfo = this.props.controller.resourceInfo;
      dto.sensorTimeTick = this.props.controller.sensorTimeTick;
      dto.reservationTimeTick = this.props.controller.reservationTimeTick;
      dto.guid = this.props.controller.guid;
      let controller = new BaseController(dto);
      this.setState({ controller });
    }
  }

  private _onHandleResetSensorStore = () => {
    if (this.props.OnResetSensorStore) {
      this.props.OnResetSensorStore();
    }
  };

  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.confirmType !== type && this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onHandleUpdateWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onHandleUpdateVisiblePagePanel = (val: boolean) => {
    if (
      this.props.isPanelPageOpen !== val &&
      this.props.OnUpdateVisiblePagePanel
    ) {
      this.props.OnUpdateVisiblePagePanel(val);
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

  private _CheckFieldErrorByWorkingTab = () => {
    let resourceCondition =
      this.props.controller &&
      ((this.props.controller.resourceId &&
        this.props.controller.resourceId.trim() === "") ||
        !this.props.controller.resourceId);
    let sensorTimeCondition =
      this.props.controller &&
      (Number(this.props.controller.sensorTime.split(":")[1]) > 59 ||
        Number(this.props.controller.sensorTime.split(":")[2]) > 59 ||
        this.props.controller.sensorTime === "" ||
        this.props.controller.reservationTime.indexOf("-") !== -1 ||
        this.props.controller.sensorTime === "00:00:00");
    let reservationTimeCondition =
      this.props.controller &&
      (Number(this.props.controller.reservationTime.split(":")[1]) > 59 ||
        Number(this.props.controller.reservationTime.split(":")[2]) > 59 ||
        this.props.controller.reservationTime === "" ||
        this.props.controller.reservationTime.indexOf("-") !== -1 ||
        this.props.controller.reservationTime === "00:00:00");
    if (sensorTimeCondition || reservationTimeCondition || resourceCondition) {
      return true;
    }
    return false;
  };

  onChangePivotItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item) {
      let { itemKey } = item.props;
      if (itemKey) {
        this.setState({ crtTab: itemKey });
      }
    }
  };

  onSubmitUpdate = async () => {
    await this._onHandleRef();
    let isHaveErrors = this._CheckFieldErrorByWorkingTab();
    if (isHaveErrors && this.props.isWorking) {
      this._onHandleValidateField();
    }
    if (!isHaveErrors && this.props.isWorking) {
      this._onHandleUpdateConfirmType(TypeConfirm.ReviewSS);
    }
  };

  onHandleDelete = () => {
    this._onHandleUpdateConfirmType(TypeConfirm.Delete);
  };

  onHandleCancelPanel = () => {
    if (!this.props.isWorking) {
      this._onHandleUpdateVisiblePagePanel(false);
      this._onHandleResetSensorStore();
    }
    if (this.props.isWorking) {
      this._onHandleUpdateConfirmType(TypeConfirm.Cancel);
    }
  };

  RenderTabContent = () => {
    if (this.state.crtTab === "1") {
      return <SensorTab />;
    }
    return (
      <ConfigurationTab
        ref={this.Action}
        rcName="edit.controller"
        status={this.state.controller.controllerStatus}
      />
    );
  };

  onHandleCollapsedResourceInfo = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  };

  onHandleChangeControllerStatus = (
    ev: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ) => {
    let crtController = this.state.controller.Clone() as BaseController;
    this._onHandleUpdateWorkingStatus(true);
    if (typeof checked === "boolean") {
      crtController.controllerStatus = checked;
    }
    this.setState({
      controller: crtController,
    });
  };

  render() {
    let idDisplayName = BuildRCAttribute(
      `dname.${this.props.rcName}${
        !this.state.controller.controllerStatus ? ".disabled" : ""
      }`
    );
    let idRsName = BuildRCAttribute(
      `name.${this.props.rcName}${
        !this.state.controller.controllerStatus ? ".disabled" : ""
      }`
    );
    let idRsWrapper = BuildRCAttribute(`rsWrapper.${this.props.rcName}`);
    let idRsCapacity = BuildRCAttribute(`sp.capacity.${this.props.rcName}`);
    let idRsPhone = BuildRCAttribute(`sp.phone.${this.props.rcName}`);
    let idRsTimeZone = BuildRCAttribute(`sp.timeZone.${this.props.rcName}`);
    return (
      <EditControllerWrapper className="EditControllerWrapper">
        <ResourceEdtWrapper
          {...idRsWrapper}
          theme={this.props.theme}
          className="ResourceEdtWrapper"
        >
          {/* disabled icon and infomation with class 'is-disabled' */}
          <div
            className={
              this.state.controller.controllerStatus
                ? "content__wrapper"
                : "content__wrapper is-disabledRs"
            }
          >
            <Icon
              rcName={`edt.controller${
                !this.state.controller.controllerStatus ? ".disabled" : ""
              }`}
              className="rs__icon"
              iconName="RecruitmentManagement"
            />
            <div className="rs__group">
              <div className="rs__infomation">
                <h5 {...idDisplayName} className="text-ellipsis-2">
                  {this.state.controller.resourceInfo.displayName}
                </h5>
                <span {...idRsName}>{this.state.controller.resourceName}</span>
              </div>
              <div className="rs__action">
                <Toggle
                  darkMode={this.props.theme}
                  rcName={this.props.rcName}
                  checked={this.state.controller.controllerStatus}
                  onChange={this.onHandleChangeControllerStatus}
                />
              </div>
            </div>
          </div>
          <div className="collapsed">
            <Icon
              className="rs__collapsedIcon"
              onClick={this.onHandleCollapsedResourceInfo}
              rcName={`collapse.${this.props.rcName}`}
              iconName={this.state.isCollapsed ? "ChevronDown" : "ChevronUp"}
            />
            {!this.state.isCollapsed && (
              <div
                className="rs__infomationGr"
                // style={{ height: `${this.state.isCollapsed ? 0 : "auto"}` }}
              >
                <Stack horizontal wrap>
                  <Stack.Item className="padding__right" grow={3}>
                    <p>
                      Capacity:{" "}
                      <span {...idRsCapacity}>
                        {this.state.controller.resourceInfo.capacity}
                      </span>
                    </p>
                  </Stack.Item>
                  <Stack.Item className="padding__right" grow={3}>
                    <p>
                      Timezone:{" "}
                      <span {...idRsTimeZone}>
                        {this.state.controller.resourceInfo.timeZone}
                      </span>
                    </p>
                  </Stack.Item>
                </Stack>
                <Stack horizontal wrap>
                  <Stack.Item className="padding__right" grow={3}>
                    <p>
                      Phone:{" "}
                      <span {...idRsPhone}>
                        {this.state.controller.resourceInfo.phone}
                      </span>
                    </p>
                  </Stack.Item>
                </Stack>
              </div>
            )}
          </div>
        </ResourceEdtWrapper>
        <PivotContentWrapper
          className="PivotContentWrapper"
          id="pivot-wrapper"
          theme={{
            darkMode: this.props.theme,
            isStillWorkingCreate: this.props.isWorking,
          }}
        >
          <Pivot
            onLinkClick={this.onChangePivotItem}
            styles={{
              itemContainer: {
                width: "100%",
                height: "100%",
              },
            }}
            rcName={`org`}
            darkMode={this.props.theme}
            selectedKey={this.state.crtTab}
            disableAction={true}
          >
            {SensorsEditControllerPivotItems.map((item, index) => {
              return (
                <PivotItem
                  key={index}
                  headerText={item.text}
                  itemKey={String(index)}
                  itemIcon={item.iconName}
                  style={{
                    padding: "20px",
                    backgroundColor:
                      this.props.theme === "dark" ? "#333333" : "#ffffff",
                  }}
                >
                  {this.RenderTabContent()}
                </PivotItem>
              );
            })}
          </Pivot>
        </PivotContentWrapper>
        {this.state.crtTab === "0" && (
          <FooterWrapper className="FooterWrapper" theme={this.props.theme}>
            <div className="footer__actionBtn">
              <Button
                onClick={this.onSubmitUpdate}
                darkMode={this.props.theme}
                type="Primary"
                text="Update"
                rcName={`update.${this.props.rcName}`}
                disabled={this.props.isWorking ? false : true}
              />
              <Button
                onClick={this.onHandleDelete}
                darkMode={this.props.theme}
                text="Delete"
                rcName={`delete.${this.props.rcName}`}
              />
            </div>
            <Button
              onClick={this.onHandleCancelPanel}
              darkMode={this.props.theme}
              text="Cancel"
              rcName={`cancel.${this.props.rcName}`}
            />
          </FooterWrapper>
        )}
      </EditControllerWrapper>
    );
  }
}

export default EditController;

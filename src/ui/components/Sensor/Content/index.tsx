import * as React from "react";
import { ISensorContentProps, ISensorContentStates } from "./ContentModels";
import {
  SensorWrapper,
  PivotWrapper,
  ActionButtonWrapper,
  FooterPanelWrapper,
  PanelCreateWrapper,
} from "./ContentStyle";
import { PivotItem } from "aod-dependencies/Pivot";
import Pivot from "aod-dependencies/Pivot/CustomPivot";
import { SensorsListPivotItems } from "src/common/constants";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { IconGeneralProps, PanelStyle } from "src/common/style";
import { TypeConfirm, TypePanel, TypeSensorTabs } from "src/entity/enums";
import SensorList from "src/ui/containers/Sensor/SensorListContainer";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import { Panel, PanelType } from "aod-dependencies/Panel";
import Button from "aod-dependencies/Button";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import CreateConfiguration from "src/ui/containers/Sensor/Tabs/Configurations/ConfigurationFormContainer";
import CreatSensor from "src/ui/containers/Sensor/Tabs/Sensors/CreateSensorContainer";
import CreatController from "src/ui/containers/Sensor/Tabs/Controllers/CreateControllerContainer";
import {
  BuildFunction,
  onHandleLocalStorageForPivot,
} from "src/common/functions";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { Redirect } from "react-router-dom";

class Sensor extends React.Component<
  ISensorContentProps,
  ISensorContentStates
> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ISensorContentProps) {
    super(props);
    this.state = {
      cId: "",
      isRedirect: false,
      isDisabled: false,
    };
    this.Action = React.createRef();
  }

  UNSAFE_componentWillMount() {
    let rootNode = {
      id: "1",
      text: "Sensors",
      isSelected: true,
      parentId: "#",
      url: "sensors",
    };
    let node = BuildFunction.buildNodeForBreadcrumb(rootNode);
    this._onHandleUpdateBreadCrumb([node]);
    this._onHandleGetSensorTypes();
  }

  componentDidUpdate(
    prevProps: ISensorContentProps,
    prevStates: ISensorContentStates
  ) {
    if (
      this.props.sensorTypeOpts &&
      this.props.sensorTypeOpts.length > 0 &&
      this.state.isDisabled
    ) {
      this.setState({ isDisabled: false });
    }
  }

  // componentDidMount() {
  // let storage = localStorage.getItem("orgId");
  // if (
  //   (!this.props.orgInfo ||
  //     (this.props.orgInfo && this.props.orgInfo.id.trim() === "")) &&
  //   (!storage || storage === "")
  // ) {
  //   this.setState({ isRedirect: true });
  // } else {
  //   this._onHandleOrgId();
  // }
  // }

  private _onHandleOrgId = () => {
    let storage = localStorage.getItem("orgId");
    if (
      storage &&
      ((this.props.orgInfo && this.props.orgInfo.id.trim() === "") ||
        !this.props.orgInfo) &&
      this.props.OnUpdateWorkingOrganization
    ) {
      this.props.OnUpdateWorkingOrganization(JSON.parse(storage));
    }
  };

  private _onHandleGetSensorTypes = () => {
    if (this.props.OnGetSensorType) {
      this.props
        .OnGetSensorType()
        .then((res) => {
          if (res && res.length < 1) {
            this._onHandleUpdateWorkingTab(TypeSensorTabs.Configurations);
            this.setState({ isDisabled: true });
          }
        })
        .catch((err) => {
          this._onHandleUpdateWorkingTab(TypeSensorTabs.Configurations);
          this.setState({ isDisabled: true });
        });
    }
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

  private _onUpdateVisiblePagePanel = (val: boolean) => {
    if (
      this.props.OnUpdateVisiblePagePanel &&
      this.props.isPanelPageOpen !== val
    ) {
      this.props.OnUpdateVisiblePagePanel(val);
    }
  };

  private _onHandleVisiblePanel = () => {
    let isVisible = !this.props.isPanelPageOpen;
    if (isVisible) {
      this._onUpdateVisiblePagePanel(true);
    }
    // if (!isVisible) {
    // this.props.OnResetApplicationStore();
    // }
  };

  private _onUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.confirmType !== type && this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onHandleUpdateWorkingTab = (tab: TypeSensorTabs) => {
    if (this.props.workingTab !== tab && this.props.OnUpdateWorkingTab) {
      this.props.OnUpdateWorkingTab(tab);
    }
  };
  private _onHandleResetSensorStore = () => {
    if (this.props.OnResetSensorStore) {
      this.props.OnResetSensorStore();
    }
  };

  private _mapWithToTypeSensorTab = (str?: string): TypeSensorTabs => {
    switch (str) {
      case "Controllers":
        return TypeSensorTabs.Controllers;
      case "Basic configurations":
        return TypeSensorTabs.Configurations;
      default:
        return TypeSensorTabs.Sensors;
    }
  };

  private _onChangePivotItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item) {
      let { headerText } = item.props;
      let tab = this._mapWithToTypeSensorTab(headerText);
      onHandleLocalStorageForPivot(
        "SENSOR_LIST",
        this._mapWithToTypeSensorTab(headerText)
      );
      if (this.props.workingTab !== tab && !this.props.isWorking) {
        this._onUpdateVisiblePagePanel(false);
        this._onHandleResetSensorStore();
        this._onHandleUpdateWorkingTab(tab);
      }
      if (this.props.workingTab !== tab && this.props.isWorking) {
        return this._onUpdateConfirmType(TypeConfirm.Cancel);
      }
    }
  };

  private _mapWorkingTab = (type?: TypeSensorTabs): string | undefined => {
    if (type) {
      switch (type) {
        case TypeSensorTabs.Controllers:
          return "1";
        case TypeSensorTabs.Configurations:
          return "2";
        default:
          return "0";
      }
    }
    return undefined;
  };

  private _onHandleDeleteItems = async () => {
    // let crtItem = await this._mapCurrentSelectedItem();
    if (!this.props.isWorking && !this.props.isPanelPageOpen) {
      this._onUpdateVisiblePagePanel(true);
    }
    if (
      !this.props.isWorking &&
      this.props.workingListItem &&
      this.props.workingListItem.length > 0
    ) {
      this._onUpdateConfirmType(TypeConfirm.Unavailable);
    }
    // return undefined;
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

  private _onHandleCancelPanel = () => {
    if (this.props.confirmType === TypeConfirm.Null && !this.props.isWorking) {
      this._onUpdateVisiblePagePanel(false);
      this._onHandleResetSensorStore();
    }
    if (this.props.isWorking && this.props.confirmType === TypeConfirm.Null) {
      this._onUpdateConfirmType(TypeConfirm.Cancel);
    }
    if (this.props.isWorking && this.props.confirmType !== TypeConfirm.Null) {
      this._onUpdateConfirmType(TypeConfirm.Null);
    }
  };

  private _onHandleUpdateController = () => {
    if (this.props.OnUpdateStoreController && this.props.controller) {
      this.props.OnUpdateStoreController(this.props.controller);
    }
  };

  private _onHandleCancelConfirm = async () => {
    if (
      this.props.confirmType === TypeConfirm.Delete ||
      this.props.confirmType === TypeConfirm.Unavailable
    ) {
      await this._onUpdateVisiblePagePanel(false);
    } else {
      if (this.props.panelType === TypePanel.Create) {
        this._onHandleUpdateController();
      }
      this._onUpdateConfirmType(TypeConfirm.Null);
    }
  };

  private _CheckFieldErrorByWorkingTab = () => {
    if (this.props.workingTab) {
      switch (this.props.workingTab) {
        case TypeSensorTabs.Sensors:
          if (
            this.props.sensor &&
            (this.props.sensor.sensorType.trim() === "" ||
              this.props.sensor.IsHaveInvalidLengthField() ||
              this.props.sensor.sensorId.trim() === "")
          ) {
            return true;
          }
          return false;

        case TypeSensorTabs.Controllers:
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
              this.props.controller.sensorTime.indexOf("-") !== -1 ||
              this.props.controller.sensorTime === "00:00:00");
          let reservationTimeCondition =
            this.props.controller &&
            (Number(this.props.controller.reservationTime.split(":")[1]) > 59 ||
              Number(this.props.controller.reservationTime.split(":")[2]) >
                59 ||
              this.props.controller.reservationTime === "" ||
              this.props.controller.sensorTime.indexOf("-") !== -1 ||
              this.props.controller.reservationTime === "00:00:00");
          if (
            (this.props.sensor &&
              this.props.sensor.IsHaveInvalidLengthField()) ||
            sensorTimeCondition ||
            reservationTimeCondition ||
            resourceCondition
          ) {
            return true;
          }
          return false;

        case TypeSensorTabs.Configurations:
          if (
            this.props.configuration &&
            this.props.configuration.IsHaveInvalidLengthField()
          ) {
            return true;
          }
          if (this.props.configuration) {
            let arrConfig = Object.entries(this.props.configuration).some(
              (c) =>
                typeof c[1] === "string" &&
                c[1].trim() === "" &&
                c[0] !== "_guid"
            );
            return arrConfig;
          }
          return false;

        default:
          return false;
      }
    }
  };

  private _onHandleRegisterSensor = async () => {
    if (this.props.sensor && this.props.OnRegisterSensor) {
      await this.props
        .OnRegisterSensor(this.props.sensor, this.props.resource)
        .then((res) => {
          if (res) {
            this.setState({ cId: res.conversationId });
          }
        });
    }
  };

  private _onHandleRegisterSensorController = async () => {
    if (this.props.controller && this.props.OnRegisterSensorController) {
      await this.props
        .OnRegisterSensorController(this.props.controller)
        .then((res) => {
          if (res) {
            this.setState({ cId: res.conversationId });
          }
        });
    }
  };

  private _onHandleRegisterSensorType = async () => {
    if (this.props.configuration && this.props.OnRegisterSensorType) {
      await this.props
        .OnRegisterSensorType(this.props.configuration)
        .then((res) => {
          if (res) {
            this.setState({ cId: res.conversationId, isDisabled: false });
          }
        });
    }
  };
  // private _onHandleUnregisterSensor = async () => {
  //   if (this.props.workingListItem && this.props.OnUnregisterSensor) {
  //     await this.props
  //       .OnUnregisterSensor(this.props.workingListItem)
  //       .then((res) => {
  //         if (res) {
  //           this.setState({ cId: res.conversationId });
  //         }
  //       });
  //   }
  // };

  // private _onHandleUnregisterSensorController = async () => {
  //   if (this.props.workingListItem && this.props.OnUnregisterSensorController) {
  //     await this.props
  //       .OnUnregisterSensorController(this.props.workingListItem)
  //       .then((res) => {
  //         if (res) {
  //           this.setState({ cId: res.conversationId });
  //         }
  //       });
  //   }
  // };

  // private _onHandleUnregisterSensorType = async () => {
  //   if (this.props.workingListItem && this.props.OnUnregisterSensorType) {
  //     await this.props
  //       .OnUnregisterSensorType(this.props.workingListItem)
  //       .then((res) => {
  //         if (res) {
  //           this.setState({ cId: res.conversationId });
  //         }
  //       });
  //   }
  // };

  private _onHandleSubmitConfirm = async () => {
    if (
      this.props.workingTab &&
      this.props.confirmType === TypeConfirm.ReviewSS
    ) {
      switch (this.props.workingTab) {
        case TypeSensorTabs.Sensors:
          return this._onHandleRegisterSensor();
        case TypeSensorTabs.Controllers:
          return this._onHandleRegisterSensorController();
        case TypeSensorTabs.Configurations:
          return this._onHandleRegisterSensorType();
        default:
          return;
      }
    }
    if (
      this.props.confirmType === TypeConfirm.Unavailable ||
      this.props.confirmType === TypeConfirm.Cancel
    ) {
      this._onUpdateConfirmType(TypeConfirm.Null);
      this._onUpdateVisiblePagePanel(false);
      this._onHandleResetSensorStore();
    }
    // if (
    //   this.props.workingTab &&
    //   this.props.confirmType === TypeConfirm.Delete
    // ) {
    //   switch (this.props.workingTab) {
    //     case TypeSensorTabs.Sensors:
    //       return this._onHandleUnregisterSensor();
    //     case TypeSensorTabs.Controllers:
    //       return this._onHandleUnregisterSensorController();
    //     case TypeSensorTabs.Configurations:
    //       return this._onHandleUnregisterSensorType();
    //     default:
    //       return;
    //   }
    // }
  };

  private _RenderPanelContent = (): string => {
    if (this.props.workingTab) {
      switch (this.props.workingTab) {
        case TypeSensorTabs.Sensors:
          return "Sensor";
        case TypeSensorTabs.Configurations:
          return "Configuration";
        case TypeSensorTabs.Controllers:
          return "Controller";

        default:
          return "";
      }
    }
    return "";
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
          rcName={`create.${this.props.workingTab}`}
          disabled={!this.props.isWorking}
        />
        <Button
          onClick={this._onHandleCancelPanel}
          darkMode={this.props.theme}
          text="Cancel"
          rcName={`cancel.${this.props.workingTab}`}
        />
      </FooterPanelWrapper>
    );
  };

  RenderAddNewContent = () => {
    if (this.props.workingTab && this.props.confirmType === TypeConfirm.Null) {
      switch (this.props.workingTab) {
        case TypeSensorTabs.Sensors:
          return (
            <PanelCreateWrapper className="PanelCreateWrapper">
              <CreatSensor ref={this.Action} />
            </PanelCreateWrapper>
          );
        case TypeSensorTabs.Controllers:
          return (
            <PanelCreateWrapper className="PanelCreateWrapper">
              <CreatController ref={this.Action} />
            </PanelCreateWrapper>
          );
        case TypeSensorTabs.Configurations:
          return (
            <PanelCreateWrapper className="PanelCreateWrapper">
              <CreateConfiguration
                isHaveSecretField={true}
                rcName="config"
                ref={this.Action}
              />
            </PanelCreateWrapper>
          );
        default:
          return;
      }
    }
    if (this.props.confirmType !== TypeConfirm.Null && this.props.workingTab) {
      return (
        <Confirm
          onHandleSubmit={this._onHandleSubmitConfirm}
          onHandleCancel={this._onHandleCancelConfirm}
          rcName={this.props.workingTab}
          content={
            this.props.confirmType === TypeConfirm.Unavailable
              ? "This function is still in stages of development."
              : undefined
          }
        />
      );
    }
  };

  render() {
    let isDisabled =
      this.props.workingListItem &&
      this.props.workingListItem.length > 0 &&
      !this.props.isWorking;
    if (this.state.isRedirect) {
      return <Redirect to={`/organizations`} />;
    }
    return (
      <SensorWrapper className="SensorWrapper">
        <PivotWrapper
          className="PivotWrapper"
          id="pivot-wrapper"
          theme={{
            darkMode: this.props.theme,
            isStillWorkingCreate: this.props.isWorking,
          }}
        >
          <Pivot
            onLinkClick={this._onChangePivotItem}
            styles={{
              itemContainer: {
                width: "100%",
                height: "100%",
              },
            }}
            rcName={`org`}
            darkMode={this.props.theme}
            selectedKey={this._mapWorkingTab(this.props.workingTab)}
            disableAction={true}
          >
            {SensorsListPivotItems.map((item, index) => {
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
                  headerButtonProps={{
                    disabled:
                      this.state.isDisabled && item.text === "Sensors"
                        ? true
                        : false,
                  }}
                >
                  <div className="main__content">
                    <ActionButtonWrapper
                      className="ActionButtonWrapper"
                      theme={this.props.theme}
                    >
                      <CommandBarButton
                        onClick={this._onHandleVisiblePanel}
                        iconProps={IconGeneralProps.addIcon}
                        text="Add more"
                        rcName={`addMore.${this.props.workingTab}`}
                        darkMode={this.props.theme}
                      />
                      <CommandBarButton
                        disabled={!isDisabled}
                        iconProps={IconGeneralProps.deleteIcon}
                        text="Delete"
                        rcName={`delete.${this.props.workingTab}`}
                        darkMode={this.props.theme}
                        onClick={this._onHandleDeleteItems}
                      />
                    </ActionButtonWrapper>
                    {this.RenderTabContent()}
                  </div>
                </PivotItem>
              );
            })}
          </Pivot>
        </PivotWrapper>
        <Customizer scopedSettings={{ Layer: { hostId: "main-panel" } }}>
          <Panel
            isOpen={
              this.props.isPanelPageOpen &&
              this.props.panelType === TypePanel.Create
            }
            // isOpen={true}
            hasCloseButton
            headerText={
              this.props.confirmType === TypeConfirm.Null
                ? `Create ${this._RenderPanelContent()}`
                : "Confirmation"
            }
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
            onRenderFooterContent={
              !this.props.isSearchInPanel &&
              this.props.confirmType === TypeConfirm.Null
                ? this.RenderFooterPanel
                : undefined
            }
            isFooterAtBottom={true}
            rcName={`${this.props.workingTab}`}
          >
            {this.RenderAddNewContent()}
          </Panel>
        </Customizer>
      </SensorWrapper>
    );
  }
}

export default Sensor;

import * as React from "react";
import { FetchDataFromServer, BuildRCAttribute } from "src/common/functions";
import { ISensorListProps, ISensorListStates } from "./ListModels";
import { ListWrapper } from "./ListStyle";
import ListCustom from "aod-dependencies/DataList";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import { TypeConfirm, TypePanel, TypeSensorTabs } from "src/entity/enums";
import buildQuery from "odata-query";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { BaseSensor } from "src/common/classes/BaseSensor";
import { BaseController } from "src/common/classes/BaseController";
import { BaseSensorType } from "src/common/classes/BaseSensorType";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import { Panel, PanelType } from "aod-dependencies/Panel";
import { PanelStyle } from "src/common/style";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import EditConfiguration from "src/ui/containers/Sensor/Tabs/Configurations/EditConfigurationContainer";
import EditController from "src/ui/containers/Sensor/Tabs/Controllers/EditControllerContainer";
import { BaseResource, ResourceDto } from "src/common/classes/BaseResource";
import { IsCanBeReload } from "src/services/implements/SignalRManager";

class ListSensors extends React.Component<ISensorListProps, ISensorListStates> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ISensorListProps) {
    super(props);
    this.state = {
      cId: "",
      workflowId: "",
    };
    this.Action = React.createRef();
    this._query = new DataListSource();
    this._query.GetData = async (
      pageIndex: number,
      skipNumber: number,
      nextLink: string | null,
      endpoint?: string
    ): Promise<any[]> => {
      let top = skipNumber;
      let skip = skipNumber * (pageIndex - 1);
      let endpointBuilded = buildQuery({ top, skip });
      let url =
        nextLink && nextLink !== ""
          ? nextLink
          : `${`${this._onBuildUrlByWorkingTab()}`}${endpointBuilded}${
              endpoint ? `&${endpoint.split("?")[1]}` : ""
            }`;
      await FetchDataFromServer({ url: url }).then((res) => {
        if (res) {
          this._query.source = res.value;
        }
      });
      return [];
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: ISensorListProps) {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    let isReloadProps = IsCanBeReload(
      nextProps.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    if (isReload || isReloadProps) {
      this._onHandleGetDataForm();
    }
  }

  private _onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
    if (this.state.cId !== "" || this.state.workflowId !== "") {
      this.setState({ workflowId: "", cId: "" });
    }
  };

  private _onBuildUrlByWorkingTab = () => {
    if (this.props.workingTab) {
      switch (this.props.workingTab) {
        case TypeSensorTabs.Sensors:
          return `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}Sensors`;

        case TypeSensorTabs.Controllers:
          return `${BuildURLWithTenantId(
            ApiFromOData.ODATA_API
          )}SensorControllers`;

        case TypeSensorTabs.Configurations:
          return `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}SensorTypes`;

        default:
          return "";
      }
    }
    return "";
  };

  private _onUpdateVisiblePanel = (val: boolean) => {
    if (this.props.isPanelPageOpen !== val && this.props.OnHandleVisiblePanel) {
      this.props.OnHandleVisiblePanel(val);
    }
  };

  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType && this.props.confirmType !== type) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onResetSensorStore = () => {
    if (this.props.OnResetSensorStore) {
      this.props.OnResetSensorStore();
    }
  };

  private _onOpenPanel = (item: any) => {
    setTimeout(() => {
      this._onUpdateVisiblePanel(true);
    }, 0);
    if (this.props.workingTab) {
      switch (this.props.workingTab) {
        case TypeSensorTabs.Sensors:
          return this._onHandleUpdateEdtSensor(item);

        case TypeSensorTabs.Controllers:
          return this._onHandleUpdateEdtController(item);

        case TypeSensorTabs.Configurations:
          return this._onHandleUpdateEdtConfiguration(item);

        default:
          return;
      }
    }
  };

  private _onHandleSelection = (selectedItems: any[]) => {
    if (this.props.OnHandleUpdateWorkingItems && this.props.workingTab) {
      this.props.OnHandleUpdateWorkingItems(
        selectedItems,
        this.props.workingTab
      );
    }
  };

  private _mapIconByWorkingTab = (): string => {
    switch (this.props.workingTab) {
      case TypeSensorTabs.Sensors:
        return "HardDrive";
      case TypeSensorTabs.Controllers:
        return "ConnectVirtualMachine";
      default:
        return "DocumentManagement";
    }
  };

  private _onHandleUpdateEdtSensor = (sensor: any) => {
    let item = new BaseSensor();
    item.sensorId = sensor.sensorId;
    item.guid = sensor.guid;
    item.sensorControllerId = sensor.sensorControllerId;
    item.occupationStatus = sensor.occupationStatus;
    item.sensorType = sensor.sensorType;
    item.resourceName = sensor.resourceName;
    if (sensor.resourceInfo) {
      let dto = new ResourceDto();
      dto.capacity = sensor.resourceInfo.capacity;
      dto.deadline = sensor.resourceInfo.deadline;
      dto.deadlineMess = sensor.resourceInfo.deadlineMess;
      dto.deadlineTime = sensor.resourceInfo.deadlineTime;
      dto.department = sensor.resourceInfo.department;
      dto.description = sensor.resourceInfo.description;
      dto.displayName = sensor.resourceInfo.displayName;
      dto.domain = sensor.resourceInfo.email.split("@")[1];
      dto.email = sensor.resourceInfo.email;
      // dto.email = sensor.resourceInfo.email.split("@")[0];
      dto.gallery = sensor.resourceInfo.imageURLs;
      dto.id = sensor.resourceInfo.guid;
      dto.location = sensor.resourceInfo.location;
      dto.maxDelivery = sensor.resourceInfo.maxDelivery;
      dto.minHours = sensor.resourceInfo.minHours;
      dto.minHoursMess = sensor.resourceInfo.minHoursMess;
      dto.name = sensor.resourceInfo.name;
      dto.phone = sensor.resourceInfo.phone;
      dto.timeZone = sensor.resourceInfo.timeZone;
      dto.resourceAdInfo = sensor.resourceInfo.resourceAdInfo;
      item.resourceInfo = new BaseResource(dto);
    }
    item.resourceId = sensor.resourceId;
    if (this.props.OnUpdateEditSensor) {
      this.props.OnUpdateEditSensor(sensor);
    }
  };

  private _onHandleUpdateEdtController = (controller: any) => {
    let item = new BaseController();
    item.resourceId = controller.resourceId;
    item.resourceName = controller.resourceName;
    item.sensorControllerId = controller.sensorControllerId;
    item.sensors = controller.sensors;
    item.guid = controller.guid;
    item.timeZone = controller.timeZone;
    item.totalSensors = controller.totalSensors;
    item.occupationStatus = controller.occupationStatus;
    item.controllerStatus = controller.controllerStatus;
    item.reservationTime = controller.configDefaultReservationTime;
    item.sensorTime = controller.configDefaultSensorTimeFrame;
    item.reservationTimeTick = controller.configDefaultReservationTimeTick;
    item.sensorTimeTick = controller.configDefaultSensorTimeFrameTick;
    if (controller.resourceInfo) {
      let dto = new ResourceDto();
      dto.capacity = controller.resourceInfo.capacity;
      dto.deadline = controller.resourceInfo.deadline;
      dto.deadlineMess = controller.resourceInfo.deadlineMess;
      dto.deadlineTime = controller.resourceInfo.deadlineTime;
      dto.department = controller.resourceInfo.department;
      dto.description = controller.resourceInfo.description;
      dto.displayName = controller.resourceInfo.displayName;
      dto.domain = controller.resourceInfo.email.split("@")[1];
      dto.email = controller.resourceInfo.email;
      // dto.email = controller.resourceInfo.email.split("@")[0];
      dto.gallery = controller.resourceInfo.imageURLs;
      dto.id = controller.resourceInfo.guid;
      dto.location = controller.resourceInfo.location;
      dto.maxDelivery = controller.resourceInfo.maxDelivery;
      dto.minHours = controller.resourceInfo.minHours;
      dto.minHoursMess = controller.resourceInfo.minHoursMess;
      dto.name = controller.resourceInfo.name;
      dto.phone = controller.resourceInfo.phone;
      dto.timeZone = controller.resourceInfo.timeZone;
      dto.resourceAdInfo = controller.resourceInfo.resourceAdInfo;
      item.resourceInfo = new BaseResource(dto);
    }
    if (this.props.OnUpdateEditController) {
      this.props.OnUpdateEditController(item);
    }
  };

  private _onHandleUpdateEdtConfiguration = (configuration: any) => {
    let item = new BaseSensorType();
    item.guid = configuration.guid;
    item.apiKey = configuration.apiKey;
    item.endpoint = configuration.pushUrlEndPoint;
    item.numberOfSensors = configuration.numberOfSensors;
    item.pushUrl = configuration.pushUrl;
    item.pullUrl = configuration.pullUrl;
    item.sensorType = configuration.type;
    if (this.props.OnUpdateEditConfiguration) {
      this.props.OnUpdateEditConfiguration(item);
    }
  };

  private _onHandleCancelPanel = async () => {
    if (this.props.isWorking && this.props.confirmType === TypeConfirm.Null) {
      this._onHandleUpdateConfirmType(TypeConfirm.Cancel);
    }
    if (this.props.isWorking && this.props.confirmType !== TypeConfirm.Null) {
      this._onHandleUpdateConfirmType(TypeConfirm.Null);
      this._onUpdateVisiblePanel(false);
      this._onResetSensorStore();
    }
    if (!this.props.isWorking) {
      this._onUpdateVisiblePanel(false);
      this._onResetSensorStore();
    }
  };

  private _onHandleUpdateSensor = async (isDisconnect?: boolean) => {
    if (this.props.sensor && this.props.OnUpdateSensorTS) {
      await this.props
        .OnUpdateSensorTS(this.props.sensor, isDisconnect)
        .then((res) => {
          if (res) {
            this.setState({ cId: res.conversationId });
          }
        });
    }
  };

  private _onHandleUpdateSensorController = async () => {
    if (this.props.controller && this.props.OnUpdateSensorControllerTS) {
      await this.props
        .OnUpdateSensorControllerTS(this.props.controller)
        .then((res) => {
          if (res) {
            this.setState({ cId: res.conversationId });
          }
        });
    }
  };

  private _onHandleUpdateSensorType = async () => {
    if (this.props.config && this.props.OnUpdateSensorTypeTS) {
      await this.props.OnUpdateSensorTypeTS(this.props.config).then((res) => {
        if (res) {
          this.setState({ cId: res.conversationId });
        }
      });
    }
  };

  private _onHandleUnregisterSensor = async () => {
    if (this.props.sensor && this.props.OnUnregisterSensorTS) {
      await this.props.OnUnregisterSensorTS(this.props.sensor).then((res) => {
        if (res) {
          this.setState({ cId: res.conversationId });
        }
      });
    }
  };

  private _onHandleUnregisterSensorController = async () => {
    if (this.props.controller && this.props.OnUnregisterSensorControllerTS) {
      await this.props
        .OnUnregisterSensorControllerTS(this.props.controller)
        .then((res) => {
          if (res) {
            this.setState({ cId: res.conversationId });
          }
        });
    }
  };

  private _onHandleUnregisterSensorType = async () => {
    if (this.props.config && this.props.OnUnregisterSensorTypeTS) {
      await this.props
        .OnUnregisterSensorTypeTS(this.props.config)
        .then((res) => {
          if (res) {
            this.setState({ cId: res.conversationId });
          }
        });
    }
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

  onHandleSubmitCfm = () => {
    if (
      this.props.workingTab &&
      this.props.confirmType === TypeConfirm.ReviewSS
    ) {
      switch (this.props.workingTab) {
        case TypeSensorTabs.Sensors:
          return this._onHandleUpdateSensor();
        case TypeSensorTabs.Controllers:
          return this._onHandleUpdateSensorController();
        case TypeSensorTabs.Configurations:
          return this._onHandleUpdateSensorType();
        default:
          return;
      }
    }
    if (
      this.props.workingTab &&
      this.props.confirmType === TypeConfirm.Delete
    ) {
      switch (this.props.workingTab) {
        case TypeSensorTabs.Sensors:
          return this._onHandleUnregisterSensor();
        case TypeSensorTabs.Controllers:
          return this._onHandleUnregisterSensorController();
        case TypeSensorTabs.Configurations:
          return this._onHandleUnregisterSensorType();
        default:
          return;
      }
    }
    if (
      this.props.workingTab &&
      this.props.workingTab === TypeSensorTabs.Sensors &&
      this.props.confirmType === TypeConfirm.Update
    ) {
      this._onHandleUpdateSensor(true);
    }
    if (this.props.confirmType === TypeConfirm.Cancel) {
      this._onHandleUpdateConfirmType(TypeConfirm.Null);
      this._onUpdateVisiblePanel(false);
      this._onResetSensorStore();
    }
  };

  RenderContentEdit = () => {
    if (this.props.workingTab && this.props.confirmType === TypeConfirm.Null) {
      switch (this.props.workingTab) {
        case TypeSensorTabs.Controllers:
          return <EditController rcName={this.props.workingTab} />;
        default:
          return <EditConfiguration />;
      }
    }
    if (this.props.confirmType !== TypeConfirm.Null) {
      return (
        <Confirm
          onHandleSubmit={this.onHandleSubmitCfm}
          rcName={`edt.${this.props.workingTab}`}
        />
      );
    }
  };

  render() {
    const controllerCols = [
      {
        key: "ResourceSS",
        name: "Resource",
        fieldName: "resourceName",
        minWidth: 80,
        priority: 1,
        data: "string",
        onRender: (item: any, index?: number) => {
          let actionIdRc = BuildRCAttribute(
            `sp.${item.resourceName}${index ? `.${index}` : ".0"}`
          );
          return (
            <span
              {...actionIdRc}
              className="column__action"
              style={{ cursor: "pointer" }}
              onClick={() => this._onOpenPanel(item)}
            >
              {item.resourceName}
            </span>
          );
        },
      },
      {
        key: "TotalSS",
        name: "Total Sensors",
        fieldName: "totalSensors",
        minWidth: 80,
        data: "number",
        onRender: (item: any) => {
          return <span className="text-ellipsis-2">{item.totalSensors}</span>;
        },
      },
      {
        key: "TimeZoneSS",
        name: "Time zone",
        fieldName: "timeZone",
        minWidth: 80,
        data: "string",
        onRender: (item: any) => {
          return <span className="text-ellipsis-2">{item.timeZone}</span>;
        },
      },
      {
        key: "StatusSS",
        name: "Status",
        fieldName: "occupationStatus",
        minWidth: 80,
        data: "string",
        onRender: (item: any) => {
          return (
            <span className="text-ellipsis-2">{item.occupationStatus}</span>
          );
        },
      },
    ];
    const configurationCols = [
      {
        key: "TypeSS",
        name: "Type",
        fieldName: "type",
        minWidth: 80,
        priority: 1,
        data: "string",
        onRender: (item: any, index?: number) => {
          let actionIdRc = BuildRCAttribute(
            `sp.${item.type}${index ? `.${index}` : ".0"}`
          );
          return (
            <span
              {...actionIdRc}
              className="column__action"
              style={{ cursor: "pointer" }}
              onClick={() => this._onOpenPanel(item)}
            >
              {item.type}
            </span>
          );
        },
      },
      {
        key: "PullUrlSS",
        name: "Pull URL",
        fieldName: "pullUrl",
        minWidth: 80,
        data: "string",
        onRender: (item: any) => {
          return <span className="text-ellipsis-2">{item.pullUrl}</span>;
        },
      },
      {
        key: "PushUrlSS",
        name: "Push URL",
        fieldName: "pushUrl",
        minWidth: 80,
        data: "string",
        onRender: (item: any) => {
          return <span className="text-ellipsis-2">{item.pushUrl}</span>;
        },
      },
      {
        key: "PushEntSS",
        name: "Push Endpoint",
        fieldName: "pushUrlEndPoint",
        minWidth: 80,
        data: "string",
        onRender: (item: any) => {
          return (
            <span className="text-ellipsis-2">{item.pushUrlEndPoint}</span>
          );
        },
      },
    ];
    const sensorCols = [
      {
        key: "TypeSS",
        name: "Type",
        fieldName: "sensorType",
        priority: 2,
        minWidth: 80,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.sensorType}</span>;
        },
      },
      {
        key: "SensorIdSS",
        name: "Sensor Id",
        fieldName: "sensorId",
        minWidth: 80,
        priority: 1,
        data: "string",
        onRender: (item: any, index?: number) => {
          return <span>{item.sensorId}</span>;
        },
      },
      {
        key: "ResourceSS",
        name: "Resource",
        fieldName: "resourceName",
        minWidth: 80,
        data: "string",
        onRender: (item: any) => {
          return <span className="text-ellipsis-2">{item.resourceName}</span>;
        },
      },
      {
        key: "StatusSS",
        name: "Status",
        fieldName: "occupationStatus",
        minWidth: 80,
        data: "string",
        onRender: (item: any) => {
          return (
            <span className="text-ellipsis-2">{item.occupationStatus}</span>
          );
        },
      },
    ];
    const _BuildWorkingColumn = () => {
      if (this.props.workingTab) {
        switch (this.props.workingTab) {
          case TypeSensorTabs.Sensors:
            return sensorCols;

          case TypeSensorTabs.Controllers:
            return controllerCols;

          case TypeSensorTabs.Configurations:
            return configurationCols;

          default:
            return [];
        }
      }
      return [];
    };
    return (
      <ListWrapper className="ListWrapper" theme={this.props.theme}>
        <ListCustom
          rcName={`sensor.${this.props.workingTab}`}
          columns={_BuildWorkingColumn()}
          isOffline={false}
          darkMode={this.props.theme}
          onGetSelectionItem={this._onHandleSelection}
          iconName={this._mapIconByWorkingTab()}
          selectedItems={this.props.workingListItems}
          queryClass={this._query}
          ref={this.Action}
        />
        <Customizer scopedSettings={{ Layer: { hostId: "main-panel" } }}>
          <Panel
            isOpen={
              this.props.isPanelPageOpen &&
              this.props.panelType === TypePanel.Edit
            }
            hasCloseButton
            headerText={
              this.props.confirmType === TypeConfirm.Null
                ? `Edit ${this._RenderPanelContent()}`
                : "Confirmation"
            }
            focusTrapZoneProps={{
              isClickableOutsideFocusTrap: true,
              forceFocusInsideTrap: false,
            }}
            isBlocking={false}
            onDismiss={this._onHandleCancelPanel}
            styles={PanelStyle(this.props.theme)}
            type={PanelType.medium}
            rcName={`edit.${this.props.workingTab}`}
          >
            {this.RenderContentEdit()}
          </Panel>
        </Customizer>
      </ListWrapper>
    );
  }
}

export default ListSensors;

import * as React from "react";
import {
  SensorTabWrapper,
  NotConnectedWrapper,
  SensorContentWrapper,
} from "./SensorStyle";
import { ISensorTabProps, ISensorTabStates } from "./SensorModel";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import ListCustom from "aod-dependencies/DataList";
import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import { BuildRCAttribute, FetchDataFromServer } from "src/common/functions";
import { IconGeneralProps } from "src/common/style";
import Toggle from "aod-dependencies/Toggle/CustomToggle";
import buildQuery from "odata-query";
import { SelectionMode } from "aod-dependencies/@uifabric/utilities/selection";
import { BaseController } from "src/common/classes/BaseController";
import { BuildURLWithTenantId, ApiFromOData } from "src/common/constants";
import { Redirect } from "react-router-dom";

export default class SyncTab extends React.Component<
  ISensorTabProps,
  ISensorTabStates
> {
  protected _query: DataListSource;
  constructor(props: ISensorTabProps) {
    super(props);
    this.state = {
      status: false,
      isRedirect: false,
      controller: new BaseController(),
      isHaveSensors: true,
    };
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
      let defaultURL = `${BuildURLWithTenantId(
        ApiFromOData.ODATA_API
      )}resources`;
      if (this.props.resource) {
        defaultURL = `${BuildURLWithTenantId(
          ApiFromOData.ODATA_API
        )}resources('${this.props.resource.id}')/sensors`;
      }
      let url =
        nextLink && nextLink !== ""
          ? `${defaultURL}${endpointBuilded}${
              endpoint ? `&${endpoint.split("?")[1]}` : ""
            }&$skiptoken=${nextLink}`
          : `${defaultURL}${endpointBuilded}${
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

  UNSAFE_componentWillMount() {
    if (this.props.resource) {
      this._onHandleGetControllerById();
    }
  }

  private _onHandleGetControllerById = () => {
    if (this.props.resource && this.props.OnGetControllerByResourceId) {
      this.props
        .OnGetControllerByResourceId(this.props.resource.id)
        .then((res) => {
          if (res && res.length > 0) {
            let response = res[0];
            let controller = new BaseController();
            controller.controllerStatus = response.controllerStatus;
            controller.occupationStatus = response.occupationStatus;
            controller.reservationTime = response.configDefaultReservationTime;
            controller.resourceId = response.resourceId;
            // controller.resourceInfo = response.resourceInfo;
            controller.resourceName = response.resourceName;
            controller.sensorControllerId = response.sensorControllerId;
            controller.guid = response.guid;
            controller.sensorTime = response.configDefaultSensorTimeFrame;
            // controller.sensors = response.sensors;
            controller.timeZone = response.timeZone;
            controller.totalSensors = response.totalSensors;
            controller.sensorTimeTick =
              response.configDefaultSensorTimeFrameTick;
            controller.reservationTimeTick =
              response.configDefaultReservationTimeTick;
            this.setState({ controller, isHaveSensors: true });
          } else {
            this.setState({ isHaveSensors: false });
          }
        });
    }
  };

  private _onHandleUpdateWorkingSensorTab = () => {
    if (this.props.OnUpdateWorkingTabSensor) {
      this.props.OnUpdateWorkingTabSensor();
    }
  };
  private _onHandleUpdateOccupationStatus = (val: boolean) => {
    if (this.props.OnUpdateOccupationStatus) {
      this.props.OnUpdateOccupationStatus(this.state.controller, val);
    }
  };

  onHandleChangeSearch = () => {
    console.log("redirect here");
    window.location.assign("/sensors");
  };

  onHandleChangeToggle = (
    ev?: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ) => {
    let crtController = this.state.controller.Clone() as BaseController;
    crtController.controllerStatus =
      typeof checked === "boolean" ? checked : false;
    this.setState(
      {
        status: typeof checked === "boolean" ? checked : false,
        controller: crtController,
      },
      () =>
        this._onHandleUpdateOccupationStatus(
          typeof checked === "boolean" ? checked : false
        )
    );
  };

  render() {
    let idSensorId = BuildRCAttribute(`sp.id`);
    let idTotalSensor = BuildRCAttribute(`sp.total`);
    let idLink = BuildRCAttribute(`lik.connect`);
    let idInfomation = BuildRCAttribute(`blk.infomation`);
    let idNotConnect = BuildRCAttribute(`blk.notConnect`);
    let idTextNotConnect = BuildRCAttribute(`sp.notConnect`);

    const sensorCols = [
      {
        key: "TypeSS",
        name: "Type",
        fieldName: "sensorType",
        minWidth: 80,
        maxWidth: 150,
        priority: 1,
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
        maxWidth: 150,
        priority: 2,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.sensorId}</span>;
        },
      },
      {
        key: "StatusSS",
        name: "Status",
        fieldName: "occupationStatus",
        minWidth: 80,
        maxWidth: 150,
        data: "string",
        onRender: (item: any) => {
          return (
            <span className="text-ellipsis-2">{item.occupationStatus}</span>
          );
        },
      },
    ];

    if (this.state.isRedirect) {
      return <Redirect to="/sensors" />;
    }

    return (
      <SensorTabWrapper className="SensorTabWrapper" theme={this.props.theme}>
        {this.state.isHaveSensors ? (
          <SensorContentWrapper
            className="SensorContentWrapper"
            theme={this.props.theme}
            {...idInfomation}
          >
            <div className="content__header">
              <div className="ss__infomation">
                <Icon
                  iconName={IconGeneralProps.controllerIcon.iconName}
                  className="ss__icon"
                  rcName="sensor.controller"
                />
                <div className="sensor__detail">
                  <h4 className="ss__id" {...idSensorId}>
                    {this.state.controller.guid}
                  </h4>
                  <span className="ss__total">
                    Total Sensor:{" "}
                    <span {...idTotalSensor}>
                      {this.state.controller.totalSensors}
                    </span>
                  </span>
                </div>
              </div>
              <Toggle
                onChange={this.onHandleChangeToggle}
                darkMode={this.props.theme}
                rcName="sensor"
                label="Status"
                checked={this.state.controller.controllerStatus}
              />
            </div>
            <ListCustom
              rcName={`sensor`}
              columns={sensorCols}
              isOffline={false}
              darkMode={this.props.theme}
              iconName={IconGeneralProps.sensorIcon.iconName}
              queryClass={this._query}
              selectionMode={SelectionMode.none}
            />
          </SensorContentWrapper>
        ) : (
          <NotConnectedWrapper
            className="NotConnectedWrapper"
            theme={this.props.theme}
            {...idNotConnect}
          >
            <Icon
              iconName={IconGeneralProps.sensorIcon.iconName}
              className="ss__icon"
              rcName="sensor"
            />
            <p {...idTextNotConnect}>Doesn’t connect with any Sensor</p>
            <p
              {...idLink}
              onClick={this.onHandleChangeSearch}
              className="ss__connect"
            >
              Connect now
            </p>
          </NotConnectedWrapper>
        )}
      </SensorTabWrapper>
    );
  }
}

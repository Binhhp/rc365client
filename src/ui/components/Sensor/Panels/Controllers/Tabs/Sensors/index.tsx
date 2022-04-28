import * as React from "react";
import { ISensorTabProps, ISensorTabState } from "./SensorModel";
import { SensorTabWrapper, ActionWrapper, SearchWrapper } from "./SensorStyle";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import buildQuery from "odata-query";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import ListCustom from "aod-dependencies/DataList";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { IconGeneralProps } from "src/common/style";
import SearchBox from "aod-dependencies/SearchBox/CustomSearchBox";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import { IsCanBeReload } from "src/services/implements/SignalRManager";
import { FetchDataFromServer } from "src/common/functions";

class SensorTab extends React.Component<ISensorTabProps, ISensorTabState> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ISensorTabProps) {
    super(props);
    this.state = {
      selectedItems: [],
      isConfirm: false,
      isSearch: false,
      isLoading: false,
      cId: "",
      workflowId: "",
      text: "",
      typingTimeout: 0,
      visibleText: "",
      confirmType: "",
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
      let defaultURL = `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}Sensors`;
      if (
        this.state.text.trim() !== "" &&
        this.props.controller &&
        this.state.isSearch
      ) {
        let filter: any[] = [
          `contains(tolower(sensorId),tolower('${this.state.text}'))`,
        ];
        endpointBuilded = buildQuery({ top, skip, filter });
      }
      if (
        this.state.text.trim() === "" &&
        this.props.controller &&
        !this.state.isSearch
      ) {
        let filterText = `sensorControllerId eq '${this.props.controller.sensorControllerId}'`;
        if (endpoint && endpoint.indexOf("?$filter=") !== -1) {
          let arr = endpoint.split("?$filter=");
          let paging = endpointBuilded.split("?$")[1];
          arr[1] = `${filterText} and ${arr[1]}`;
          arr[0] = `?$filter=`;
          arr.push(`&${paging}`);
          endpointBuilded = arr.join("");
        }
        if (endpoint && endpoint.indexOf("?$filter=") === -1) {
          let filter = [
            { sensorControllerId: this.props.controller.sensorControllerId },
          ];
          endpointBuilded = buildQuery({ top, skip, filter });
        }
      }
      let url = `${defaultURL}${endpointBuilded}`;
      if (nextLink && nextLink.trim() !== "") {
        url = `${url}&$skiptoken=${nextLink}`;
      }
      await FetchDataFromServer({ url: url }).then((res) => {
        if (res) {
          this._query.source = res.value;
        }
      });
      return [];
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: ISensorTabProps) {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    if (isReload) {
      this._onHandleCallApiGetDataList();
    }
  }

  private _onHandleRef = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleUpdateStore();
  };

  private _onHandleCallApiGetDataList = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
    if (this.state.cId !== "" || this.state.workflowId !== "") {
      this.setState({ workflowId: "", cId: "" });
    }
  };

  private _onHandleUpdateWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };
  private _onHandleAddSensorToController = () => {
    if (this.props.controller && this.props.OnAddSensorToController) {
      this.props
        .OnAddSensorToController(
          this.props.controller.sensorControllerId,
          this.state.selectedItems
        )
        .then((res) => {
          if (res) {
            this.setState({
              workflowId: res.workflowId || "",
              cId: res.conversationId,
            });
          }
        });
    }
  };

  private _onHandleRemoveSensorToController = () => {
    if (this.props.controller && this.props.OnRemoveSensorToController) {
      this.props
        .OnRemoveSensorToController(
          this.props.controller.sensorControllerId,
          this.state.selectedItems
        )
        .then((res) => {
          if (res) {
            this.setState({
              workflowId: res.workflowId || "",
              cId: res.conversationId,
            });
          }
        });
    }
  };

  onHandUpdateState = (selectedItems: any[]) => {
    this.setState({ selectedItems });
    if (this.state.isSearch) {
      this._onHandleUpdateWorkingStatus(
        selectedItems.length > 0 ? true : false
      );
    }
  };

  onHandleDeleteItems = () => {
    if (this.state.selectedItems.length > 0) {
      this.setState({ isConfirm: true, confirmType: "delete" });
    }
  };

  onHandleUpdateConfirm = () => {
    this.setState({ isConfirm: !this.state.isConfirm });
  };

  onHandleSearchSensor = () => {
    if (this.props.isWorking && this.state.selectedItems.length > 0) {
      this.setState({ isConfirm: true, confirmType: "cancel", text: "" });
    }
    this.setState({
      isSearch: !this.state.isSearch,
      selectedItems: [],
      text: "",
    });
  };

  onSearchWhenStopTyping = (
    event?: React.ChangeEvent<HTMLInputElement>,
    str?: string
  ): void => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      isLoading: true,
      visibleText: str || "",
      cId: "",
      typingTimeout: window.setTimeout(() => {
        this._query.source = [];
        this.setState(
          {
            isLoading: false,
            text: str ? str.trim() : "",
          },
          () => this._onHandleCallApiGetDataList()
        );
      }, 1000),
    });
  };

  onHandleSubmitConfirm = () => {
    if (this.state.confirmType === "delete") {
      this._onHandleRemoveSensorToController();
    }
    if (this.state.confirmType === "add") {
      this._onHandleAddSensorToController();
    }
    this.setState({
      isSearch: false,
      confirmType: "",
      isConfirm: false,
      selectedItems: [],
    });
  };

  onHandleSaveAddSensors = () => {
    if (this.state.selectedItems.length > 0 && this.props.isWorking) {
      this.setState({ isConfirm: true, confirmType: "add", text: "" });
    }
  };

  render() {
    const sensorCols = [
      {
        key: "TypeSS",
        name: "Type",
        fieldName: "sensorType",
        minWidth: 80,
        maxWidth: 180,
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
        priority: 2,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.sensorId}</span>;
        },
      },
    ];

    return (
      <SensorTabWrapper className="SensorTabWrapper">
        {this.state.isConfirm ? (
          <Confirm
            onHandleSubmit={this.onHandleSubmitConfirm}
            onHandleCancel={this.onHandleUpdateConfirm}
            rcName={`controller.edt${this.props.workingTab}`}
            content={
              this.state.confirmType === "add"
                ? "Do you really want to save this changes?"
                : this.state.confirmType === "cancel"
                ? "Changes that you made may not be saved. \nMakes you sure you want to close?"
                : "Are you sure you want to delete the selected sensor(s)?"
            }
          />
        ) : (
          <>
            {this.state.isSearch ? (
              <SearchWrapper className="SearchWrapper">
                <div className="search__wrapper">
                  <ActionWrapper
                    className="ActionButtonWrapper"
                    theme={this.props.theme}
                  >
                    <CommandBarButton
                      onClick={this.onHandleSaveAddSensors}
                      disabled={
                        this.state.selectedItems.length < 1 ? true : false
                      }
                      iconProps={IconGeneralProps.saveIcon}
                      text="Save"
                      rcName={`save.sensor.edt${this.props.workingTab}`}
                      darkMode={this.props.theme}
                    />
                    <CommandBarButton
                      iconProps={IconGeneralProps.cancelIcon}
                      text="Cancel"
                      rcName={`cancel.sensor.edt${this.props.workingTab}`}
                      darkMode={this.props.theme}
                      onClick={this.onHandleSearchSensor}
                    />
                  </ActionWrapper>
                  <span className="item_searchLabel">Search</span>
                  <SearchBox
                    rcName={`search.sensor${
                      this.props.workingTab
                        ? `.edt${this.props.workingTab}`
                        : ""
                    }`}
                    darkMode={this.props.theme}
                    placeholder="Search"
                    id="search.box"
                    onChange={this.onSearchWhenStopTyping}
                    value={this.state.visibleText}
                    onBlur={() =>
                      this.setState({
                        visibleText: this.state.visibleText.trim(),
                      })
                    }
                  />
                </div>
              </SearchWrapper>
            ) : (
              <ActionWrapper
                className="ActionButtonWrapper"
                theme={this.props.theme}
              >
                <CommandBarButton
                  onClick={this.onHandleSearchSensor}
                  iconProps={IconGeneralProps.addIcon}
                  text="Add more"
                  rcName={`addMore.sensor.edt${this.props.workingTab}`}
                  darkMode={this.props.theme}
                />
                <CommandBarButton
                  disabled={this.state.selectedItems.length < 1 ? true : false}
                  iconProps={IconGeneralProps.deleteIcon}
                  text="Delete"
                  rcName={`delete.sensor.edt${this.props.workingTab}`}
                  darkMode={this.props.theme}
                  onClick={this.onHandleDeleteItems}
                />
              </ActionWrapper>
            )}
            {((this.state.isSearch && this.state.text.trim() !== "") ||
              !this.state.isSearch) && (
              <ListCustom
                rcName={`sensor.edt${this.props.workingTab}`}
                columns={sensorCols}
                isOffline={false}
                isLoading={this.props.isHaveMessageSignalR}
                darkMode={this.props.theme}
                onGetSelectionItem={this.onHandUpdateState}
                iconName="HardDrive"
                selectedItems={this.state.selectedItems}
                queryClass={this._query}
                isFilterHidden={this.state.isSearch}
                ref={this.Action}
              />
            )}
          </>
        )}
      </SensorTabWrapper>
    );
  }
}

export default SensorTab;

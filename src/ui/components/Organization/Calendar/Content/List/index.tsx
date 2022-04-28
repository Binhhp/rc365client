import * as React from "react";
import {
  BuildRCAttribute,
  FetchDataFromServer,
  TimeFunction,
} from "src/common/functions";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import ListCustom from "aod-dependencies/DataList";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import { Panel, PanelType } from "aod-dependencies/Panel";
import { IconGeneralProps, PanelStyle } from "src/common/style";
import { ICalendarListProps, ICalendarListState } from "./ListModel";
import { AppointmentListWrapper, ConfirmContentWrapper } from "./ListStyle";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import buildQuery from "odata-query";
import { LoadingSpinner } from "src/common/ui/Loading";
import EditAppointment from "src/ui/containers/Organization/Calendar/EditAppointmentContainer";
import { IsCanBeReload } from "src/services/implements/SignalRManager";
import { Icon } from "aod-dependencies/@uifabric/icons";

export default class RenderList extends React.Component<
  ICalendarListProps,
  ICalendarListState
> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ICalendarListProps) {
    super(props);
    this.state = {
      item: null,
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
          : `${`${BuildURLWithTenantId(ApiFromOData.ODATA_API)}Calendars('${
              this.props.resource ? this.props.resource.id : ""
            }')/Appointments`}${endpointBuilded}${
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

  UNSAFE_componentWillReceiveProps(nextProps: ICalendarListProps) {
    let isReload = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    let isReloadProps = IsCanBeReload(
      nextProps.conversationId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    if (isReload || isReloadProps) {
      this.onHandleGetDataForm();
    }
  }

  onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
    if (this.state.cId !== "" || this.state.workflowId !== "") {
      this.setState({ workflowId: "", cId: "" });
    }
  };

  private _onHandleSelection = (selectedItems: any[]) => {
    if (this.props.OnUpdateSelectedAppointments) {
      this.props.OnUpdateSelectedAppointments(selectedItems);
    }
  };
  private _onHandleUpdateWorkingAppointment = (item: any) => {
    if (this.props.OnUpdateWorkingAppointment && this.props.timeZones) {
      this.props.OnUpdateWorkingAppointment(item, this.props.timeZones);
    }
  };

  private _onOpenPanel = (item: any) => {
    if (!this.props.isWorking && !this.props.isPanelPageOpen) {
      let val = !this.props.isPanelPageOpen;
      this._onUpdateVisiblePanel(val);
      this._onHandleUpdateWorkingAppointment(item);
    }
  };

  private _onUpdateVisiblePanel = (val: boolean) => {
    if (
      this.props.OnUpdatePagePanelStatus &&
      this.props.isPanelPageOpen !== val
    ) {
      this.props.OnUpdatePagePanelStatus(val);
    }
  };

  private _onResetApplicationStore = () => {
    if (this.props.OnResetApplicationStore) {
      this.props.OnResetApplicationStore();
    }
  };

  private _onHandleCancelPanel = async () => {
    if (this.props.isWorking && this.props.confirmType === TypeConfirm.Null) {
      this._onHandleUpdateConfirmType(TypeConfirm.Cancel);
    }
    if (this.props.isWorking && this.props.confirmType !== TypeConfirm.Null) {
      this._onHandleUpdateConfirmType(TypeConfirm.Null);
    }
    if (!this.props.isWorking) {
      this._onResetApplicationStore();
    }
  };

  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType && this.props.confirmType !== type) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onHandleDeleteAppointment = () => {
    if (
      this.props.OnDeleteAppointment &&
      this.props.workingAppointment &&
      this.props.workingCalendar &&
      this.props.resource
    ) {
      this.props.OnDeleteAppointment(
        this.props.resource.id,
        this.props.workingAppointment
      );
    }
  };

  private _onHandleEditAppointment = () => {
    if (
      this.props.OnEditAppointment &&
      this.props.workingAppointment &&
      this.props.resource &&
      this.props.timeZones
    ) {
      this.props.OnEditAppointment(
        this.props.resource.id,
        this.props.workingAppointment,
        this.props.timeZones
      );
    }
  };

  private _onHandleSubmitEdit = () => {
    if (this.props.confirmType === TypeConfirm.Delete) {
      this._onHandleDeleteAppointment();
    }
    if (
      this.props.OnUpdatePagePanelStatus &&
      this.props.confirmType === TypeConfirm.Cancel
    ) {
      this.props.OnUpdatePagePanelStatus(false);
    }

    if (this.props.confirmType === TypeConfirm.Submit) {
      this._onHandleEditAppointment();
    }
    this._onResetApplicationStore();
  };

  private _mapShowAsEnumToText = (str: string) => {
    switch (str) {
      case "OutOfOffice":
        return "Out of Office";
      case "WorkingElseWhere":
        return "Working Elsewhere";
      default:
        return str;
    }
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

  RenderContentEdit = () => {
    if (this.props.confirmType === TypeConfirm.Null) {
      return <EditAppointment />;
    } else {
      return (
        <Confirm
          onHandleSubmit={this._onHandleSubmitEdit}
          rcName={`edt.${this.props.workingTab}`}
          content={
            this.props.confirmType === TypeConfirm.Delete
              ? "Are you sure you want to delete the selected record?"
              : undefined
          }
        >
          {this.RenderConfirmContent()}
        </Confirm>
      );
    }
  };

  render() {
    const appointmentCols = [
      {
        key: "SubjectAp",
        name: "Subject",
        fieldName: "subject",
        minWidth: 80,
        priority: 1,
        data: "string",
        onRender: (item: any, index?: number) => {
          let actionIdRc = BuildRCAttribute(`sp.${item.subject}`);
          return (
            <span
              {...actionIdRc}
              className="column__action text-ellipsis-3"
              style={{ cursor: "pointer" }}
              onClick={() => this._onOpenPanel(item)}
            >
              {item.subject}
            </span>
          );
        },
      },
      {
        key: "FromAp",
        name: "From",
        fieldName: "startTime",
        minWidth: 80,
        data: "date",
        queryKey: "startTime/dateTime",
        onRender: (item: any) => {
          let text = "";
          if (item.startTime && item.startTime.dateTime) {
            let date = new Date(item.startTime.dateTime);
            text = date.toLocaleString();
          }
          return <span className="text-ellipsis-3">{text}</span>;
        },
      },
      {
        key: "ToAp",
        name: "To",
        fieldName: "endTime",
        minWidth: 80,
        data: "date",
        queryKey: "endTime/dateTime",
        onRender: (item: any) => {
          let text = "";
          if (item.endTime && item.endTime.dateTime) {
            let date = new Date(item.endTime.dateTime);
            text = date.toLocaleString();
          }
          return <span className="text-ellipsis-3">{text}</span>;
        },
      },
      {
        key: "ShowAsAp",
        name: "Status",
        fieldName: "showAs",
        minWidth: 80,
        priority: 2,
        data: "string",
        onRender: (item: any) => {
          return (
            <span className="text-ellipsis-3">
              {this._mapShowAsEnumToText(item.showAs)}
            </span>
          );
        },
      },
    ];
    return (
      <AppointmentListWrapper
        className="AppointmentListWrapper"
        theme={this.props.theme}
      >
        <div
          className="renderListWrapper"
          style={{
            height: `95%`,
            width: "100%",
            position: "relative",
            margin: "20px 0",
          }}
        >
          {!this.props.isLoadingOrgInfomation ? (
            <ListCustom
              rcName={`appointments`}
              columns={appointmentCols}
              isOffline={false}
              isLoading={this.props.isOrganizationDetailLoading || false}
              darkMode={this.props.theme}
              onGetSelectionItem={this._onHandleSelection}
              iconName="DateTimeMirrored"
              selectedItems={this.props.selectedAppointments}
              queryClass={this._query}
              ref={this.Action}
            />
          ) : (
            <LoadingSpinner rcName="appointments" darkMode={this.props.theme} />
          )}
        </div>
        <Customizer scopedSettings={{ Layer: { hostId: "main-panel" } }}>
          <Panel
            isOpen={
              this.props.isPanelPageOpen &&
              this.props.panelType === TypePanel.Edit
            }
            hasCloseButton
            headerText={
              this.props.confirmType === TypeConfirm.Null
                ? `Edit appointment`
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
            rcName={`appointments`}
          >
            {this.RenderContentEdit()}
          </Panel>
        </Customizer>
      </AppointmentListWrapper>
    );
  }
}

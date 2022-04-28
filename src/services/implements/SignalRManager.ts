import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import { useDispatch } from "react-redux";
import { NotificationItem } from "src/common/classes/BaseNotificationItem";
import { BuildFunction } from "src/common/functions";
import { toastNotify } from "src/common/ui/Toast";
import { SignalRLoadingStep } from "src/entity/enums";
import { ApplicationReduxActionTS } from "src/ui/actions/implements/ApplicationAct";
import { NotificationReduxActionTS } from "src/ui/actions/implements/NotificationAct";
import { OrganizationReduxAction } from "src/ui/actions/implements/OrganizaiontAct";
import { TenantReduxActionTS } from "src/ui/actions/implements/TenantAct";

export class SignalRManager {
  private static _instance: SignalRManager;
  private _isConnected: boolean;
  private _isSignalRLoading: boolean;
  private _signalRStatus: SignalRLoadingStep;
  private _signalRCode: number;
  private _signalRData: any;
  private _signalRConversationId: string;

  private _isSignalRViewBuilderLoading: boolean;
  private _signalRViewBuilderStatus: SignalRLoadingStep;
  private _signalRViewBuilderCode: number;
  private _signalRViewBuilderData: any;
  private _signalRViewBuilderConversationId: string;
  private _signalRViewBuilderWorkflowId: string;

  private _isSignalRCalendarLoading: boolean;
  private _signalRCalendarStatus: SignalRLoadingStep;
  private _signalRCalendarCode: number;
  private _signalRCalendarData: any;
  private _signalRCalendarConversationId: string;

  private _signalRSyncStatus: SignalRLoadingStep;
  private _isSignalRSyncLoading: boolean;
  private _signalRSyncConversationId: string;
  private _signalRSyncCode: number;
  private _signalRSyncData: any;
  private _dispatch: any;

  private _signalRTenantStatus: SignalRLoadingStep;
  private _isSignalRTenantLoading: boolean;
  private _signalRTenantConversationId: string;
  private _signalRTenantCode: number;
  private _signalRTenantData: any;

  private _signalRSensorStatus: SignalRLoadingStep;
  private _isSignalRSensorLoading: boolean;
  private _signalRSensorConversationId: string;
  private _signalRSensorCode: number;
  private _signalRSensorData: any;

  constructor() {
    this._isConnected = false;

    this._signalRStatus = SignalRLoadingStep.Waitting;
    this._isSignalRLoading = false;
    this._signalRConversationId = "";
    this._signalRCode = 0;
    this._signalRData = null;

    this._signalRViewBuilderStatus = SignalRLoadingStep.Waitting;
    this._isSignalRViewBuilderLoading = false;
    this._signalRViewBuilderConversationId = "";
    this._signalRViewBuilderWorkflowId = "";
    this._signalRViewBuilderCode = 0;
    this._signalRViewBuilderData = null;

    this._signalRCalendarStatus = SignalRLoadingStep.Waitting;
    this._isSignalRCalendarLoading = false;
    this._signalRCalendarConversationId = "";
    this._signalRCalendarCode = 0;
    this._signalRCalendarData = null;

    this._signalRSyncStatus = SignalRLoadingStep.Waitting;
    this._isSignalRSyncLoading = false;
    this._signalRSyncConversationId = "";
    this._signalRSyncCode = 0;
    this._signalRSyncData = null;
    this._dispatch = useDispatch();

    this._signalRTenantStatus = SignalRLoadingStep.Waitting;
    this._isSignalRTenantLoading = false;
    this._signalRTenantConversationId = "";
    this._signalRTenantCode = 0;
    this._signalRTenantData = null;

    this._signalRSensorStatus = SignalRLoadingStep.Waitting;
    this._isSignalRSensorLoading = false;
    this._signalRSensorConversationId = "";
    this._signalRSensorCode = 0;
    this._signalRSensorData = null;
  }

  public static get Instance(): SignalRManager {
    if (!this._instance) {
      this._instance = new SignalRManager();
    }
    return this._instance;
  }

  public get isConnected(): boolean {
    return this._isConnected;
  }
  public set isConnected(v: boolean) {
    this._isConnected = v;
  }

  // tenant
  public get signalRViewBuilderWorkflowId(): string {
    return this._signalRViewBuilderWorkflowId;
  }
  public set signalRViewBuilderWorkflowId(v: string) {
    this._signalRViewBuilderWorkflowId = v;
  }
  public get signalRViewBuilderConversationId(): string {
    return this._signalRViewBuilderConversationId;
  }
  public set signalRViewBuilderConversationId(v: string) {
    this._signalRViewBuilderConversationId = v;
  }
  public get signalRViewBuilderStatus(): SignalRLoadingStep {
    return this._signalRViewBuilderStatus;
  }
  public set signalRViewBuilderStatus(v: SignalRLoadingStep) {
    this._signalRViewBuilderStatus = v;
  }
  public get isSignalRViewBuilderLoading(): boolean {
    return this._isSignalRViewBuilderLoading;
  }
  public set isSignalRViewBuilderLoading(v: boolean) {
    this._isSignalRViewBuilderLoading = v;
  }
  public get signalRViewBuilderCode(): number {
    return this._signalRViewBuilderCode;
  }
  public set signalRViewBuilderCode(v: number) {
    this._signalRViewBuilderCode = v;
  }
  public get signalRViewBuilderData(): any {
    return this._signalRViewBuilderData;
  }
  public set signalRViewBuilderData(v: any) {
    this._signalRViewBuilderData = v;
  }

  // calendar
  public get signalRCalendarConversationId(): string {
    return this._signalRCalendarConversationId;
  }
  public set signalRCalendarConversationId(v: string) {
    this._signalRCalendarConversationId = v;
  }
  public get signalRCalendarStatus(): SignalRLoadingStep {
    return this._signalRCalendarStatus;
  }
  public set signalRCalendarStatus(v: SignalRLoadingStep) {
    this._signalRCalendarStatus = v;
  }
  public get isSignalRCalendarLoading(): boolean {
    return this._isSignalRCalendarLoading;
  }
  public set isSignalRCalendarLoading(v: boolean) {
    this._isSignalRCalendarLoading = v;
  }
  public get signalRCalendarCode(): number {
    return this._signalRCalendarCode;
  }
  public set signalRCalendarCode(v: number) {
    this._signalRCalendarCode = v;
  }
  public get signalRCalendarData(): any {
    return this._signalRCalendarData;
  }
  public set signalRCalendarData(v: any) {
    this._signalRCalendarData = v;
  }

  // tenant
  public get signalRTenantConversationId(): string {
    return this._signalRTenantConversationId;
  }
  public set signalRTenantConversationId(v: string) {
    this._signalRTenantConversationId = v;
  }
  public get signalRTenantStatus(): SignalRLoadingStep {
    return this._signalRTenantStatus;
  }
  public set signalRTenantStatus(v: SignalRLoadingStep) {
    this._signalRTenantStatus = v;
  }
  public get isSignalRTenantLoading(): boolean {
    return this._isSignalRTenantLoading;
  }
  public set isSignalRTenantLoading(v: boolean) {
    this._isSignalRTenantLoading = v;
  }
  public get signalRTenantCode(): number {
    return this._signalRTenantCode;
  }
  public set signalRTenantCode(v: number) {
    this._signalRTenantCode = v;
  }
  public get signalRTenantData(): any {
    return this._signalRTenantData;
  }
  public set signalRTenantData(v: any) {
    this._signalRTenantData = v;
  }

  // sensor
  public get signalRSensorConversationId(): string {
    return this._signalRSensorConversationId;
  }
  public set signalRSensorConversationId(v: string) {
    this._signalRSensorConversationId = v;
  }
  public get signalRSensorStatus(): SignalRLoadingStep {
    return this._signalRSensorStatus;
  }
  public set signalRSensorStatus(v: SignalRLoadingStep) {
    this._signalRSensorStatus = v;
  }
  public get isSignalRSensorLoading(): boolean {
    return this._isSignalRSensorLoading;
  }
  public set isSignalRSensorLoading(v: boolean) {
    this._isSignalRSensorLoading = v;
  }
  public get signalRSensorCode(): number {
    return this._signalRSensorCode;
  }
  public set signalRSensorCode(v: number) {
    this._signalRSensorCode = v;
  }
  public get signalRSensorData(): any {
    return this._signalRSensorData;
  }
  public set signalRSensorData(v: any) {
    this._signalRSensorData = v;
  }

  // sync
  public get signalRSyncConversationId(): string {
    return this._signalRSyncConversationId;
  }
  public set signalRSyncConversationId(v: string) {
    this._signalRSyncConversationId = v;
  }
  public get signalRSyncStatus(): SignalRLoadingStep {
    return this._signalRSyncStatus;
  }
  public set signalRSyncStatus(v: SignalRLoadingStep) {
    this._signalRSyncStatus = v;
  }
  public get isSignalRSyncLoading(): boolean {
    return this._isSignalRSyncLoading;
  }
  public set isSignalRSyncLoading(v: boolean) {
    this._isSignalRSyncLoading = v;
  }
  public get signalRSyncCode(): number {
    return this._signalRSyncCode;
  }
  public set signalRSyncCode(v: number) {
    this._signalRSyncCode = v;
  }
  public get signalRSyncData(): any {
    return this._signalRSyncData;
  }
  public set signalRSyncData(v: any) {
    this._signalRSyncData = v;
  }

  public get signalRConversationId(): string {
    return this._signalRConversationId;
  }
  public set signalRConversationId(v: string) {
    this._signalRConversationId = v;
  }
  public get signalRStatus(): SignalRLoadingStep {
    return this._signalRStatus;
  }
  public set signalRStatus(v: SignalRLoadingStep) {
    this._signalRStatus = v;
  }
  public get isSignalRLoading(): boolean {
    return this._isSignalRLoading;
  }
  public set isSignalRLoading(v: boolean) {
    this._isSignalRLoading = v;
  }
  public get signalRCode(): number {
    return this._signalRCode;
  }
  public set signalRCode(v: number) {
    this._signalRCode = v;
  }
  public get signalRData(): any {
    return this._signalRData;
  }
  public set signalRData(v: any) {
    this._signalRData = v;
  }

  private mapSignalRStatus = (str: string): SignalRLoadingStep => {
    switch (str) {
      case "Success":
        return SignalRLoadingStep.Success;
      case "Processing":
        return SignalRLoadingStep.Process;
      case "Failure":
        return SignalRLoadingStep.Failure;
      default:
        return SignalRLoadingStep.Waitting;
    }
  };

  onNotifySignal = (
    item: NotificationItem,
    conversationId: string,
    workflowId: string,
    status: string,
    code: number
  ) => {
    this._dispatch(
      NotificationReduxActionTS.onAddNotificationItemTS(
        item,
        conversationId,
        workflowId,
        status,
        code
      )
    );
    if (status === SignalRLoadingStep.Failure) {
      this._dispatch(NotificationReduxActionTS.UpdateLoadingNotify());
      toastNotify.error({
        message: `${status} ${code}`,
        title: `${status}`,
        conversationId: conversationId,
        workflowId: workflowId || "",
        id: conversationId
      });
      setTimeout(() => {
        this._dispatch(NotificationReduxActionTS.onUpdateSignalRGetData(conversationId))
      }, 5200)
    }
  };

  onHandleUpdateStatusByType = (
    type: string,
    code: number,
    conversationId: string,
    status: string,
    data?: any,
    workflowId?: string
  ) => {
    let sts = this.mapSignalRStatus(status);
    let item = BuildFunction.buildNotificationItem(sts, code, data);
    switch (type) {
      case "org":
        this._signalRCode = code;
        this._signalRStatus = sts;
        this._signalRData = data;
        this._signalRConversationId = conversationId;
        if (
          this._isSignalRLoading &&
          [SignalRLoadingStep.Failure, SignalRLoadingStep.Success].includes(sts)
        ) {
          this._isSignalRLoading = false;
          this.onNotifySignal(item, conversationId, workflowId || "", status, code);
        }
        this._dispatch(
          ApplicationReduxActionTS.UpdateSignalRLoadingAct(
            this._isSignalRLoading
          )
        );
        break;

      case "sync":
        this._signalRSyncCode = code;
        this._signalRSyncStatus = sts;
        this._signalRSyncData = data;
        this._signalRSyncConversationId = conversationId;
        if (
          this._isSignalRSyncLoading &&
          [SignalRLoadingStep.Failure, SignalRLoadingStep.Success].includes(sts)
        ) {
          this._isSignalRSyncLoading = false;
          this.onNotifySignal(item, conversationId, workflowId || "", status, code);
        }
        this._dispatch(
          ApplicationReduxActionTS.UpdateSignalRLoadingAct(
            this._isSignalRSyncLoading
          )
        );
        break;

      case "tenant":
        this._signalRTenantCode = code;
        this._signalRTenantStatus = sts;
        this._signalRTenantData = data;
        this._signalRTenantConversationId = conversationId;
        if (
          this._isSignalRTenantLoading &&
          [SignalRLoadingStep.Failure, SignalRLoadingStep.Success].includes(sts)
        ) {
          this._isSignalRTenantLoading = false;
          this.onNotifySignal(item, conversationId, workflowId || "", status, code);
        }
        this._dispatch(
          ApplicationReduxActionTS.UpdateSignalRLoadingAct(
            this._isSignalRTenantLoading
          )
        );
        break;

      case "sensor":
        this._signalRSensorCode = code;
        this._signalRSensorStatus = sts;
        this._signalRSensorData = data;
        this._signalRSensorConversationId = conversationId;
        if (
          this._isSignalRSensorLoading &&
          [SignalRLoadingStep.Failure, SignalRLoadingStep.Success].includes(sts)
        ) {
          this._isSignalRSensorLoading = false;
          this.onNotifySignal(item, conversationId, workflowId || "", status, code);
        }
        this._dispatch(
          ApplicationReduxActionTS.UpdateSignalRLoadingAct(
            this._isSignalRSensorLoading
          )
        );
        break;

      case "viewBuilderMSG":
        let wId = workflowId ? workflowId : "";
        this._signalRViewBuilderCode = code;
        this._signalRViewBuilderStatus = sts;
        this._signalRViewBuilderData = data;
        this._signalRViewBuilderConversationId = conversationId;
        this._signalRViewBuilderWorkflowId = wId;
        this._dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(wId));
        if (
          this._isSignalRViewBuilderLoading &&
          [SignalRLoadingStep.Failure, SignalRLoadingStep.Success].includes(sts)
        ) {
          this._isSignalRViewBuilderLoading = false;
          this.onNotifySignal(item, conversationId, workflowId || "", status, code);
        }
        this._dispatch(
          ApplicationReduxActionTS.UpdateSignalRLoadingAct(
            this._isSignalRViewBuilderLoading
          )
        );
        break;

      case "calendar":
        this._signalRCalendarCode = code;
        this._signalRCalendarStatus = sts;
        this._signalRCalendarData = data;
        this._signalRCalendarConversationId = conversationId;
        if (
          this._isSignalRCalendarLoading &&
          [SignalRLoadingStep.Failure, SignalRLoadingStep.Success].includes(sts)
        ) {
          this._isSignalRCalendarLoading = false;
          this.onNotifySignal(item, conversationId, workflowId || "", status, code);
        }
        this._dispatch(
          ApplicationReduxActionTS.UpdateSignalRLoadingAct(
            this._isSignalRCalendarLoading
          )
        );
        break;

      default:
        break;
    }
    if (SignalRLoadingStep.Failure) {
      this._signalRConversationId = "";
    }
  };
  onHandleSignalRSteps = (
    type: string,
    status: string,
    code: number,
    conversationId: string,
    data?: any,
    workflowId?: string
  ) => {
    let wId = workflowId ? workflowId : "";
    this.onHandleUpdateStatusByType(
      type,
      code,
      conversationId,
      status,
      data,
      workflowId
    );
    if (status !== SignalRLoadingStep.Failure) {
      this._dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(wId));
      if (type !== "viewBuilderMSG") {
        this._dispatch(
          ApplicationReduxActionTS.UpdateSignalRConversations(conversationId)
        );
      }
      this._dispatch(OrganizationReduxAction.StoreUpdateSignalRData(data));
    } else {
      this._dispatch(ApplicationReduxActionTS.UpdateSignalRWorkflowId(""));
      this._dispatch(ApplicationReduxActionTS.UpdateSignalRConversations(""));
    }
  };
  startSignalRConnection = async (connection: any) => {
    try {
      await connection.start();
      console.log("SignalR connection established");
    } catch (err) {
      console.error("SignalR Connection Error: ", err);
      setTimeout(() => this.startSignalRConnection(connection), 50000);
    }
  };
  createSignalR = (connectionHub: string) => {
    const clientId = window.__clientId__;
    const connection = new HubConnectionBuilder()
      .withUrl(`${connectionHub}?clientId=${clientId}`, {
        transport: HttpTransportType.WebSockets,
        skipNegotiation: true,
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (context: any) => {
          return 10000;
        },
      })
      .build();

    return connection;
  };
  setupSignalRConnection = (connectionHub: string): Promise<void> => {
    let connect = this.createSignalR(connectionHub);
    connect.serverTimeoutInMilliseconds = 60000;
    connect.onreconnecting((error: any) => {
      console.log("Connection lost due to error. Reconnecting.", error);
    });
    connect.onreconnected((connectionId: any) => {
      console.log(
        "Connection reestablished. Connected with connectionId",
        connectionId
      );
    });
    connect.on("ReceiverOrganizationMessage", async (data: any) => {
      console.log(data);
      if (!this._isSignalRLoading) {
        this._isSignalRLoading = true;
      }
      await this.onHandleSignalRSteps(
        "org",
        data.status,
        data.responseCode,
        data.conversationId,
        data.data
      );
    });
    connect.on("ReceiverNotificationViewBuilderMessage", async (data: any) => {
      console.log("built");
      console.log(data);
      if (!this._isSignalRViewBuilderLoading) {
        this._isSignalRViewBuilderLoading = true;
      }
      await this.onHandleSignalRSteps(
        "viewBuilderMSG",
        data.status,
        data.responseCode,
        data.conversationId,
        data.data,
        data.workflowId
      );
    });
    connect.on("ReceiverOrganizationSynchronizeMessage", async (data: any) => {
      console.log(data);
      if (!this._isSignalRSyncLoading) {
        this._isSignalRSyncLoading = true;
      }
      await this.onHandleSignalRSteps(
        "sync",
        data.status,
        data.responseCode,
        data.conversationId,
        data.data
      );
    });
    connect.on("ReceiverTenantMessage", async (data: any) => {
      console.log(data);
      if (!this._isSignalRTenantLoading) {
        this._isSignalRTenantLoading = true;
      }
      if (data?.contextKeys) {
        this._dispatch(
          TenantReduxActionTS.onUpdateContextKeys(data.contextKeys)
        );
      }
      await this.onHandleSignalRSteps(
        "tenant",
        data.status,
        data.responseCode,
        data.conversationId,
        data.data
      );
    });
    connect.on("ReceiverSensorMessage", async (data: any) => {
      console.log(data);
      if (!this._isSignalRSensorLoading) {
        this._isSignalRSensorLoading = true;
      }
      await this.onHandleSignalRSteps(
        "sensor",
        data.status,
        data.responseCode,
        data.conversationId,
        data.data
      );
    });
    connect.on("ReceiverCalendarMessage", async (data: any) => {
      console.log(data);
      if (!this._isSignalRCalendarLoading) {
        this._isSignalRCalendarLoading = true;
      }
      await this.onHandleSignalRSteps(
        "calendar",
        data.status,
        data.responseCode,
        data.conversationId,
        data.data
      );
    });
    connect.onclose((error: any) => {
      console.log(
        "Connection closed due to error. Try refreshing this page to restart the connection",
        error
      );
    });
    return this.startSignalRConnection(connect);
  };
}

// CCId : Client conversation id
// CWId : Client workflow id
export const IsCanBeReload = (
  CCId: string,
  reduxCCId?: string,
  CWId?: string,
  reduxCWId?: string,
  thisMessageSignalR?: boolean
) => {
  if (
    reduxCCId &&
    reduxCWId &&
    CCId === reduxCCId &&
    CWId === reduxCWId &&
    !thisMessageSignalR
  ) {
    return true;
  }
  return false;
};

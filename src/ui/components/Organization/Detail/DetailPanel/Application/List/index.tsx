import * as React from "react";
import { ListWrapper } from "./ApplicationListFormStyle";
import {
  IApplicationListProps,
  IApplicationListState,
} from "./ApplicationListFormModels";
import { TypeSynchronize, TypeSyncStatus } from "src/entity/enums";
import { BuildRCAttribute, FetchDataFromServer, TimeFunction } from "src/common/functions";
import { Spinner, SpinnerSize } from "aod-dependencies/Spinner";
import { Icon } from "aod-dependencies/@uifabric/icons";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import ListCustom from "aod-dependencies/DataList";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import buildQuery from "odata-query";
import { OrgSyncUserResourceItem } from "src/repositories/response";
import { IsCanBeReload } from "src/services/implements/SignalRManager";
import { LoadingSpinner } from "src/common/ui/Loading";

const RenderTextWithHook = ({
  item
}: {
  item: any;
}) => {
  const [isVisibleSpinner, setSpinner] = React.useState<boolean>(false);
  React.useEffect(() => {
    let crtStatus = _mapStatusWithTypeEnum(item.status);
    if (crtStatus === TypeSyncStatus.Synchronizing) {
      setSpinner(true);
    }
  }, [item]);

  const _mapStatusWithTypeEnum = (status: string): TypeSyncStatus => {
    switch (status) {
      case "Synchronized":
        return TypeSyncStatus.Synchronized;

      case "SynchronizeFail":
        return TypeSyncStatus.SynchronizeFail;

      case "Synchronizing":
        return TypeSyncStatus.Synchronizing;

      case "Connected":
        return TypeSyncStatus.Connected;

      default:
        return TypeSyncStatus.NotConnect;
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>{item.status}</span>
      {isVisibleSpinner ? (
        <Spinner style={{ paddingLeft: "10px" }} size={SpinnerSize.xSmall} />
      ) : null}
    </div>
  );
};

export default class Application extends React.Component<
  IApplicationListProps,
  IApplicationListState
> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IApplicationListProps) {
    super(props);
    this.state = {
      selectedItemSync: [],
      syncList: [],
      loading: true,
      successLoadingSync: false,
      typeSync: TypeSynchronize.StartSync,
      conversationId: "",
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
      let defaultURL = `${BuildURLWithTenantId(
        ApiFromOData.ODATA_API
      )}organizations('${
        this.props.org ? this.props.org.id : ""
      }')/LoadSynchronizeInfo`;
      let url =
        nextLink && nextLink !== ""
          ? nextLink
          : `${defaultURL}${endpointBuilded}${
              endpoint ? `&${endpoint.split("?")[1]}` : ""
            }`;
      await FetchDataFromServer({ url: url }).then((res) => {
        if (res) {
          this._query.source = res.value;
        }
      });
      this.setState({ loading: false });
      return [];
    };
  }

  componentDidUpdate() {
    let isReload = IsCanBeReload(
      this.state.conversationId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId
    );
    if (isReload) {
      this._onHandleGetDataForm();
      this.props.OnClearCidAndWorkflowId();
    }
  }

  private _onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
    this.setState({ conversationId: "", workflowId: "" });
  };

  private _onHandleSync = async (items?: any[]) => {
    if (
      items &&
      items.length > 0 &&
      this.props.OnSyncSelectedItems &&
      this.props.org
    ) {
      return await this.props
        .OnSyncSelectedItems(this.props.org.id, items)
        .then((res) => {
          this.setState({
            conversationId: res.conversationId,
            workflowId: res.workflowId || "",
          });
        })
        .catch(() => {
        });
    }
    if (
      items &&
      items.length < 1 &&
      this.props.OnSyncAllUsers &&
      this.props.org
    ) {
      return await this.props
        .OnSyncAllUsers(this.props.org.id)
        .then((res) => {
          this.setState({
            conversationId: res.conversationId,
            workflowId: res.workflowId || "",
          });
        })
        .catch(() => {
        });
    }
  };
  private _onHandleStop = async (items?: any[]) => {
    if (
      items &&
      items.length > 0 &&
      this.props.OnStopSyncSelectedItems &&
      this.props.org
    ) {
      return await this.props
        .OnStopSyncSelectedItems(this.props.org.id, items)
        .then((res) => {
          this.setState({
            conversationId: res.conversationId,
            workflowId: res.workflowId || "",
          });
        })
        .catch(() => {
        });
    }
    if (
      items &&
      items.length < 1 &&
      this.props.OnStopSyncAllUsers &&
      this.props.org
    ) {
      return await this.props
        .OnStopSyncAllUsers(this.props.org.id)
        .then((res) => {
          this.setState({
            conversationId: res.conversationId,
            workflowId: res.workflowId || "",
          });
        })
        .catch(() => {
        });
    }
  };

  private _onHandleSelectedWorkingAppItems = (items: any[]) => {
    if (this.props.OnUpdateWorkingAppItems) {
      let newItems: OrgSyncUserResourceItem[] = items.map((i) => {
        let itm = new OrgSyncUserResourceItem();
        itm.email = i.email;
        itm.guid = i.guid;
        itm.lastSynchronized = i.lastSynchronized;
        itm.responseCode = i.responseCode;
        itm.status = i.status;
        itm.synchronizedBy = i.synchronizedBy;
        itm.type = i.type;
        return itm;
      });
      this.props.OnUpdateWorkingAppItems(newItems);
    }
  };

  onSubmitAction = (type: TypeSynchronize) => () => {
    if (type === TypeSynchronize.StartSync) {
      this._onHandleSync(this.props.workingAppItems);
    }
    if (type === TypeSynchronize.StopSync) {
      this._onHandleStop(this.props.workingAppItems);
    }
  };

  render() {
    let idSyncAll = BuildRCAttribute(
      `btn.${
        this.props.workingAppItems && this.props.workingAppItems.length > 0
          ? "syncSelected"
          : "syncAll"
      }`
    );
    let idStopSync = BuildRCAttribute(
      `btn.${
        this.props.workingAppItems && this.props.workingAppItems.length > 0
          ? "stopSyncSelected"
          : "stopSyncAll"
      }`
    );
    // let { isProgressLoading } = this.state;
    const syncColumn = [
      {
        key: "EmailSync",
        name: "Email",
        fieldName: "email",
        minWidth: 60,
        priority: 2,
        maxWidth: 160,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.email}</span>;
        },
      },
      {
        key: "TypeSync",
        name: "Type",
        fieldName: "type",
        minWidth: 60,
        maxWidth: 60,
        priority: 3,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.type}</span>;
        },
      },
      {
        key: "LastSync",
        name: "Last Synchronized",
        fieldName: "lastSynchronized",
        minWidth: 60,
        maxWidth: 130,
        priority: 1,
        data: "date",
        onRender: (item: any) => {
          let date = TimeFunction.onConvertBetweenDateAndTicks(
            item.lastSynchronized
          );
          return <span>{date}</span>;
        },
      },
      {
        key: "SyncStatus",
        name: "Sync status",
        fieldName: "status",
        minWidth: 60,
        maxWidth: 100,
        priority: 3,
        data: "string",
        onRender: (item: any) => {
          return <RenderTextWithHook item={item} />;
        },
      },
      {
        key: "SyncBy",
        name: "Synchronized By",
        fieldName: "synchronizedBy",
        minWidth: 60,
        maxWidth: 80,
        priority: 4,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.synchronizedBy}</span>;
        },
      },
    ];

    return (
      <ListWrapper className="ListWrapper" theme={this.props.theme}>
        <div className="synch__actionBtn">
          <div
            onClick={this.onSubmitAction(TypeSynchronize.StartSync)}
            {...idSyncAll}
            className={
              this.props.isLoadingNotify ? "actions__btn disabled__btn" : "actions__btn"
            }
          >
            <Icon iconName="FabricSyncFolder" />
            <span>
              {this.props.workingAppItems &&
              this.props.workingAppItems.length > 0
                ? `Sync Selected Items (${this.props.workingAppItems.length})`
                : "Sync All"}
            </span>
          </div>
          <div
            onClick={this.onSubmitAction(TypeSynchronize.StopSync)}
            {...idStopSync}
            className={
              this.props.isLoadingNotify ? "actions__btn disabled__btn" : "actions__btn"
            }
          >
            <Icon iconName="FabricUnsyncFolder" />
            <span>
              {this.props.workingAppItems &&
              this.props.workingAppItems.length > 0
                ? `Stop Sync Selected Items (${this.props.workingAppItems.length})`
                : "Stop Sync All"}
            </span>
          </div>
        </div>
        {/* <div
          className="progress__header"
          style={{ paddingBottom: !isProgressLoading ? "2px" : "0" }}
        >
          {isProgressLoading && (
            <ProgressIndicator darkMode={this.props.theme} />
          )}
        </div> */}
        <div
          style={{
            height: `95%`,
            width: "100%",
            position: "relative",
            margin: "20px 0",
          }}
        >
          <ListCustom
            customLoading={
              <LoadingSpinner
                rcName="loading"
                darkMode={this.props.theme}
              ></LoadingSpinner>
            }
            isLoading={this.state.loading}
            rcName="synchronized"
            columns={syncColumn}
            isOffline={false}
            darkMode={this.props.theme}
            onGetSelectionItem={this._onHandleSelectedWorkingAppItems}
            iconName="SyncToPC"
            selectedItems={this.props.workingAppItems}
            queryClass={this._query}
            filterWithTicks={true}
            ref={this.Action}
          />
        </div>
      </ListWrapper>
    );
  }
}

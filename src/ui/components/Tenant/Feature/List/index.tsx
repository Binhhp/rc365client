import { Customizer } from "aod-dependencies/@uifabric/utilities";
import { SelectionMode } from "aod-dependencies/@uifabric/utilities/selection";
import ListCustom from "aod-dependencies/DataList";
import { IColumnDl } from "aod-dependencies/DataList/Main/MainModel";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { IGroup } from "aod-dependencies/GroupedList";
import { Panel, PanelType } from "aod-dependencies/Panel";
import * as React from "react";
import { SyntheticEvent } from "react";
import { BaseContext } from "src/common/classes/BaseContext";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { BuildRCAttribute, FetchDataFromServer } from "src/common/functions";
import { IconGeneralProps, PanelStyle } from "src/common/style";
import { TypeConfirm } from "src/entity/enums";
import { IsCanBeReload } from "src/services/implements/SignalRManager";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import FeaturePanelConfig from "src/ui/containers/Tenant/Feature/FeaturePanelConfigContainer";
import { IFeatureProps, IFeaturetState } from "./ListModel";
import { FeatureWrapper } from "./ListStyle";

class Features extends React.Component<IFeatureProps, IFeaturetState> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IFeatureProps) {
    super(props);
    this.state = {
      width: 0,
      isRedirect: false,
      workingItem: null,
      redirectUrl: "",
      typeOfConfirm: "",
      panelType: "",
      isVisibled: false,
      isConfirm: false,
      isSelection: false,
      workingContext: new BaseContext(),
      contexts: new BaseContext(),
      selectedItems: [],
      groupContext: [],
    };
    this.Action = React.createRef();
    this._query = new DataListSource();
    this._query.GetData = async (
      pageIndex: number,
      skipNumber: number,
      nextLink: string | null,
      endpoint?: string
    ): Promise<any[]> => {
      let url = "";
      // let top = skipNumber;
      // let skip = skipNumber * (pageIndex - 1);
      // let endpointBuilded = buildQuery({ top, skip });
      // if (this.props.type === "detail") {
      //   url =
      //     nextLink && nextLink !== ""
      //       ? nextLink
      //       : `${`${BuildURLWithTenantId(ApiFromOData.ODATA_API)}Tenants('${
      //           this.props.workingTenant &&
      //           this.props.workingTenant.id.trim() !== ""
      //             ? this.props.workingTenant.id
      //             : "root"
      //         }')/ContextFeatures`}${endpointBuilded}${
      //           endpoint ? `&${endpoint.split("?")[1]}` : ""
      //         }`;
      // } else {
      //   let storage = localStorage.getItem("tenantId");
      //   url =
      //     nextLink && nextLink !== ""
      //       ? nextLink
      //       : `${`${BuildURLWithTenantId(ApiFromOData.ODATA_API)}Tenants('${
      //           storage ? JSON.parse(storage).id : "root"
      //         }')/FeatureDescriptors('${
      //           this.props.licenceType
      //         }')`}${endpointBuilded}${
      //           endpoint ? `&${endpoint.split("?")[1]}` : ""
      //         }`;
      // }
      if (this.props.type === "detail") {
        url =
          nextLink && nextLink !== ""
            ? nextLink
            : `${`${BuildURLWithTenantId(ApiFromOData.ODATA_API)}Tenants('${
                this.props.workingTenant &&
                this.props.workingTenant.id.trim() !== ""
                  ? this.props.workingTenant.id
                  : "root"
              }')/ContextFeatures`}${endpoint}`;
      } else {
        let storage = localStorage.getItem("tenantId");
        url =
          nextLink && nextLink !== ""
            ? nextLink
            : `${`${BuildURLWithTenantId(ApiFromOData.ODATA_API)}Tenants('${
                storage ? JSON.parse(storage).id : "root"
              }')/FeatureDescriptors('${this.props.licenceType}')`}${endpoint}`;
      }
      await FetchDataFromServer({
        url: url
      }).then((res) => {
        if (res) {
          this._onHandleUpdateFeatureTS(res.value);
          this._query.source = res.value;
        }
      });
      return [];
    };
  }

  componentDidMount() {
    this._onHandleUpdateLoggingConfig();
  }
  UNSAFE_componentWillReceiveProps(prevProps: IFeatureProps) {
    let isReloadStorage = IsCanBeReload(
      this.props.tenantCId || "",
      this.props.signalRConversationId,
      this.props.tenantWId,
      prevProps.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    if (isReloadStorage) {
      this._onHandleGetDataForm();
      this.props.OnClearCidAndWorkflowId();
    }
  }

  private _onHandleResetSignalRInfomations = () => {
    if (this.props.OnResetSignalRInfomations) {
      this.props.OnResetSignalRInfomations();
    }
  };

  private _onHandleUpdateLoggingConfig = () => {
    if (this.props.OnResetStoreConfiguration) {
      this.props.OnResetStoreConfiguration();
    }
  };

  private _onHandleFetchDataContextAndFeature = () => {
    if (this.props.workingTenant && this.props.OnFetchStoreData) {
      this.props.OnFetchStoreData(this.props.workingTenant.id);
    }
  };

  private _onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    this._onHandleResetSignalRInfomations();
    this._onHandleFetchDataContextAndFeature();
    await this.Action.current.onHandleQueryDataByClassType();
  };

  private _onHandleUpdateFeatureTS = (features: any[]) => {
    if (this.props.OnUpdateFeatureTS && this.props.features) {
      this.props.OnUpdateFeatureTS(features, this.props.features);
    }
  };

  private _onHandleSelectedItem = (item: BaseFeatureContextTenant) => {
    if (this.props.onGetSelectedItem) {
      this.props.onGetSelectedItem(item);
    }
  };
  private _onHandleUpdateConfigurationType = (type: string) => {
    if (this.props.OnUpdateConfigurationType) {
      this.props.OnUpdateConfigurationType(type);
    }
  };

  private _onHandleUpdateSelectedContexts = (items: any[]) => {
    if (this.props.OnUpdateSelectedContexts) {
      this.props.OnUpdateSelectedContexts(items);
    }
  };
  private _onHandleUpdateSelectedFeatures = (items: any[]) => {
    if (this.props.OnUpdateSelectedFeatures) {
      this.props.OnUpdateSelectedFeatures(items);
    }
  };

  private _onHandleResetState = () => {
    this.setState({ isConfirm: false, typeOfConfirm: "" });
  };

  private _onHandleGetFeatures = () => {
    if (this.props.OnGetFeaturesListInContext && this.props.workingTenant) {
      this.props.OnGetFeaturesListInContext(this.props.workingTenant.id);
    }
  };
  private _onHandleResetSignalRData = () => {
    if (this.props.OnRestSignalRData) {
      this.props.OnRestSignalRData();
    }
  };
  private _onHandleUpdateWorkingContext = (id: string) => {
    if (this.props.OnUpdateWorkingContext && this.props.contexts) {
      this.props.OnUpdateWorkingContext(id, this.props.contexts);
    }
  };
  private _onHandleUpdateSelectedContextFromSelectedItem = (keys: string[]) => {
    if (this.props.contexts) {
      let crtContexts = [...this.props.contexts];
      let rs = crtContexts.filter((c) => keys.includes(c.contextKey));
      this._onHandleUpdateSelectedContexts(rs);
    }
  };

  onHandleSelectFeature = async (
    item: BaseFeatureContextTenant,
    type: string
  ) => {
    if (this.props.isHaveNameAction) {
      // await this._onHandleGetFeatures();
      await this._onHandleUpdateConfigurationType(type);
      this._onHandleSelectedItem(item);
      this.setState({
        workingItem: item,
      });
    }
  };

  onHandleSelectContext = async (
    item: BaseFeatureContextTenant,
    type: string
  ) => {
    if (item.configuration !== null && item.isEnabled) {
      this._onHandleUpdateConfigurationType(type);
      this._onHandleUpdateWorkingContext(item.contextKey);
      this._onHandleSelectedItem(item);
      this.setState({
        workingItem: item,
      });
    }
    if (item.configuration === null && !item.isEnabled && this.props.contexts) {
      let context = [...this.props.contexts].filter(
        (c) => c.contextKey === item.contextKey
      );
      if (context) {
        this._onHandleUpdateSelectedContexts(context);
      }
      this._onHandleUpdateConfigurationType(type);
      this._onHandleUpdateWorkingContext(item.contextKey);
      this.setState({ isVisibled: true, panelType: "multiple" });
    }
  };

  onHandleUpdateVisiblePanel = (
    ev?: SyntheticEvent<HTMLElement, Event>,
    val?: boolean
  ) => {
    this.setState({ isVisibled: !this.state.isVisibled });
    // if (
    //   typeof val === "boolean" &&
    //   val !== this.state.isVisibled &&
    //   !this.props.isWorking
    // ) {
    //   this.setState({ isVisibled: val });
    // } else if (!this.props.isWorking) {
    //   this.setState({ isVisibled: !this.state.isVisibled });
    // } else if (this.props.isWorking && val) {
    //   this.setState({ isConfirm: true, typeOfConfirm: "cancel" });
    // }
  };

  onHandleSubmitCfm = () => {
    // this.onHandleUpdateVisiblePanel();
    if (["update", "cancel"].includes(this.state.typeOfConfirm)) {
      this._onHandleResetState();
      this.setState({ isConfirm: false, isVisibled: false, typeOfConfirm: "" });
      this._onHandleResetSignalRData();
    }
  };

  onHandleCancleCfm = () => {
    // this.onHandleUpdateVisiblePanel();
    if (["cancel"].includes(this.state.typeOfConfirm)) {
      this.setState({ isConfirm: false, typeOfConfirm: "" });
    }
  };

  onHandleChangeText = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    let crtWorkingContext = this.state.workingContext.Clone() as BaseContext;
    if (newValue) {
      crtWorkingContext.stogareConfiguration = newValue;
    }
    if (!newValue) {
      crtWorkingContext.stogareConfiguration = "";
    }
    this.setState({ workingContext: crtWorkingContext });
  };

  onHandleCanelPanel = () => {
    if (this.props.isWorking) {
      this.setState({ isConfirm: true, typeOfConfirm: "cancel" });
    } else {
      this.onHandleUpdateVisiblePanel();
    }
  };

  onHandleOpenPanelMassUpdate = () => {
    if (this.state.selectedItems.length > 0) {
      this.setState({ isVisibled: true, panelType: "multiple" });
    }
  };

  onHandleSelectedItems = (selectedItems: any[]) => {
    if (selectedItems.length > 0) {
      let features = selectedItems.map((i) => {
        let feature = new BaseFeatureContextTenant();
        feature.configuration = i.configuration;
        feature.contextKey = i.contextKey;
        feature.description = i.description;
        feature.featureKey = i.featureKey;
        feature.featureName = i.featureName;
        feature.isAlreadyHaveConfig = i.isAlreadyHaveConfig;
        feature.isEnabled = i.isEnabled;
        feature.version = i.version;
        return feature;
      });
      let contextKeys = selectedItems
        .map((i) => i.contextKey)
        .filter((item, index, ar) => ar.indexOf(item) === index);
      this._onHandleUpdateSelectedContextFromSelectedItem(contextKeys);
      this._onHandleUpdateSelectedFeatures(features);
      this.setState({ selectedItems: selectedItems });
    } else {
      this._onHandleUpdateSelectedContextFromSelectedItem([]);
      this._onHandleUpdateSelectedFeatures([]);
      this.setState({ selectedItems: [] });
    }
  };

  RenderPanelContent = () => {
    if (this.state.isConfirm) {
      return (
        <Confirm
          onHandleSubmit={this.onHandleSubmitCfm}
          onHandleCancel={this.onHandleCancleCfm}
          rcName={`edt.context`}
          content={
            this.state.typeOfConfirm === "cancel"
              ? "Changes that you made may not be saved. Makes you sure you want to close?"
              : undefined
          }
        />
      );
    }
    if (!this.state.isConfirm && this.state.isVisibled) {
      return (
        <FeaturePanelConfig
          onHandleClosePanel={this.onHandleUpdateVisiblePanel}
          panelType={this.state.panelType}
        />
      );
    }
  };

  onHandleGroupTitleClicked = (gr: IGroup) => {
    // this._onHandleUpdateWorkingContext(gr.key);
    if (!this.state.isVisibled) {
      this.setState({ isVisibled: true, panelType: "single" });
    }
  };

  onHandleSelectedGroups = (groups: IGroup[]) => {
    // this._onHandleUpdateSelectedContexts(groups);
  };

  onHandleClosePanelMassUpdate = () => {
    if (this.props.isWorking) {
      this.setState({ isConfirm: true, typeOfConfirm: "cancel" });
    }
    if (!this.props.isWorking) {
      this.setState({ isVisibled: false });
      this._onHandleResetSignalRData();
    }
  };

  RenderHeaderTextOfPanel = (): string => {
    if (
      this.props.selectedContexts &&
      !this.props.selectedContexts.some((c) => c.isInitialized)
    ) {
      return "Init Context";
    } else if (this.props.confirmType === TypeConfirm.Null) {
      return "Edit context";
    } else {
      return "Confirmation";
    }
  };

  render() {
    const StatusOpts = [
      { key: true, text: "Enabled" },
      { key: false, text: "Disabled" },
    ];

    const FeatureDescriptorCol: IColumnDl[] = [
      {
        key: "contextFt",
        name: "Context",
        fieldName: "context",
        minWidth: 80,
        maxWidth: 300,
        priority: 2,
        data: "string",
        onRender: (item: any) => {
          return <span className="text-ellipsis-3">{item.context}</span>;
        },
      },
      {
        key: "nameFt",
        name: "Name",
        fieldName: "name",
        minWidth: 80,
        maxWidth: 300,
        priority: 1,
        data: "string",
        onRender: (item: any) => {
          return <span className="text-ellipsis-3">{item.name}</span>;
        },
      },
      {
        key: "descriptionFt",
        name: "Description",
        fieldName: "description",
        minWidth: 80,
        data: "string",
        onRender: (item: any) => {
          return <span className="text-ellipsis-3">{item.description}</span>;
        },
      },
    ];

    const FeatureContextCols: IColumnDl[] = [
      {
        key: "contextFt",
        name: "Context",
        fieldName: "contextKey",
        minWidth: 80,
        maxWidth: 300,
        priority: 1,
        data: "string",
        onRender: (item: any, index?: number) => {
          if (this.props.isHaveNameAction) {
            let actionIdRc = BuildRCAttribute(
              `sp.${item.contextKey}${index ? `.${index}` : ".0"}`
            );
            return (
              <span
                {...actionIdRc}
                className="column__action text-ellipsis-3"
                style={{ cursor: "pointer" }}
                onClick={() => this.onHandleSelectContext(item, "context")}
              >
                {item.contextKey}
              </span>
            );
          }
          return <span className="text-ellipsis-3">{item.contextKey}</span>;
        },
      },
      {
        key: "nameFt",
        name: "Name",
        fieldName: "featureName",
        minWidth: 80,
        maxWidth: 300,
        priority: 2,
        data: "string",
        onRender: (item: any, index?: number) => {
          if (this.props.isHaveNameAction && item.configuration) {
            let actionIdRc = BuildRCAttribute(
              `sp.${item.featureName}${index ? `.${index}` : ".0"}`
            );
            return (
              <span
                {...actionIdRc}
                className="column__action text-ellipsis-3"
                style={{ cursor: "pointer" }}
                onClick={() => this.onHandleSelectFeature(item, "feature")}
              >
                {item.featureName}
              </span>
            );
          }
          return <span className="text-ellipsis-3">{item.featureName}</span>;
        },
      },
      {
        key: "versionFt",
        name: "Version",
        fieldName: "version",
        minWidth: 80,
        maxWidth: 200,
        data: "string",
        onRender: (item: any) => {
          return <span className="text-ellipsis-3">{item.version}</span>;
        },
      },
      {
        key: "isEnabledFt",
        name: "Status",
        fieldName: "isEnabled",
        minWidth: 80,
        data: "boolean",
        booleanFormOpts: StatusOpts,
        onRender: (item: any) => {
          let value = StatusOpts.find((o) => o.key === item.isEnabled)?.text;
          return (
            <span className="text-ellipsis-3">{`${value ? value : ""}`}</span>
          );
        },
      },
    ];

    // if (this.state.isRedirect) {
    //   return <Redirect to={this.state.redirectUrl} />;
    // }
    return (
      <FeatureWrapper className="FeatureWrapper" theme={this.props.theme}>
        {this.props.type !== "create" && (
          <CommandBarButton
            onClick={this.onHandleOpenPanelMassUpdate}
            iconProps={IconGeneralProps.addIcon}
            text="Update common structure"
            rcName={`update.common`}
            darkMode={this.props.theme}
            disabled={this.state.selectedItems.length < 1}
          />
        )}
        <div
          className="renderListWrapper"
          style={{
            height: `95%`,
            width: "100%",
            position: "relative",
            margin: "20px 0",
          }}
        >
          <ListCustom
            className={this.state.isVisibled ? "is-disabledList" : ""}
            rcName={
              this.props.type === "detail"
                ? `feature.management`
                : `feature.descriptor`
            }
            columns={
              this.props.type === "detail"
                ? FeatureContextCols
                : FeatureDescriptorCol
            }
            groupBy={this.props.type === "detail" ? "contextKey" : "context"}
            isOffline={false}
            darkMode={this.props.theme}
            iconName={IconGeneralProps.featureIcon.iconName}
            queryClass={this._query}
            ref={this.Action}
            selectionMode={
              this.props.type !== "create"
                ? SelectionMode.multiple
                : SelectionMode.none
            }
            onGetSelectionItem={this.onHandleSelectedItems}
            selectedItems={this.state.selectedItems}
            onGetSelecteGroupList={this.onHandleSelectedGroups}
            uniqueItemKey="featureKey"
            isDisableLazyLoading
          />
        </div>
        <Customizer scopedSettings={{ Layer: { hostId: "main-panel" } }}>
          <Panel
            isOpen={this.state.isVisibled}
            hasCloseButton
            headerText={this.RenderHeaderTextOfPanel()}
            focusTrapZoneProps={{
              isClickableOutsideFocusTrap: true,
              forceFocusInsideTrap: false,
            }}
            isBlocking={false}
            onDismiss={this.onHandleClosePanelMassUpdate}
            styles={PanelStyle(this.props.theme)}
            type={PanelType.medium}
            rcName={`edit.context`}
          >
            {this.RenderPanelContent()}
          </Panel>
        </Customizer>
      </FeatureWrapper>
    );
  }
}

export default Features;

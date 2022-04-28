import { Customizer } from "aod-dependencies/@uifabric/utilities";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import Dropdown from "aod-dependencies/Dropdown/CustomDropdown";
import { Panel, PanelType } from "aod-dependencies/Panel";
import { PivotItem } from "aod-dependencies/Pivot";
import Pivot from "aod-dependencies/Pivot/CustomPivot";
import * as React from "react";
import { BaseContext } from "src/common/classes/BaseContext";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { FeatureDetailItems } from "src/common/constants";
import { BuildFunction, BuildRCAttribute } from "src/common/functions";
import { IconGeneralProps, PanelStyle } from "src/common/style";
import Confirm from "src/common/ui/ConfirmPanel";
import { LoadingSpinner } from "src/common/ui/Loading";
import { TypeConfirm } from "src/entity/enums";
import FeatureEditor from "src/ui/containers/Tenant/Feature/FeatureEditorContainer";
import StorageTemplate from "src/ui/containers/Tenant/Feature/FeatureStorageTemplateContainer";
import FeatureTemplete from "src/ui/containers/Tenant/Feature/FeatureTempleteContainer";
import { IWorkingStorageConfig } from "../Tabs/StorageTemplate/StorageTemplateModel";
import { IDetailFeatureProps, IDetailFeatureStates } from "./DetailModel";
import {
  ActionButtonWrapper,
  DetailFeatureWrapper,
  EditorWithLoggingWrapper,
  FeatureWithLoggingWrapper,
  PivotWrapper,
} from "./DetailStyle";
import { ValidatorJsonContext } from "src/common/contexts";
import { ValidatorJsonFile } from "src/common/functions/FieldValidate";
import { IsCanBeReload } from "src/services/implements/SignalRManager";

class Detail extends React.Component<
  IDetailFeatureProps,
  IDetailFeatureStates
> {
  private saveEdit: React.RefObject<HTMLInputElement | any>;
  constructor(props: IDetailFeatureProps) {
    super(props);
    this.state = {
      crtTab: "0",
      cId: "",
      wId: "",
      feature: null,
      isVisiblePivotForm: false,
      workingStorageConfig: [],
      opts: [],
      signalRDB: [],
    };
    this.saveEdit = React.createRef();
  }

  onHandleUpdateConfiguration = async () => {
    if (!this.saveEdit.current) {
      return;
    }
    await this.saveEdit.current.onHandleUpdateConfig();
  };

  UNSAFE_componentWillMount() {
    this._BuildOptionDropdownByConfigurationType();
    this._onHandleRedirectToOrg();
    if (this.props.workingFeature) {
      this.setState({
        feature: this.props.workingFeature,
      });
    }
  }

  componentDidMount() {
    if (
      (this.props.isParameter &&
        this.props.workingFeature?.featureKey !== "") ||
      (this.props.configurationType &&
        this.props.configurationType.trim() !== "")
    ) {
      this.setState({ isVisiblePivotForm: true });
    }
  }

  componentDidUpdate(
    prevProps: IDetailFeatureProps,
    prevState: IDetailFeatureStates
  ) {
    if (
      this.props.isParameter &&
      ((this.props.workingFeature &&
        this.props.workingFeature.featureKey !==
          prevProps.workingFeature?.featureKey &&
        this.props.workingFeature.featureKey !== "") ||
        (this.props.workingContext &&
          this.props.workingContext.contextKey !==
            prevProps.workingContext?.contextKey &&
          this.props.workingContext.contextKey !== ""))
    ) {
      this.setState({ isVisiblePivotForm: true });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: IDetailFeatureProps) {
    let isReloadStorage = IsCanBeReload(
      this.state.cId,
      this.props.signalRConversationId,
      this.state.wId,
      nextProps.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    if (isReloadStorage) {
      this._onHandleFetchStoreData();
    }
  }

  componentWillUnmount() {
    this._onHandleResetApplicationStore();
  }

  private _onHandleGetFeatures = () => {
    if (this.props.OnGetFeaturesListInContext && this.props.workingTenant) {
      this.props.OnGetFeaturesListInContext(this.props.workingTenant.id);
    }
  };

  private _onHandleWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onHandleResetApplicationStore = () => {
    if (this.props.OnResetApplicationStore) {
      this.props.OnResetApplicationStore();
    }
  };
  private _onHandleResetTenantStore = () => {
    if (this.props.OnResetResetTenantStore) {
      this.props.OnResetResetTenantStore();
    }
  };
  private _onHandleVisiblePanel = (val: boolean) => {
    if (
      this.props.isPanelPageOpen !== val &&
      this.props.OnUpdateVisiblePagePanel
    ) {
      this.props.OnUpdateVisiblePagePanel(val);
    }
  };
  private _onHandleConfirmType = (type: TypeConfirm) => {
    if (this.props.confirmType !== type && this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onHandleUpdateBreadcrumb = (nodes: INodes[]) => {
    if (this.props.OnHandleUpdateBreadCrumb) {
      this.props.OnHandleUpdateBreadCrumb(nodes);
    }
  };

  private _onHandleRedirectToOrg = () => {
    let rootNode = {
      id: "1",
      text: "Tenant",
      isSelected: true,
      parentId: "#",
      url: "tenant",
    };
    let Node = {
      id: "2",
      text: "Create",
      isSelected: true,
      parentId: "1",
      url: `create`,
    };
    let node = BuildFunction.buildNodeForBreadcrumb(Node);
    let root = BuildFunction.buildNodeForBreadcrumb(rootNode);
    this._onHandleUpdateBreadcrumb([root, node]);
  };

  private _onHandleChangeTabAndGetValue = async (item: string) => {
    await this.onHandleUpdateConfiguration();
    this.setState({ crtTab: item });
  };

  private _onChangePivotItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item && this.state.crtTab !== item.props.itemKey) {
      this.setState({ crtTab: "" }, () => {
        if (item && item.props.itemKey) {
          this._onHandleChangeTabAndGetValue(item.props.itemKey);
        }
      });
    }
  };

  private _HandleUpdateDetailFeatureVisible = (val: boolean) => {
    if (
      this.props.isDetailFeatureVisibled !== val &&
      this.props.OnUpdateDetailFeatureVisibled
    ) {
      this.props.OnUpdateDetailFeatureVisibled(val);
    }
  };

  private _onHandleUpdateConfiguration = (
    feature?: BaseFeatureContextTenant,
    isParameter?: boolean
  ) => {
    if (
      this.props.workingConfig &&
      this.props.OnUpdateFeatureConfigTS &&
      this.props.workingFeature &&
      this.props.workingTenant &&
      !isParameter
    ) {
      let featureItem = feature ? feature : this.props.workingFeature;
      this.props
        .OnUpdateFeatureConfigTS(
          this.props.workingConfig,
          featureItem,
          this.props.workingTenant,
          isParameter
        )
        .then((res) => {
          if (res) {
            this.setState({
              cId: res.conversationId,
              wId: res.workflowId || "",
            });
          }
        });
    }
    if (
      this.props.OnUpdateFeatureConfigWithParamsTS &&
      this.props.workingFeature &&
      this.props.workingTenant &&
      isParameter &&
      this.props.workingParameter
    ) {
      let featureItem = feature ? feature : this.props.workingFeature;
      this.props
        .OnUpdateFeatureConfigWithParamsTS(
          featureItem,
          this.props.workingTenant
        )
        .then((res) => {
          if (res) {
            this.setState({
              cId: res.conversationId,
              wId: res.workflowId || "",
            });
          }
        });
    }
  };

  private _onHandleUpdateContext = () => {
    if (
      this.props.OnUpdateContextConfiguration &&
      this.props.workingConfig &&
      this.props.workingTenant &&
      this.props.workingContext
    ) {
      this.props
        .OnUpdateContextConfiguration(
          this.props.workingTenant,
          this.props.workingConfig,
          this.props.workingContext
        )
        .then((res) => {
          if (res) {
            this.setState({
              cId: res.conversationId,
              wId: res.workflowId || "",
            });
          }
        });
    }
  };

  private _onHandleGetParameterVal = (
    obj: any,
    param: string,
    childObj?: any
  ): any => {
    if (!childObj) {
      for (const key in obj) {
        if (key === "Parameters") {
          obj[key] = JSON.parse(param);
          return obj;
        }
        if (key !== "Parameters" && typeof obj[key] === "object") {
          return this._onHandleGetParameterVal(obj, param, obj[key]);
        }
      }
    }
    if (childObj && typeof childObj === "object" && !Array.isArray(childObj)) {
      for (const key in childObj) {
        if (key === "Parameters") {
          childObj[key] = JSON.parse(param);
          return obj;
        }
        if (key !== "Parameters" && typeof childObj[key] === "object") {
          return this._onHandleGetParameterVal(obj, param, childObj);
        }
      }
    }
    if (childObj && typeof childObj === "object" && Array.isArray(childObj)) {
      childObj.forEach((i: any) => {
        if (typeof i === "object") {
          return this._onHandleGetParameterVal(obj, param, i);
        }
      });
    }
  };

  private _onHandleUpdateFeature = async () => {
    let feature = new BaseFeatureContextTenant(this.props.workingFeature);
    if (
      this.props.isParameter &&
      this.props.workingParameter &&
      !["", "{}"].includes(this.props.workingParameter) &&
      this.props.workingFeature
    ) {
      let jsonObj = JSON.parse(feature.configuration);
      let param = await this._onHandleGetParameterVal(
        jsonObj,
        this.props.workingParameter
      );
      if (param) {
        feature.configuration = JSON.stringify(param);
      }
    }
    this._onHandleUpdateConfiguration(feature, this.props.isParameter);
  };

  private _onHandleUpdateCurrentTab = () => {
    if (this.state.crtTab === "0") {
      this.setState({ crtTab: "1" });
    }
  };

  private _onHandleInitContextConfiguration = () => {
    if (
      this.props.OnInitContextConfiguration &&
      this.props.loggingConfig &&
      this.props.workingContext &&
      this.props.workingTenant &&
      this.props.workingConfig
    ) {
      this.props
        .OnInitContextConfiguration(
          this.props.workingTenant.id,
          this.props.loggingConfig,
          this.props.workingContext.contextKey,
          this.props.workingConfig
        )
        .then((res) => {
          if (res) {
            this.setState({ cId: res.conversationId });
          }
        });
    }
  };

  private _onHandleFetchStoreData = async () => {
    if (this.props.workingTenant && this.props.OnFetchStoreData) {
      this._onHandleResetSignalRInfomation();
      this.props.OnFetchStoreData(this.props.workingTenant.id);
      if (this.state.cId.trim() !== "" || this.state.wId.trim() !== "") {
        this.setState({ cId: "", wId: "" });
      }
    }
  };

  private _onHandleResetSignalRInfomation = () => {
    if (this.props.OnResetSignalRInfomations) {
      this.props.OnResetSignalRInfomations();
    }
  };

  private _onHandleUpdateWorkingFeatureParameter = (
    feature: BaseFeatureContextTenant
  ) => {
    if (this.props.OnUpdateWorkingFeatureParameter) {
      this.props.OnUpdateWorkingFeatureParameter(feature);
    }
  };

  private _onHandleUpdateWorkingItem = async (
    feature?: BaseFeatureContextTenant,
    context?: BaseContext
  ) => {
    if (
      this.props.OnUpdateWorkingFeature &&
      feature &&
      this.props.OnUpdateSourceConfig &&
      (this.props.configurationType === "feature" || this.props.isParameter)
    ) {
      this._onHandleUpdateWorkingFeatureParameter(feature);
      this.props.OnUpdateWorkingFeature(feature);
      if (this.props.configurationType === "feature") {
        this.props.OnUpdateSourceConfig(feature.configuration);
      }
    }
    if (
      this.props.OnUpdateWorkingContext &&
      context &&
      this.props.OnUpdateSourceConfig &&
      this.props.configurationType === "context"
    ) {
      this.props.OnUpdateWorkingContext(context);
      this.props.OnUpdateSourceConfig(context.stogareConfiguration);
    }
  };

  private _BuildOptionDropdownByConfigurationType = (): IDropdownOption[] => {
    let opts: IDropdownOption[] = [];
    if (
      this.props.features &&
      (this.props.configurationType === "feature" || this.props.isParameter)
    ) {
      let featureAlreadyInit = [...this.props.features].filter(
        (f) => f.configuration
      );
      opts = featureAlreadyInit.map((f) => {
        return { key: f.featureKey, text: f.featureName } as IDropdownOption;
      });
    }
    if (
      this.props.contexts &&
      this.props.configurationType === "context" &&
      !this.props.isParameter
    ) {
      opts = [...this.props.contexts].map((f) => {
        return { key: f.contextKey, text: f.contextKey } as IDropdownOption;
      });
    }
    return opts;
  };

  RenderDropdown = () => {
    let opts = this._BuildOptionDropdownByConfigurationType();
    let key = undefined;
    let rcName = "";
    if (this.props.isParameter && this.props.workingFeature) {
      key = this.props.workingFeature.featureKey;
      rcName = "parameter";
    } else if (
      this.props.workingFeature &&
      (this.props.configurationType === "feature" || this.props.isParameter)
    ) {
      key = this.props.workingFeature.featureKey;
      rcName = "feature";
    } else if (
      this.props.workingContext &&
      this.props.configurationType === "context"
    ) {
      rcName = "context";
      key = this.props.workingContext.contextKey;
    }
    return (
      <Dropdown
        options={opts}
        rcName={`${rcName}.management`}
        placeholder="Select options"
        selectedKey={key}
        darkMode={this.props.theme}
        onChange={this.onHandleSelectDropdown}
        disabled={this.props.isWorking}
        usingRcNameWithText
        dropdownWidth="fit-content"
      />
    );
  };

  onHandleSelectDropdown = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (
      option &&
      this.props.features &&
      !this.props.isWorking &&
      (this.props.configurationType === "feature" || this.props.isParameter)
    ) {
      let feature = [...this.props.features].find(
        (f) => f.featureKey === option.key
      );
      if (feature) {
        this._onHandleUpdateWorkingItem(feature, undefined);
        this._onHandleUpdateWorkingFeatureParameter(feature);
      }
    }
    if (
      option &&
      this.props.contexts &&
      !this.props.isWorking &&
      this.props.configurationType === "context" &&
      !this.props.isParameter
    ) {
      let context = [...this.props.contexts].find(
        (f) => f.contextKey === option.key
      );
      if (context) {
          this._onHandleUpdateWorkingItem(undefined, context);
          this.setState({ workingStorageConfig: [] });
      }
    }
  };

  private _onHandleWorkingStorageConfig = (items: IWorkingStorageConfig[]) => {
    this.setState({ workingStorageConfig: items });
  };

  private _onHandleSignalRDB = (items: any[]) => {
    this.setState({ signalRDB: items });
  };
  
  RenderTabTemplate = () => {
    return (
      <FeatureWithLoggingWrapper
        theme={this.props.theme}
        className="FeatureWithLoggingWrapper"
      >
        {this.props.workingContext &&
        this.props.configurationType === "context" &&
        !this.props.isParameter ? (
          <StorageTemplate
            onHandleCurrentTab={this._onHandleUpdateCurrentTab}
            ref={this.saveEdit}
            isMultiples={false}
            rcName={this.props.rcName}
            onHandleWorkingStorageConfig={this._onHandleWorkingStorageConfig}
            workingStorageConfig={this.state.workingStorageConfig}
            onHandleSignalRDB={this._onHandleSignalRDB}
            signalRDB={this.state.signalRDB}
          />
        ) : (
          <FeatureTemplete
            onHandleCurrentTab={this._onHandleUpdateCurrentTab}
            ref={this.saveEdit}
            rcName={this.props.rcName}
            isParameter={this.props.isParameter}
          />
        )}
        {/* {this.props.workingContext &&
          this.props.configurationType === "context" &&
          !this.props.workingContext.isInitialized && (
            <FeatureTemplete
              onHandleCurrentTab={this._onHandleUpdateCurrentTab}
              ref={this.saveEdit}
              rcName={`${this.props.rcName}.logging`}
              sourceLogging={
                this.props.loggingConfig &&
                this.props.loggingConfig.trim() !== ""
                  ? this.props.loggingConfig
                  : undefined
                // : defaultVal
              }
            />
          )} */}
      </FeatureWithLoggingWrapper>
    );
  };

  RenderSourceEditor = () => {
    return (
      <EditorWithLoggingWrapper className="EditorWithLoggingWrapper">
        <FeatureEditor
          ref={this.saveEdit}
          content={
            this.props.workingContext &&
            this.props.configurationType === "context" &&
            !this.props.workingContext.isInitialized
              ? "Storage configuration"
              : undefined
          }
          rcName={this.props.rcName}
          isParameter={this.props.isParameter}
          onHandleWorkingStorageConfig={this._onHandleWorkingStorageConfig}
          workingStorageConfig={this.state.workingStorageConfig}
          signalRDB={this.state.signalRDB}
          onHandleSignalRDB={this._onHandleSignalRDB}
        />
        {/* {this.props.workingContext &&
          this.props.configurationType === "context" &&
          !this.props.workingContext.isInitialized && (
            <FeatureEditor
              ref={this.saveEdit}
              sourceLogging={
                this.props.loggingConfig &&
                this.props.loggingConfig.trim() !== ""
                  ? this.props.loggingConfig
                  : undefined
                // : defaultVal
              }
              rcName={`${this.props.rcName}.logging`}
              content="Logging configuration"
            />
          )} */}
      </EditorWithLoggingWrapper>
    );
  };

  RenderTabContent = () => {
    if (this.state.crtTab === "0") {
      return this.RenderTabTemplate();
    }
    if (this.state.crtTab === "1") {
      return this.RenderSourceEditor();
    }
    return <LoadingSpinner darkMode={this.props.theme} />;
  };

  onHandleSelectedItem = (item: any) => {
    this._HandleUpdateDetailFeatureVisible(true);
  };

  onHandleCancel = () => {
    if (this.props.isWorking) {
      this._onHandleConfirmType(TypeConfirm.Cancel);
      this._onHandleVisiblePanel(true);
    } else {
      this._HandleUpdateDetailFeatureVisible(false);
      this._onHandleResetApplicationStore();
      this._onHandleResetTenantStore();
    }
  };

  onHandleSaveEdit = async () => {
    await this.onHandleUpdateConfiguration();
    if (this.props.isWorking) {
      this._onHandleConfirmType(TypeConfirm.Submit);
      this._onHandleVisiblePanel(true);
    }
  };

  onClosePanel = () => {
    this._onHandleConfirmType(TypeConfirm.Null);
    this._onHandleVisiblePanel(false);
  };

  onHandleSubmitConfirm = async () => {
    if (this.props.confirmType === TypeConfirm.Submit) {
      if (
        (this.props.configurationType &&
          this.props.configurationType === "feature") ||
        this.props.isParameter
      ) {
        await this._onHandleUpdateFeature();
      }
      if (
        this.props.configurationType &&
        this.props.configurationType === "context" &&
        this.props.workingContext &&
        this.props.workingContext.contextKey.trim() !== "" &&
        this.props.workingContext.isInitialized
      ) {
        await this._onHandleUpdateContext();
      }
      if (
        this.props.configurationType &&
        this.props.configurationType === "context" &&
        this.props.workingContext &&
        this.props.workingContext.contextKey.trim() !== "" &&
        !this.props.workingContext.isInitialized &&
        this.props.loggingConfig &&
        this.props.loggingConfig.trim() !== ""
      ) {
        await this._onHandleInitContextConfiguration();
      }
    }
    if (this.props.confirmType === TypeConfirm.Cancel) {
      if (
        this.props.workingFeature &&
        this.props.workingFeature.featureKey.trim() !== "" &&
        this.props.isParameter
      ) {
        this.setState({ isVisiblePivotForm: false });
      }
      this._onHandleResetTenantStore();
      this._HandleUpdateDetailFeatureVisible(false);
    }
    // if (
    //   this.props.workingContext &&
    //   this.props.workingContext.contextKey.trim() === ""
    // ) {
    //   console.log("context null check api ConfigurationContext");
    // }
    this._onHandleConfirmType(TypeConfirm.Null);
    this._onHandleVisiblePanel(false);
    this._onHandleWorkingStatus(false);
  };

  private _BuildTitlePage = (): string => {
    if (this.props.isParameter) {
      return "Parameter configuration";
    }
    switch (this.props.configurationType) {
      case "context":
        return "Basic configuration";
      case "feature":
        return "Advance configuration";
      default:
        return "";
    }
  };

  static contextType = ValidatorJsonContext;
  render() {
    let idTitle = BuildRCAttribute("sp.title");
    const validator = this.context.state as ValidatorJsonFile;
    const disable = (): boolean => {
      if(!this.props.isParameter) {
        if (validator.isValid) return true;
        if (this.state.workingStorageConfig.length === 0 && 
          this.props.configurationType === "context" &&
          this.state.crtTab === "0")  return true;
      }
      else{
        if (validator.isValid) return true;
      }
      return false;
    };
    const disableTab = (text: string): boolean => {
      if(text === "Source" && !this.props.isParameter && this.props.configurationType === "context"){
        if (this.state.signalRDB.length === 0) return true;
      }
      return false;
    }
    return (
      <DetailFeatureWrapper
        theme={this.props.theme}
        className="DetailFeatureWrapper"
      >
        <ActionButtonWrapper
          className="ActionButtonWrapper"
          theme={this.props.theme}
        >
          <h4 {...idTitle} className="action__title">
            {this._BuildTitlePage()}
          </h4>
          <div className="action__btnGr">
            <CommandBarButton
              onClick={this.onHandleSaveEdit}
              iconProps={IconGeneralProps.saveIcon}
              text="Save"
              rcName="save.feature"
              darkMode={this.props.theme}
              disabled={disable()}
            />
            <CommandBarButton
              iconProps={IconGeneralProps.cancelIcon}
              text="Cancel"
              rcName="cancel.feature"
              darkMode={this.props.theme}
              onClick={this.onHandleCancel}
              disabled={
                this.props.isParameter && !this.props.isWorking ? true : false
              }
            />
          </div>
        </ActionButtonWrapper>
        <div className="infomation__wrapper">{this.RenderDropdown()}</div>
        <PivotWrapper
          id="pivot-wrapper"
          theme={{
            darkMode: this.props.theme,
          }}
          className="PivotWrapper"
        >
          {this.state.isVisiblePivotForm && (
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
              selectedKey={this.state.crtTab}
              disableAction={true}
            >
              {FeatureDetailItems.map((item, index) => {
                return (
                  <PivotItem
                    headerButtonProps={{
                      disabled: disableTab(item.text),
                      style: {
                        color: disableTab(item.text) ? "grey" : "black",
                      },
                    }}
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
          )}
        </PivotWrapper>
        <Customizer scopedSettings={{ Layer: { hostId: "main-panel" } }}>
          <Panel
            isOpen={this.props.isPanelPageOpen}
            hasCloseButton
            headerText={"Confirmation"}
            focusTrapZoneProps={{
              isClickableOutsideFocusTrap: true,
              forceFocusInsideTrap: false,
            }}
            isBlocking={false}
            onDismiss={this.onClosePanel}
            styles={PanelStyle(this.props.theme)}
            type={PanelType.smallFixedFar}
            rcName={`tenant`}
          >
            <Confirm
              onHandleSubmit={this.onHandleSubmitConfirm}
              onHandleCancel={this.onClosePanel}
              theme={this.props.theme}
              type={this.props.confirmType}
            />
          </Panel>
        </Customizer>
      </DetailFeatureWrapper>
    );
  }
}

export default Detail;

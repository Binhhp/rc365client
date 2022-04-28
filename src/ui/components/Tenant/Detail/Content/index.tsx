import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import * as React from "react";
import { BuildFunction, BuildRCAttribute } from "src/common/functions";
import { IDetailProps, IDetailStates } from "./ContentModel";
import { DetailWrapper, PivotWrapper } from "./ContentStyle";
import Pivot from "aod-dependencies/Pivot/CustomPivot";
import { PivotItem } from "aod-dependencies/Pivot";
import { TenantDetailPivotItems } from "src/common/constants";
import TenantDetailInfomation from "src/ui/containers/Tenant/Detail/TenantDetailInfomationContainer";
import TenantFeature from "src/ui/containers/Tenant/Feature/FeatureListContainer";
import FeatureDetail from "src/ui/containers/Tenant/Feature/FeatureDetailContainer";
import Confirm from "src/common/ui/ConfirmPanel";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import { Panel, PanelType } from "aod-dependencies/Panel";
import { PanelStyle } from "src/common/style";
import { TypeConfirm } from "src/entity/enums";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { Redirect } from "react-router-dom";
import { ConfirmWrapper } from "../../Create/Infomation/InfomationStyle";
import { Icon } from "aod-dependencies/@uifabric/icons1";
import { ValidatorJsonProvider } from "src/common/contexts";

class Detail extends React.Component<IDetailProps, IDetailStates> {
  constructor(props: IDetailProps) {
    super(props);
    this.state = {
      crtTab: "0",
      isPanelOpen: false,
      isRedirect: false,
    };
  }

  componentDidMount() {
    this._onHandleCheckStoreWorkingTenant();
    this._onHandleBreadcrumb();
    this._onHandleGetContexts();
    this._onHandleGetFeatures();
  }

  componentDidUpdate(prevProps: IDetailProps, prevState: IDetailStates) {
    if (
      (!prevProps.workingTenant ||
        !prevProps.workingTenant.id ||
        prevProps.workingTenant?.id !== this.props.workingTenant?.id) &&
      this.props.workingTenant &&
      this.props.workingTenant.id
    ) {
      this._onHandleBreadcrumb();
      this._onHandleGetContexts();
      this._onHandleGetFeatures();
    }
  }

  // [Call api get tenant detail by id]
  private _onHandleGetTenantById = (id: string) => {
    if (this.props.OnGetTenantById) {
      this.props.OnGetTenantById(id).catch((er) => {
        // [Handle id exist but cant find tenant with that id]
        this.setState({ isRedirect: true });
      });
    }
  };

  private _onHandleCheckStoreWorkingTenant = async () => {
    let pathName = window.location.pathname;
    if (this.props.workingTenant && this.props.workingTenant.id === "") {
      let id = pathName.split("/tenant/")[1];
      // [Check id exist]
      if (id) {
        await this._onHandleGetTenantById(id);
      } else {
        await this.setState({ isRedirect: true });
      }
    }
  };

  private _onHandleUpdateBreadcrumb = (nodes: INodes[]) => {
    if (this.props.OnHandleUpdateBreadCrumb) {
      this.props.OnHandleUpdateBreadCrumb(nodes);
    }
  };

  private _onHandleBreadcrumb = () => {
    if (this.props.workingTenant) {
      let rootNode = {
        id: "1",
        text: "Tenant",
        isSelected: true,
        parentId: "#",
        url: "tenants",
      };
      let Node = {
        id: this.props.workingTenant.id,
        text: this.props.workingTenant.name,
        isSelected: true,
        parentId: "1",
        url: `tenant/${this.props.workingTenant.id}`,
      };
      let node = BuildFunction.buildNodeForBreadcrumb(Node);
      let root = BuildFunction.buildNodeForBreadcrumb(rootNode);
      this._onHandleUpdateBreadcrumb([root, node]);
    }
  };

  private _onChangePivotItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item && item.props.itemKey && !this.props.isWorking) {
      this.setState({ crtTab: item.props.itemKey });
    }
    if (
      item &&
      item.props.itemKey &&
      this.props.isWorking &&
      item.props.itemKey !== this.state.crtTab
    ) {
      this._onHandleUpdateConfirmType(TypeConfirm.Cancel);
      this.setState({ isPanelOpen: true });
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
  private _HandleUpdateWorkingFeature = (item: BaseFeatureContextTenant) => {
    if (this.props.OnUpdateWorkingFeature) {
      this.props.OnUpdateWorkingFeature(item);
    }
  };

  private _HandlePanelVisible = (val?: boolean) => {
    if (val !== undefined) {
      this.setState({ isPanelOpen: val });
    } else {
      this.setState({ isPanelOpen: !this.state.isPanelOpen });
    }
  };

  private _onHandleUpdateWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onHandleUpdateTenantTS = async () => {
    if (this.props.workingTenant && this.props.OnHandleUpdateTenant) {
      await this.props.OnHandleUpdateTenant(
        this.props.workingTenant.id,
        this.props.workingTenant
      );
      this.setState({ isRedirect: true });
    }
  };

  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.confirmType !== type && this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onHandleUpdateSourceConfiguration = (config: string) => {
    if (this.props.OnUpdateSourceConfig) {
      this.props.OnUpdateSourceConfig(config);
    }
  };

  private _onHandleFeatureStoreData = (item: any) => {
    if (this.props.configurationType === "feature") {
      let feature = new BaseFeatureContextTenant();
      feature.contextKey = item.contextKey;
      feature.featureKey = item.featureKey;
      feature.isEnabled = item.isEnabled;
      feature.description = item.description;
      feature.featureName = item.featureName;
      feature.version = item.version;
      feature.configuration = item.configuration;
      feature.isAlreadyHaveConfig = item.isAlreadyHaveConfig;
      this._HandleUpdateWorkingFeature(feature);
      this._onHandleUpdateSourceConfiguration(feature.configuration);
    }
    return;
  };

  RenderTabContent = () => {
    switch (this.state.crtTab) {
      case "0":
        return (
          <TenantDetailInfomation
            onHandleOpenPanel={this._HandlePanelVisible}
            rcName="tenant.detail"
          />
        );
      case "1":
        return this.RenderFeatureManagementTab();
      case "2":
        return <FeatureDetail rcName="feature" isParameter />;
      default:
        return;
    }
  };

  RenderFeatureManagementTab = () => {
    if (this.props.isDetailFeatureVisibled) {
      return <FeatureDetail rcName="feature" />;
    }
    return (
      <TenantFeature
        rcName="feature"
        type="detail"
        isHaveNameAction={true}
        onGetSelectedItem={this.onHandleSelectedItem}
        licenceType={
          this.props.workingTenant?.tenantInfo?.licenceInfo?.licenceType
        }
      />
    );
  };

  onHandleSubmitConfirm = () => {
    let crtTab = this.state.crtTab;
    if (this.props.confirmType === TypeConfirm.Submit) {
      this._onHandleUpdateTenantTS();
    }
    if (this.props.confirmType === TypeConfirm.Cancel) {
      this.setState({ isRedirect: true });
    }
    this._onHandleUpdateConfirmType(TypeConfirm.Null);
    this._onHandleUpdateWorkingStatus(false);
    this._HandleUpdateDetailFeatureVisible(false);
    this.setState({ isPanelOpen: false, crtTab: crtTab });
  };

  onHandleSelectedItem = async (item: any) => {
    await this._onHandleFeatureStoreData(item);
    if (this.props.configurationType === "feature") {
      this._HandleUpdateWorkingFeature(item);
    }
    this._HandleUpdateDetailFeatureVisible(true);
  };

  private _onHandleGetContexts = () => {
    if (this.props.OnGetContextsList && this.props.workingTenant) {
      this.props.OnGetContextsList(this.props.workingTenant.id);
    }
  };
  private _onHandleGetFeatures = () => {
    if (this.props.OnGetFeaturesList && this.props.workingTenant) {
      this.props.OnGetFeaturesList(this.props.workingTenant.id);
    }
  };

  render() {
    let tenantName = BuildRCAttribute("cfm.tenant.name");
    let tenantLicence = BuildRCAttribute("cfm.tenant.licence");
    let tenantOwnerName = BuildRCAttribute("cfm.tenant.ownerName");
    let tenantOwnerEmail = BuildRCAttribute("cfm.tenant.ownerEmail");
    let tenantOwnerPhone = BuildRCAttribute("cfm.tenant.ownerPhone");
    let wrapper = BuildRCAttribute("tenant.detail");
    if (this.state.isRedirect) {
      return <Redirect to="/tenants" />;
    }
    return (
      <DetailWrapper
        {...wrapper}
        theme={this.props.theme}
        className="DetailWrapper"
      >
        <ValidatorJsonProvider>
          <PivotWrapper
            id="pivot-wrapper"
            theme={{
              darkMode: this.props.theme,
            }}
            className="PivotWrapper"
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
              selectedKey={this.state.crtTab}
              disableAction={true}
            >
              {TenantDetailPivotItems.map((item, index) => {
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
                        item.text === "Parameter management" &&
                        this.props.contexts &&
                        !this.props.contexts.some((c) => c.isInitialized)
                          ? true
                          : false,
                    }}
                  >
                    {this.RenderTabContent()}
                  </PivotItem>
                );
              })}
            </Pivot>
          </PivotWrapper>
          <Customizer scopedSettings={{ Layer: { hostId: "main-panel" } }}>
            <Panel
              isOpen={this.state.isPanelOpen}
              hasCloseButton
              headerText={"Confirmation"}
              focusTrapZoneProps={{
                isClickableOutsideFocusTrap: true,
                forceFocusInsideTrap: false,
              }}
              isBlocking={false}
              onDismiss={() => this._HandlePanelVisible()}
              styles={PanelStyle(this.props.theme)}
              type={
                this.props.confirmType === TypeConfirm.Submit
                  ? PanelType.medium
                  : PanelType.smallFixedFar
              }
              rcName={`tenant`}
            >
              <Confirm
                onHandleSubmit={this.onHandleSubmitConfirm}
                onHandleCancel={this._HandlePanelVisible}
                theme={this.props.theme}
                type={this.props.confirmType}
              >
                {this.props.confirmType === TypeConfirm.Submit &&
                  this.props.workingTenant && (
                    <ConfirmWrapper
                      className="ConfirmWrapper"
                      theme={this.props.theme}
                    >
                      <div className="item__tenant">
                        <h2 className="item__name">
                          <Icon
                            iconName="RecruitmentManagement"
                            style={{ paddingRight: 10 }}
                          />
                          <span {...tenantName}>
                            {this.props.workingTenant.name}
                          </span>
                        </h2>
                        <span {...tenantLicence} className="item__location">
                          {
                            this.props.workingTenant.tenantInfo.licenceInfo
                              .licenceType
                          }
                        </span>
                      </div>
                      <div className="item__owner">
                        <h3 {...tenantOwnerName}>
                          {this.props.workingTenant.tenantInfo.owner.name}
                        </h3>
                        <p {...tenantOwnerEmail}>
                          {this.props.workingTenant.tenantInfo.owner.email}
                        </p>
                        <p {...tenantOwnerPhone}>
                          {
                            this.props.workingTenant.tenantInfo.owner
                              .phoneNumber
                          }
                        </p>
                      </div>
                    </ConfirmWrapper>
                  )}
              </Confirm>
            </Panel>
          </Customizer>
        </ValidatorJsonProvider>
      </DetailWrapper>
    );
  }
}

export default Detail;

import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import * as React from "react";
import { BaseTenant } from "src/common/classes/BaseTenant";
import { BuildFunction, BuildRCAttribute } from "src/common/functions";
import { ICreateProps, ICreateStates } from "./CreateModel";
import { CreateWrapper, PivotWrapper } from "./CreateStyle";
import Pivot from "aod-dependencies/Pivot/CustomPivot";
import { PivotItem } from "aod-dependencies/Pivot";
import { TenantCreatePivotItems } from "src/common/constants";
import TenantInfomation from "src/ui/containers/Tenant/TenantInfomationContainer";
import TenantFeature from "src/ui/containers/Tenant/Feature/FeatureListContainer";

class Create extends React.Component<ICreateProps, ICreateStates> {
  constructor(props: ICreateProps) {
    super(props);
    this.state = {
      crtTab: "0",
      workingTenant: new BaseTenant(),
      isAssign: false,
    };
  }

  UNSAFE_componentWillMount() {
    this._onHandleRedirectToOrg();
  }

  componentWillUnmount() {
    this._onHandleResetApplicationStore();
  }

  private _onHandleUpdateBreadcrumb = (nodes: INodes[]) => {
    if (this.props.OnHandleUpdateBreadCrumb) {
      this.props.OnHandleUpdateBreadCrumb(nodes);
    }
  };
  private _onHandleResetApplicationStore = () => {
    if (this.props.OnResetApplicationStore) {
      this.props.OnResetApplicationStore();
    }
  };

  private _onHandleRedirectToOrg = () => {
    let rootNode = {
      id: "1",
      text: "Tenant",
      isSelected: true,
      parentId: "#",
      url: "tenants",
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

  private _onChangePivotItem = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    if (item && item.props.itemKey) {
      this.setState({ crtTab: item.props.itemKey }, () => {
        if (item.props.itemKey === "1") {
          this._onHandleUpdateWorkingTenant();
        }
      });
    }
  };

  private _onHandleUpdateWorkingTenant = () => {
    if (this.props.OnUpdateWorkingTenant) {
      this.props.OnUpdateWorkingTenant(this.state.workingTenant);
    }
  };

  onHandleTenantData = (tenant: BaseTenant, isAssign: boolean) => {
    this.setState({ workingTenant: tenant, isAssign });
  };

  RenderTabContent = () => {
    if (this.state.crtTab === "0") {
      return (
        <TenantInfomation
          onGetTenantData={this.onHandleTenantData}
          workingTenant={this.state.workingTenant}
          rcName="tenant"
          isAssign={this.state.isAssign}
        />
      );
    }
    return (
      <TenantFeature
        type="create"
        rcName="tenant"
        licenceType={
          this.state.workingTenant.tenantInfo.licenceInfo.licenceType
        }
      />
    );
  };

  render() {
    let wrapper = BuildRCAttribute("tenant.create");
    return (
      <CreateWrapper
        {...wrapper}
        theme={this.props.theme}
        className="CreateWrapper"
      >
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
            {TenantCreatePivotItems.map((item, index) => {
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
                      this.state.workingTenant.tenantInfo.licenceInfo
                        .licenceType === "" && item.text === "Features"
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
      </CreateWrapper>
    );
  }
}

export default Create;

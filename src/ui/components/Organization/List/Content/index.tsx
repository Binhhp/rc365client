import * as React from "react";
import {
  ListOrganizationsWrapper,
  MainListOrganizations,
  ActionsWrapper,
  OrganizationsList,
  EmptyContent,
  ConfirmWrapper,
} from "./ContentStyle";
import {
  IListOrganizationsProps,
  IListOrganizationsState,
} from "./ContentModels";
import { LoadingSpinner } from "src/common/ui/Loading";
import Button from "aod-dependencies/Button";
import SearchButton from "../Search";
import EmptyIMG from "src/assets/listOrganization/noSelection-32ecdcb31a947d39b2477558a29511be.svg";
import { Panel, PanelType } from "aod-dependencies/Panel";
import { Customizer } from "aod-dependencies/@uifabric/utilities";
import OrganizationCard from "src/ui/containers/Organization/List/OrganizationItemContainer";
import CreateOrganization from "src/ui/containers/Organization/List/CreateOrganizationContainer";
import { BuildFunction, BuildRCAttribute } from "src/common/functions";
import { PanelStyle } from "src/common/style";
import { TypeConfirm } from "src/entity/enums";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import Confirm from "src/ui/containers/Common/ConfirmContainer";
import { IsCanBeReload } from "src/services/implements/SignalRManager";

export default class ListOrganizations extends React.Component<
  IListOrganizationsProps,
  IListOrganizationsState
> {
  constructor(props: IListOrganizationsProps) {
    super(props);
    this.state = {
      isPanelOpen: false,
      filterItems: null,
      idConfirm: null,
      isWorkingOnCreate: false,
      name: "",
      domain: "",
      conversationId: "",
      workflowId: "",
    };
  }

  UNSAFE_componentWillMount() {
    let rootNode = {
      id: "1",
      text: "Organizations",
      isSelected: true,
      parentId: "#",
      url: "organizations",
    };
    let node = BuildFunction.buildNodeForBreadcrumb(rootNode);
    if (this.props.OnHandleUpdateBreadCrumb) {
      this.props.OnHandleUpdateBreadCrumb([node]);
    }
  }

  componentDidMount() {
    this._GetOrganizationItems();
  }

  componentDidUpdate(prevProps: IListOrganizationsProps) {
    let isReload = IsCanBeReload(
      this.state.conversationId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId
    );
    if (isReload) {
      this._GetOrganizationItems();
      this._onHandleClearCidAndWorkflowId();
    }
  }

  private _onHandleClearCidAndWorkflowId = () => {
    if (this.props.OnClearCidAndWorkflowId) {
      this.props.OnClearCidAndWorkflowId();
    }
  };

  private _GetOrganizationItems = () => {
    if (this.props.LoadOrganizationList) {
      this.props.LoadOrganizationList();
    }
    if (this.state.conversationId !== "" || this.state.workflowId !== "") {
      this.setState({ workflowId: "", conversationId: "" });
    }
  };

  private _onUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onHandleCreateOrganization = () => {
    if (this.props.OnHandleCreateOrganization) {
      this.props
        .OnHandleCreateOrganization(this.state.name, this.state.domain)
        .then((res) => {
          this.setState({
            conversationId: res.conversationId,
            workflowId: res.workflowId,
          });
        });
    }
  };

  private _onSubmitConfirm = () => {
    if (this.props.confirmType === TypeConfirm.Review) {
      this._onHandleCreateOrganization();
    } else if (
      this.props.confirmType === TypeConfirm.Delete &&
      this.state.idConfirm
    ) {
      this._onHandleConfirmRemoveItem(this.state.idConfirm);
    } else {
    }
    this._onHandleVisiblePanel(false);
  };

  private _onHandleConfirmRemoveItem = (id: string) => {
    if (this.props.OnHandleDeleteOrganization) {
      this.props.OnHandleDeleteOrganization(id).then((res) => {
        if (res) {
          this.setState({
            conversationId: res.conversationId,
            workflowId: res.workflowId,
          });
        }
      });
    }
  };

  private _onHandleVisiblePanel = (val?: boolean) => {
    if (this.state.isPanelOpen !== val) {
      let isOpen = val ? val : false;
      this.setState({
        isPanelOpen: isOpen,
        isWorkingOnCreate: false,
        // idConfirm: null,
        name: "",
        domain: "",
      });
      if (!isOpen) {
        this._onUpdateConfirmType(TypeConfirm.Null);
      }
    }
  };

  private _onUpdateWorkingCreate = (val: boolean) => {
    if (this.state.isWorkingOnCreate !== val) {
      this.setState({ isWorkingOnCreate: val });
    }
  };

  private _onDissmisPanel = () => {
    if (
      this.state.isWorkingOnCreate &&
      this.props.confirmType === TypeConfirm.Null
    ) {
      this._onUpdateConfirmType(TypeConfirm.Cancel);
    }

    if (
      this.state.isWorkingOnCreate &&
      this.props.confirmType !== TypeConfirm.Null
    ) {
      this._onUpdateConfirmType(TypeConfirm.Null);
    }

    if (!this.state.isWorkingOnCreate) {
      this._onHandleVisiblePanel(false);
      this._onUpdateConfirmType(TypeConfirm.Null);
    }
  };

  private _onHandlePanelVisible = (val?: boolean) => {
    let value = val ? val : true;
    this.setState({ isPanelOpen: value });
  };

  private _onHandleCancelSubmit = () => {
    if (
      this.state.isWorkingOnCreate &&
      this.props.confirmType !== TypeConfirm.Delete
    ) {
      this._onUpdateConfirmType(TypeConfirm.Null);
    } else {
      this._onHandleVisiblePanel(false);
    }
  };

  RenderPanelContent = () => {
    let idConfirmName = BuildRCAttribute(`cfm.org.name`);
    let idConfirmDomain = BuildRCAttribute(`cfm.org.domain`);
    if (this.props.confirmType && this.props.confirmType === TypeConfirm.Null) {
      return (
        <CreateOrganization
          onHandleVisiblePanel={this._onHandleVisiblePanel}
          theme={this.props.theme}
          onGetWorkingStatus={this._onUpdateWorkingCreate}
          onGetFormValue={this.onHandleFormValue}
          isWorkingOnCreate={this.state.isWorkingOnCreate}
          domain={this.state.domain}
          name={this.state.name}
        />
      );
    } else {
      return (
        <Confirm
          onHandleCancel={this._onHandleCancelSubmit}
          onHandleSubmit={this._onSubmitConfirm}
          rcName="org"
          content={
            this.props.confirmType === TypeConfirm.Review
              ? "Do you really want to create an organization?"
              : undefined
          }
        >
          {this.props.confirmType === TypeConfirm.Review && (
            <ConfirmWrapper className="ConfirmWrapper" theme={this.props.theme}>
              <h2 {...idConfirmName} className="item__name">
                {this.state.name}
              </h2>
              <span {...idConfirmDomain} className="item__location">
                {this.state.domain}
              </span>
            </ConfirmWrapper>
          )}
        </Confirm>
      );
    }
  };

  onHandleFormValue = (name: string, domain: string) => {
    this.setState({ name, domain });
  };

  onGetFilterData = (filterArr: BaseOrganization[] | null) => {
    this.setState({
      filterItems: filterArr,
    });
  };

  onHandleUpdateNameConversationId = (id: string, wId?: string) => {
    this.setState({ conversationId: id, workflowId: wId || "" });
  };

  onHandleRemoveItem = async (id: string) => {
    this._onUpdateConfirmType(TypeConfirm.Delete);
    await this.setState({ idConfirm: id, isPanelOpen: true });
  };

  render() {
    let idCreateBtn = BuildRCAttribute(`btn.create`);
    let idScrollList = BuildRCAttribute(`scr.org`);
    let idSearchResult = BuildRCAttribute(`sp.empty.org`);
    let crtItems = this.state.filterItems
      ? this.state.filterItems
      : this.props.organizationList && this.props.organizationList.length > 0
      ? this.props.organizationList
      : [];

    return (
      <ListOrganizationsWrapper
        className="ListOrganizationsWrapper"
        theme={this.props.theme}
      >
        <MainListOrganizations
          className="MainListOrganizations"
          theme={this.props.theme}
        >
          {!this.props.isOrganizationListLoading ? (
            <>
              {this.props.organizationList &&
                this.props.organizationList.length > 0 && (
                  <ActionsWrapper
                    className="ActionsWrapper"
                    theme={this.props.theme}
                  >
                    <SearchButton
                      data={this.props.organizationList}
                      theme={this.props.theme || "light"}
                      onGetFilterData={this.onGetFilterData}
                    />
                    <Button
                      text="Create"
                      type="Primary"
                      onClick={() => this._onHandleVisiblePanel(true)}
                      rcName="creOrg"
                      darkMode={this.props.theme}
                    />
                  </ActionsWrapper>
                )}
              {crtItems && crtItems.length > 0 ? (
                <OrganizationsList
                  className="OrganizationsList"
                  theme={this.props.theme}
                  {...idScrollList}
                >
                  {crtItems.map((item, index) => {
                    return (
                      <OrganizationCard
                        key={item.id}
                        data={item}
                        theme={this.props.theme || "light"}
                        orgList={crtItems}
                        index={index}
                        onHandleRemoveItem={this.onHandleRemoveItem}
                        isWorking={this.state.isWorkingOnCreate}
                        onUpdateConversationId={
                          this.onHandleUpdateNameConversationId
                        }
                      />
                    );
                  })}
                </OrganizationsList>
              ) : (
                <EmptyContent className="EmptyContent" theme={this.props.theme}>
                  <img src={EmptyIMG} alt="empty_img" />
                  <span {...idSearchResult}>
                    {!this.state.filterItems
                      ? "You don't have any organization!! "
                      : "No data available"}
                    {!this.state.filterItems && (
                      <span
                        style={{
                          color:
                            this.props.theme === "dark" ? "#69AFE5" : "#0078D4",
                        }}
                        className="emptyConent-btnCreate"
                        onClick={() => this._onHandlePanelVisible(true)}
                        {...idCreateBtn}
                      >
                        Create now
                      </span>
                    )}
                  </span>
                </EmptyContent>
              )}
            </>
          ) : (
            <LoadingSpinner darkMode={this.props.theme} />
          )}
        </MainListOrganizations>
        <Customizer scopedSettings={{ Layer: { hostId: "main-panel" } }}>
          <Panel
            isOpen={this.state.isPanelOpen}
            hasCloseButton
            headerText={
              this.props.confirmType === TypeConfirm.Null
                ? "Create Organization"
                : "Confirmation"
            }
            focusTrapZoneProps={{
              isClickableOutsideFocusTrap: true,
              forceFocusInsideTrap: false,
            }}
            isBlocking={false}
            onDismiss={this._onDissmisPanel}
            isLightDismiss={true}
            styles={PanelStyle(this.props.theme)}
            type={PanelType.medium}
            rcName={
              this.props.confirmType !== TypeConfirm.Null ? "creOrg" : "cfm"
            }
          >
            {this.RenderPanelContent()}
          </Panel>
        </Customizer>
      </ListOrganizationsWrapper>
    );
  }
}

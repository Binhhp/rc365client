import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import TextField from "aod-dependencies/TextField/CustomTextField";
import * as React from "react";
import { Redirect } from "react-router-dom";
import { BuildFunction, BuildRCAttribute } from "src/common/functions";
import { OrganizationItemTagList, TypePage } from "src/entity/enums";
import { IOrganizationCardProps, IOrganizationCardState } from "./ItemModels";
import {
  OrganizationCardWrapper,
  OrganizationNameWrapper,
  TagWrapper,
  TagWrapperParent,
} from "./ItemStyle";
import Tag from "./Tag";

export default class OrganizationItem extends React.Component<
  IOrganizationCardProps,
  IOrganizationCardState
> {
  constructor(props: IOrganizationCardProps) {
    super(props);
    this.state = {
      isChangeOrganizationName: false,
      organizationName: "",
      isRedirect: false,
      // conversationId: "",
    };
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({ organizationName: this.props.data.name });
    }
  }

  private _onHandleRedirectToOrg = async () => {
    if (this.props.OnHandleUpdateBreadCrumb && this.props.breadCrumb) {
      let crtBreadcrumb = [...this.props.breadCrumb];
      let rootNode = {
        id: this.props.data.id,
        text: this.props.data.name,
        isSelected: false,
        parentId: "#",
        url: `?orgId=${this.props.data.id}`,
      };
      let node = BuildFunction.buildNodeForBreadcrumb(rootNode);
      if (crtBreadcrumb) {
        let index = crtBreadcrumb.findIndex(
          (b) => typeof b.parentId === "string"
        );
        if (index !== -1) {
          node.parentId = crtBreadcrumb[index].id;
        }
      }
      crtBreadcrumb[1] = node;
      await this.props.OnHandleUpdateBreadCrumb(crtBreadcrumb);
      this.setState({ isRedirect: true });
    }
  };

  private _onHandleUpdateOrganizationName = (id: string, name: string) => {
    if (this.props.OnHandleUpdateOrganizationName) {
      this.props.OnHandleUpdateOrganizationName(id, name).then((res) => {
        if (res) {
          this._onHandleUpdateConversationId(
            res.conversationId,
            res.workflowId
          );
        }
      });
    }
  };

  private _onHandleUpdateConversationId = (id: string, wId?: string) => {
    if (this.props.onUpdateConversationId) {
      this.props.onUpdateConversationId(id, wId);
    }
  };

  onChangeTextField = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    this.setState({
      organizationName: newValue ? newValue : "",
    });
  };

  onHandleSaveNewName = async () => {
    let { isChangeOrganizationName, organizationName } = this.state;
    if (
      !isChangeOrganizationName === false &&
      organizationName.trim() !== "" &&
      organizationName.trim() !== this.props.data.name &&
      this.props.orgList &&
      !this.props.orgList.some((org) => org.name === organizationName)
    ) {
      await this._onHandleUpdateOrganizationName(
        this.props.data.id,
        organizationName
      );
    }
    this.setState({
      isChangeOrganizationName: !isChangeOrganizationName,
      organizationName:
        !isChangeOrganizationName === true && this.props.data
          ? this.props.data.name
          : "",
    });
  };

  onHandleRemoveOrganization = async () => {
    this.props.onHandleRemoveItem &&
      this.props.onHandleRemoveItem(this.props.data.id);
  };

  private _onHandleMapNumber = (type: TypePage): number => {
    switch (type) {
      case TypePage.Users:
        return this.props.data.userNumber;
      case TypePage.Domains:
        return this.props.data.domainNumber;
      case TypePage.Resources:
        return this.props.data.resourceNumber;
      case TypePage.Groups:
        return this.props.data.groupNumber;
      default:
        return 0;
    }
  };

  RenderErrorMessage = (props: IOrganizationCardProps): string => {
    if (props.data && (!props.data.name || props.data.name.trim() === "")) {
      return "Enter organization name.";
    }
    if (
      props.orgList &&
      props.orgList.some((org) => org.name === this.state.organizationName) &&
      this.state.organizationName !== props.data.name
    ) {
      return "Organization name already exist.";
    }
    return "";
  };

  render() {
    let idLink = BuildRCAttribute(`lik.${this.props.index}`);
    let idOrgItem = BuildRCAttribute(`org.item`);
    let idDomain = BuildRCAttribute(
      `sp.domain.org.${this.props.data.name}.${this.props.index}`
    );
    if (
      this.state.isRedirect &&
      this.props.orgInfo &&
      this.props.orgInfo.id !== "S"
    ) {
      return (
        <Redirect
          to={{ pathname: "/", search: `?orgId=${this.props.data.id}` }}
        />
      );
    }

    return (
      <OrganizationCardWrapper
        theme={this.props.theme}
        className="OrganizationCardWrapper"
        {...idOrgItem}
      >
        <div className="cardContent">
          <Icon
            rcName={`org.${this.props.index}`}
            className="remove-Btn"
            iconName="Cancel"
            onClick={this.onHandleRemoveOrganization}
          />
          <OrganizationNameWrapper
            className="OrganizationNameWrapper"
            theme={this.props.theme}
          >
            {this.state.isChangeOrganizationName ? (
              <TextField
                defaultValue={this.props.data.name}
                onChange={this.onChangeTextField}
                styles={{
                  wrapper: { margin: "4px 0" },
                }}
                darkMode={this.props.theme}
                rcName={`${this.props.data.name}`}
                ref="cardField"
                errorMessage={this.RenderErrorMessage(this.props)}
              />
            ) : (
              <span
                {...idLink}
                className="card__name"
                // to={{
                //   pathname: "/",
                //   search: `?orgId=${this.props.data.id}`,
                // }}
                style={{
                  pointerEvents: this.props.isWorking ? "none" : "auto",
                }}
                onClick={this._onHandleRedirectToOrg}
              >
                {this.props.data.name}
              </span>
            )}
            <Icon
              className="companyName__edit"
              iconName={this.state.isChangeOrganizationName ? "Accept" : "Edit"}
              onClick={this.onHandleSaveNewName}
              rcName={`btn.${this.props.index}`}
            />
          </OrganizationNameWrapper>
          <span {...idDomain} className="card__domain">
            {this.props.data.domain}
          </span>
          <TagWrapperParent>
            <TagWrapper className="TagWrapper" theme={this.props.theme}>
              {OrganizationItemTagList.map((item, index) => {
                let val = this._onHandleMapNumber(item.tab);
                item.total = val;
                return (
                  <Tag
                    key={index}
                    orgId={this.props.data.id}
                    orgName={this.props.data.name}
                    theme={this.props.theme}
                    data={item}
                    isWorkingOnCreate={this.props.isWorking ? true : false}
                    onHandleRemoveOrganization={this.onHandleRemoveOrganization}
                  />
                );
              })}
            </TagWrapper>
          </TagWrapperParent>
        </div>
      </OrganizationCardWrapper>
    );
  }
}

import * as React from "react";
import {
  SearchWrapper,
  SearchContentWrapper,
  SearchBoxWrapper,
} from "./SearchStyle";
import { ISearchProps, ISearchStates } from "./SearchModel";
import { TypePage } from "src/entity/enums";
import { DataListSource } from "aod-dependencies/DataList/Interface";
import ListCustom from "aod-dependencies/DataList";
import { ApiFromOData, BuildURLWithTenantId } from "src/common/constants";
import { BaseUser, UserDto } from "src/common/classes/BaseUser";
import { IconGeneralProps } from "src/common/style";
import SearchBox from "aod-dependencies/SearchBox/CustomSearchBox";
import Dropdown from "aod-dependencies/Dropdown/CustomDropdown";
import { IDropdownOption } from "aod-dependencies/Dropdown/Dropdown.types";
import { LoadingSpinner } from "src/common/ui/Loading";
import buildQuery from "odata-query";
import { SignalRSearchUserResponse } from "src/services/interface/ISignalRManager";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { BaseResource } from "src/common/classes/BaseResource";
import { IsCanBeReload } from "src/services/implements/SignalRManager";
import { FetchDataFromServer } from "src/common/functions";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";

const options: { key: string; text: string }[] = [
  { key: TypePage.Users, text: "User" },
  { key: TypePage.Groups, text: "Group" },
  { key: TypePage.Resources, text: "Resource" },
];

export default class Member extends React.Component<
  ISearchProps,
  ISearchStates
> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      selectedMembers: [],
      type: TypePage.Users,
      text: "",
      isLoading: false,
      typingTimeout: 0,
      conversationId: "",
      workflowId: "",
      visibleText: "",
      users: [],
      groups: [],
      resources: [],
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
      if (this.state.text.trim() !== "" && this.props.group && endpoint) {
        let filter = [
          { not: { name: `${this.props.group.name}` } },
          `contains(tolower(name),tolower('${this.state.text}'))`,
        ];
        endpointBuilded = buildQuery({ top, skip, filter });
        let defaultURL = this._mapSearchTypeToAPI();
        let url =
          nextLink && nextLink !== ""
            ? `${defaultURL}${endpointBuilded}${
                endpoint ? `&${endpoint.split("?")[1]}` : ""
              }&$skiptoken=${nextLink}`
            : `${defaultURL}${endpointBuilded}${
                endpoint ? `&${endpoint.split("?")[1]}` : ""
              }`;
        if (this.props.orgInfo) {
          url = `${url}&organizationId=${this.props.orgInfo.id}`;
        }
        await FetchDataFromServer({ url: url }).then((res) => {
          if (res) {
            this._query.source = res.value;
          }
        });
      }
      return [];
    };
    this.Action = React.createRef();
  }

  componentDidUpdate(prevProps: ISearchProps, prevState: ISearchStates) {
    let isReload = IsCanBeReload(
      this.state.conversationId,
      this.props.signalRConversationId,
      this.state.workflowId,
      this.props.signalRWorkflowId,
      this.props.isHaveMessageSignalR
    );
    if (isReload && this.props.signalRData) {
      // [NOTE] : save SignalR data and return
      let rs = this._onHandleBuildSignalRDataResponse(
        this.props.signalRData.value
      );
      if (rs) {
        this._query.source = rs;
      }
      if (this.props.signalRData && isReload) {
        this._onHandleGetDataForm();
      }
    }
  }

  // componentDidUpdate(prevProps: ISearchProps, prevState: ISearchStates) {
  //   if (
  //     this.state.conversationId === this.props.signalRConversationId &&
  //     this.state.conversationId !== "" &&
  //     this.props.signalRData &&
  //     !this.props.isHaveMessageSignalR
  //   ) {
  //     // [NOTE] : save SignalR data and return
  //     let rs = this._onHandleBuildSignalRDataResponse(this.props.signalRData);
  //     if (rs) {
  //       this._query.source = rs;
  //     }
  //     if (this.props.signalRData) {
  //       this._onHandleGetDataForm();
  //     }
  //   }
  // }

  private _onHandleCallApiGetDataList = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryDataByClassType();
  };

  private _onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onHandleQueryClassSource(this._query.source, 1);
  };

  private _onHandleBuildSignalRDataResponse = (signalRData: any): any[] => {
    switch (this.state.type) {
      case TypePage.Users:
        return this._BuildSignalRUserData(signalRData);
      case TypePage.Resources:
        return this._BuildSignalRResourceData(signalRData);
      case TypePage.Groups:
        return this._BuildSignalRGroupData(signalRData);
      default:
        return [];
    }
  };

  private _BuildSignalRGroupData = (signalRData: any): any[] => {
    console.log("build response data group");
    return [];
  };
  private _BuildSignalRResourceData = (signalRData: any): any[] => {
    console.log("build response data resource");
    return [];
  };

  private _BuildSignalRUserData = (signalRData: any): UserDto[] => {
    let res = new SignalRSearchUserResponse();
    res.nextLink = signalRData.nextLink;
    if (
      signalRData.searchUserResponse &&
      Array.isArray(signalRData.searchUserResponse)
    ) {
      let result = signalRData.searchUserResponse.map((us: any) => {
        let user = new UserDto();
        user.email = us.email || "";
        user.name = us.name || "";
        user.city = us.city || "";
        user.countryOrRegion = us.countryOrRegion || "";
        user.department = us.department || "";
        user.faxNumber = us.faxNumber || "";
        user.jobTitle = us.jobTitle || "";
        user.mobilePhone = us.mobilePhone || "";
        user.office = us.office || "";
        user.officePhone = us.officePhone || "";
        user.stateOrProvince = us.stateOrProvince || "";
        user.streetAddress = us.streetAddress || "";
        user.zipOrPostalCode = us.zipOrPostalCode || "";
        user.id = us.id || "";
        user.organizationId = us.organizationId || "";
        return user;
      });
      res.searchUserResponse = result;
    }
    return res.searchUserResponse;
  };

  private _onHandUpdateState = (selectedItems: any[]) => {
    switch (this.state.type) {
      case TypePage.Users:
        let userItems = selectedItems.map((i) => {
          let us = new BaseUser();
          us.id = i.guid;
          if (i.userAdInfo) {
            us.adId = i.userAdInfo.adId;
            us.lastTimeSynchronize = i.userAdInfo.lastTimeSynchronize;
          }
          if (i.userProfile) {
            us.city = i.userProfile.city;
            us.countryOrRegion = i.userProfile.countryOrRegion;
            us.department = i.userProfile.department;
            us.faxNumber = i.userProfile.faxNumber;
            us.jobTitle = i.userProfile.jobTitle;
            us.mobilePhone = i.userProfile.mobilePhone;
            us.office = i.userProfile.office;
            us.officePhone = i.userProfile.officePhone;
            us.stateOrProvince = i.userProfile.stateOrProvince;
            us.streetAddress = i.userProfile.streetAddress;
            us.zipOrPostalCode = i.userProfile.zipOrPostalCode;
          }
          us.name = i.name;
          us.domain = i.domain;
          us.email = i.email;
          us.isDeleted = i.isDeleted;
          us.parentId = i.parentId;
          us.sequenceNumber = i.sequenceNumber;
          us.version = i.version;
          us.displayName = i.displayName;
          return us;
        });
        return this.setState({
          users: userItems,
          selectedMembers: userItems,
        });
      case TypePage.Groups:
        let groupItems = selectedItems.map((i) => {
          let gr = new BaseGroup();
          gr.id = i.guid;
          gr.name = i.name;
          gr.email = i.email;
          gr.isDeleted = i.isDeleted;
          gr.parentId = i.parentId;
          gr.sequenceNumber = i.sequenceNumber;
          gr.version = i.version;
          gr.description = i.description;
          gr.domain = i.domain;
          return gr;
        });
        return this.setState({
          groups: groupItems,
          selectedMembers: groupItems,
        });
      case TypePage.Resources:
        let resourceItems = selectedItems.map((i) => {
          let rs = new BaseResource();
          rs.id = i.guid;
          rs.name = i.name;
          rs.email = i.email;
          rs.description = i.description;
          rs.domain = i.domain;
          rs.capacity = i.capacity;
          rs.displayName = i.displayName;
          rs.resourceAdInfo = i.resourceAdInfo;
          rs.gallery = i.imageURLs;
          rs.timeZone = i.timeZone;
          rs.phone = i.phone;
          return rs;
        });
        return this.setState({
          resources: resourceItems,
          selectedMembers: resourceItems,
        });
      default:
        return;
    }
  };

  private _onHandleUpdateSignalRActionType = () => {
    if (this.props.OnUpdateSignalRActionType) {
      this.props.OnUpdateSignalRActionType();
    }
  };

  private _mapStringToTypePage = (str: string): TypePage => {
    switch (str) {
      case "resources":
        return TypePage.Resources;
      case "groups":
        return TypePage.Groups;
      default:
        return TypePage.Users;
    }
  };

  private _onHandleUpdateTypeSearch = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option) {
      let newType = this._mapStringToTypePage(String(option.key));
      this.setState(
        {
          type: newType,
          isLoading: this.state.text.trim() === "" ? false : true,
          typingTimeout: 0,
          // selectedMembers: [],
        },
        () => {
          if (this.state.isLoading && this.state.text.trim() !== "") {
            this.setState({ isLoading: false });
          }
        }
      );
    }
  };

  // private _onHandleUpdateConversationId = (id: string) => {
  //   if (this.props.onHandleConversationId) {
  //     this.props.onHandleConversationId(id);
  //   }
  // };

  private _onHandleUpdateCIdAndWorkflowId = (cId: string, workflowId: string) => {
    if(this.props.onHandleCidAndWorkflowId){
      this.props.onHandleCidAndWorkflowId(cId, workflowId);
    }
  }

  private _onHandleAddUserToGroup = (items: any[], id: string) => {
    let users = items.map((i) => {
      return i.id;
    });
    if (this.props.OnAddUserToGroup && this.props.group) {
      this.props
        .OnAddUserToGroup(users, id, this.props.group.id)
        .then((res) => {
          // this._onHandleUpdateConversationId(res.conversationId);
          this._onHandleUpdateCIdAndWorkflowId(res.conversationId, res.workflowId || "");
        });
    }
  };
  private _onHandleAddGroupToGroup = (items: any[], id: string) => {
    let groups = items.map((i) => {
      return i.id;
    });
    if (this.props.OnAddGroupToGroup && this.props.group) {
      this.props
        .OnAddGroupToGroup(groups, id, this.props.group.id)
        .then((res) => {
          // this._onHandleUpdateConversationId(res.conversationId);
          this._onHandleUpdateCIdAndWorkflowId(res.conversationId, res.workflowId || "");
        });
    }
  };
  private _onHandleAddResourceToGroup = (items: any[], id: string) => {
    let groups = items.map((i) => {
      return i.id;
    });
    if (this.props.OnAddResourceToGroup && this.props.group) {
      this.props
        .OnAddResourceToGroup(groups, id, this.props.group.id)
        .then((res) => {
          // this._onHandleUpdateConversationId(res.conversationId);
          this._onHandleUpdateCIdAndWorkflowId(res.conversationId, res.workflowId || "");
        });
    }
  };

  private _onHandleAddMember = () => {
    if(this.props.onReloadList) this.props.onReloadList(true);
    if (this.state.users.length > 0 && this.props.orgInfo) {
      this._onHandleAddUserToGroup(this.state.users, this.props.orgInfo.id);
    }
    if (this.state.groups.length > 0 && this.props.orgInfo) {
      this._onHandleAddGroupToGroup(this.state.groups, this.props.orgInfo.id);
    }
    if (this.state.resources.length > 0 && this.props.orgInfo) {
      this._onHandleAddResourceToGroup(
        this.state.resources,
        this.props.orgInfo.id
      );
    }
  };

  private _onHandleImportMember = async () => {
    await this._onHandleAddMember();
    this._onHandleUpdateSignalRActionType();
    if (
      this.props.UpdateSearchVisible &&
      this.state.selectedMembers.length > 0
    ) {
      this.props.UpdateSearchVisible();
    }
  };

  private _onHandleCancelSearch = () => {
    if (this.props.UpdateSearchVisible) {
      this.props.UpdateSearchVisible();
    }
  };

  private _mapIconByWorkingTab = (type: TypePage): string => {
    switch (type) {
      case TypePage.Users:
        return "Contact";
      case TypePage.Resources:
        return "Product";
      case TypePage.Groups:
        return "Group";
      default:
        return "Contact";
    }
  };

  private _mapSearchTypeToAPI = (): string => {
    let crtType = this.state.type;
    switch (crtType) {
      case TypePage.Resources:
        let urlRs = `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}`;
        if (this.props.orgInfo) {
          urlRs = `${BuildURLWithTenantId(
            ApiFromOData.ODATA_API
          )}organizations('${this.props.orgInfo.id}')/resources`;
        }
        return urlRs;

      case TypePage.Groups:
        let urlGr = `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}`;
        if (this.props.orgInfo) {
          urlGr = `${BuildURLWithTenantId(
            ApiFromOData.ODATA_API
          )}organizations('${this.props.orgInfo.id}')/groups`;
        }
        return urlGr;

      default:
        let urlUs = `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}`;
        if (this.props.orgInfo) {
          urlUs = `${BuildURLWithTenantId(
            ApiFromOData.ODATA_API
          )}organizations('${this.props.orgInfo.id}')/users`;
        }
        return urlUs;
    }
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
      conversationId: "",
      visibleText: str || "",
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

  // onHandleBuildQueryByType = (state: IListStates): IListStates => {
  //   switch (this.state.type) {
  //     case TypePage.Groups:
  //       let newStateGroup = this._onHandleBuildLazyQueryGroup(state);
  //       return newStateGroup;

  //     default:
  //       let newStateUser = this._onHandleBuildLazyQueryUser(state);
  //       return newStateUser;
  //   }
  // };

  render() {
    let memberColumn = [
      {
        key: "NameCol",
        name: "Name",
        fieldName: "name",
        minWidth: 60,
        maxWidth: 160,
        priority: 1,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.name}</span>;
        },
      },
      {
        key: "EmailCol",
        name: "Email",
        fieldName: "email",
        minWidth: 60,
        maxWidth: 160,
        priority: 1,
        data: "string",
        onRender: (item: any) => {
          return <span>{item.email}</span>;
        },
      },
    ];

    let conditonSaveBtn =
      this.state.users.length > 0 ||
      this.state.groups.length > 0 ||
      this.state.resources.length > 0;

    return (
      <SearchWrapper
        theme={{
          theme: this.props.theme,
        }}
        className="MemberWrapper"
      >
        <SearchContentWrapper className="MemberContentWrapper">
          <div className="Member__action">
            <CommandBarButton
              onClick={this._onHandleImportMember}
              iconProps={IconGeneralProps.saveIcon}
              text="Save"
              rcName={`edt.save.${this.props.workingTab}`}
              darkMode={this.props.theme}
              type="Primary"
              className="action__btn"
              disabled={!conditonSaveBtn}
            />
            <CommandBarButton
              onClick={this._onHandleCancelSearch}
              iconProps={IconGeneralProps.cancelIcon}
              text="Cancel"
              rcName={`edt.cancel.${this.props.workingTab}`}
              darkMode={this.props.theme}
              className="action__btn"
            />
          </div>
          <SearchBoxWrapper
            className="SearchBoxWrapper"
            theme={this.props.theme}
          >
            <div className="searchBox__wrapper">
              <div className="searchBox">
                <span className="item_searchLabel">Search member</span>
                <SearchBox
                  rcName={`edt${
                    this.props.workingTab ? `.${this.props.workingTab}` : ""
                  }.members`}
                  darkMode={this.props.theme}
                  value={this.state.visibleText}
                  placeholder="Search"
                  id="search.box"
                  onChange={this.onSearchWhenStopTyping}
                  onBlur={() =>
                    this.setState({
                      visibleText: this.state.visibleText.trim(),
                    })
                  }
                />
              </div>
              <Dropdown
                label="Type"
                placeholder="Select filter"
                options={options}
                onChange={this._onHandleUpdateTypeSearch}
                darkMode={this.props.theme}
                styles={{ callout: { zIndex: 99 } }}
                rcName="edt.type.search"
                selectedKey={this.state.type}
              />
            </div>
          </SearchBoxWrapper>
          {this.state.isLoading ? (
            <LoadingSpinner
              darkMode={this.props.theme}
              rcName="member.search"
            />
          ) : this.state.text.trim() !== "" ? (
            <ListCustom
              rcName={`edt.${this.props.workingTab}.search.Members`}
              columns={memberColumn}
              isOffline={true}
              // isLoading={this.props.isHaveMessageSignalR}
              darkMode={this.props.theme}
              onGetSelectionItem={this._onHandUpdateState}
              iconName={this._mapIconByWorkingTab(this.state.type)}
              selectedItems={this.state.selectedMembers}
              queryClass={this._query}
              ref={this.Action}
              isFilterHidden
            />
          ) : null}
        </SearchContentWrapper>
      </SearchWrapper>
    );
  }
}

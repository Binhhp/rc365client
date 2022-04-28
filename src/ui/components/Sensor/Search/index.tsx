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
import { UserDto } from "src/common/classes/BaseUser";
import SearchBox from "aod-dependencies/SearchBox/CustomSearchBox";
// import { IDropdownOption } from "aod-dependencies/Dropdown/Dropdown.types";
import { LoadingSpinner } from "src/common/ui/Loading";
import buildQuery from "odata-query";
import { SignalRSearchUserResponse } from "src/services/interface/ISignalRManager";
import { SelectionMode } from "aod-dependencies/@uifabric/utilities/selection";
import { BuildRCAttribute, FetchDataFromServer } from "src/common/functions";
import { IsCanBeReload } from "src/services/implements/SignalRManager";

const rsCols = [
  {
    key: "NameRs",
    name: "Name",
    fieldName: "name",
    minWidth: 80,
    maxWidth: 250,
    priority: 1,
    data: "string",
    onRender: (item: any) => {
      return <span>{item.name}</span>;
    },
  },
  {
    key: "EmailRs",
    name: "Email",
    fieldName: "email",
    minWidth: 80,
    maxWidth: 500,
    priority: 2,
    data: "string",
    onRender: (item: any) => {
      return <span>{item.email}</span>;
    },
  },
];

const controllerCols = [
  {
    key: "resourceCl",
    name: "Resource",
    fieldName: "resourceName",
    minWidth: 80,
    maxWidth: 250,
    priority: 1,
    data: "string",
    onRender: (item: any) => {
      return <span>{item.resourceName}</span>;
    },
  },
  {
    key: "TimeZoneCl",
    name: "Time zone",
    fieldName: "timeZone",
    minWidth: 80,
    maxWidth: 500,
    priority: 2,
    data: "string",
    onRender: (item: any) => {
      return <span>{item.timeZone}</span>;
    },
  },
];

const sensorCols = [
  {
    key: "TypeSS",
    name: "Type",
    fieldName: "sensorType",
    minWidth: 80,
    maxWidth: 250,
    priority: 1,
    data: "string",
    onRender: (item: any) => {
      return <span>{item.sensorType}</span>;
    },
  },
  {
    key: "SensorId",
    name: "Sensor Id",
    fieldName: "sensorId",
    minWidth: 80,
    maxWidth: 500,
    priority: 2,
    data: "string",
    onRender: (item: any) => {
      return <span>{item.sensorId}</span>;
    },
  },
];

export default class Search extends React.Component<
  ISearchProps,
  ISearchStates
> {
  protected _query: DataListSource;
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ISearchProps) {
    super(props);
    this.state = {
      selectedItems: [],
      type: TypePage.Users,
      text: "",
      isLoading: false,
      typingTimeout: 0,
      conversationId: "",
      workflowId: "",
      errorMsg: "",
      visibleText: "",
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
      if (this.state.text.trim() !== "") {
        let filter = this._onHandleBuildFilterQueryString(this.state.text);
        endpointBuilded = buildQuery({ top, skip, filter });
      }
      let defaultURL = this._mapSearchTypeToAPI();
      let url =
        nextLink && nextLink !== ""
          ? `${defaultURL}${endpointBuilded}${
              endpoint ? `&${endpoint.split("?")[1]}` : ""
            }&$skiptoken=${nextLink}`
          : `${defaultURL}${endpointBuilded}${
              endpoint ? `&${endpoint.split("?")[1]}` : ""
            }`;
      if (this.props.orgId) {
        url = `${url}&organizationId=${this.props.orgId}`;
      }
      await FetchDataFromServer({ url: url }).then((res) => {
        if (res) {
          this._query.source = res.value;
        }
      });
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
    if (this.props.signalRData && isReload) {
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

    if (this.props.errorMsg && this.props.errorMsg !== prevProps.errorMsg) {
      this.setState({ errorMsg: this.props.errorMsg });
    }
  }

  private _onHandleBuildFilterQueryString = (str: string): string[] => {
    switch (this.props.typeSearch) {
      case "resource":
      case "controller":
        return [`contains(tolower(name),tolower('${str}'))`];
      case "sensor":
        return [`contains(tolower(sensorType),tolower('${str}'))`];
      default:
        return [];
    }
  };

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
    if (this.state.conversationId !== "" || this.state.workflowId !== "") {
      this.setState({ workflowId: "", conversationId: "" });
    }
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
    this.setState(
      {
        selectedItems: selectedItems,
      },
      () => this.props.OnGetSelectedItems(selectedItems)
    );
  };

  // private _onHandleUpdateSignalRActionType = () => {
  //   if (this.props.OnUpdateSignalRActionType) {
  //     this.props.OnUpdateSignalRActionType();
  //   }
  // };

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

  // private _onHandleUpdateTypeSearch = (
  //   event: React.FormEvent<HTMLDivElement>,
  //   option?: IDropdownOption,
  //   index?: number
  // ) => {
  //   if (option) {
  //     let newType = this._mapStringToTypePage(String(option.key));
  //     this.setState(
  //       {
  //         type: newType,
  //         isLoading: this.state.text.trim() === "" ? false : true,
  //         typingTimeout: 0,
  //         selectedItems: [],
  //       },
  //       () => {
  //         if (this.state.isLoading && this.state.text.trim() !== "") {
  //           this.setState({ isLoading: false });
  //         }
  //       }
  //     );
  //   }
  // };

  private _onHandleUpdateConversationId = (id: string) => {
    if (this.props.onHandleConversationId) {
      this.props.onHandleConversationId(id);
    }
  };

  // private _onHandleAddUserToGroup = (items: any[], id: string) => {
  //   let users = items.map((i) => {
  //     return i.id;
  //   });
  //   if (this.props.OnAddUserToGroup && this.props.group) {
  //     this.props
  //       .OnAddUserToGroup(users, id, this.props.group.id)
  //       .then((res) => {
  //         this._onHandleUpdateConversationId(res.conversationId);
  //       });
  //   }
  // };
  // private _onHandleAddGroupToGroup = (items: any[], id: string) => {
  //   let groups = items.map((i) => {
  //     return i.id;
  //   });
  //   if (this.props.OnAddGroupToGroup && this.props.group) {
  //     this.props
  //       .OnAddGroupToGroup(groups, id, this.props.group.id)
  //       .then((res) => {
  //         this._onHandleUpdateConversationId(res.conversationId);
  //       });
  //   }
  // };
  // private _onHandleAddResourceToGroup = (items: any[], id: string) => {
  //   let groups = items.map((i) => {
  //     return i.id;
  //   });
  //   if (this.props.OnAddResourceToGroup && this.props.group) {
  //     this.props
  //       .OnAddResourceToGroup(groups, id, this.props.group.id)
  //       .then((res) => {
  //         this._onHandleUpdateConversationId(res.conversationId);
  //       });
  //   }
  // };

  private _mapIconByTypeSearch = (): string => {
    switch (this.props.typeSearch) {
      case "sensor":
        return "HardDrive";
      case "controller":
        return "ConnectVirtualMachine";
      case "resource":
        return "RecruitmentManagement";
      default:
        return "";
    }
  };

  private _mapSearchTypeToAPI = (): string => {
    switch (this.props.typeSearch) {
      case "controller":
        let urlRs = `${BuildURLWithTenantId(
          ApiFromOData.ODATA_API
        )}controllers`;
        return urlRs;

      case "sensor":
        let urlGr = `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}sensors`;
        return urlGr;

      case "resource":
        let urlUs = `${BuildURLWithTenantId(ApiFromOData.ODATA_API)}resources`;
        if (this.props.orgId) {
          urlUs = `${BuildURLWithTenantId(
            ApiFromOData.ODATA_API
          )}organizations('${this.props.orgId}')/resources`;
        }
        return urlUs;

      default:
        return "";
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

  BuilColumnByTypeSearch = () => {
    switch (this.props.typeSearch) {
      case "sensor":
        return sensorCols;
      case "resource":
        return rsCols;
      case "controller":
        return controllerCols;
      default:
        return [];
    }
  };

  render() {
    let idErrorMsg = BuildRCAttribute("errMsg.search");

    return (
      <SearchWrapper
        theme={{
          theme: this.props.theme,
        }}
        className="SearchWrapper"
      >
        <SearchContentWrapper className="SearchContentWrapper">
          <SearchBoxWrapper
            className="SearchBoxWrapper"
            theme={this.props.theme}
          >
            <span className="item_searchLabel">
              Search {this.props.typeSearch}{" "}
              <span className="isRequired">
                {this.props.isRequired ? "*" : ""}
              </span>
            </span>
            <SearchBox
              rcName={`search${
                this.props.typeSearch ? `.${this.props.typeSearch}` : ""
              }`}
              darkMode={this.props.theme}
              placeholder="Search"
              id="search.box"
              onChange={this.onSearchWhenStopTyping}
              required={this.props.isRequired}
              className={this.state.errorMsg.trim() !== "" ? "border__err" : ""}
              value={this.state.visibleText}
              onBlur={() =>
                this.setState({
                  visibleText: this.state.visibleText.trim(),
                })
              }
            />
            <span
              {...idErrorMsg}
              className={
                this.state.errorMsg.trim() !== ""
                  ? "error__msg"
                  : "error__msg d-none"
              }
            >
              {this.state.errorMsg}
            </span>
          </SearchBoxWrapper>
          {this.state.isLoading ? (
            <LoadingSpinner
              darkMode={this.props.theme}
              rcName="search.sensor"
            />
          ) : this.state.text.trim() !== "" ? (
            <ListCustom
              rcName={`search.${this.props.typeSearch}`}
              columns={this.BuilColumnByTypeSearch()}
              isOffline={false}
              // isLoading={this.props.isHaveMessageSignalR}
              darkMode={this.props.theme}
              onGetSelectionItem={this._onHandUpdateState}
              iconName={this._mapIconByTypeSearch()}
              selectedItems={this.state.selectedItems}
              queryClass={this._query}
              ref={this.Action}
              selectionMode={SelectionMode.single}
              isFilterHidden
            />
          ) : null}
        </SearchContentWrapper>
      </SearchWrapper>
    );
  }
}

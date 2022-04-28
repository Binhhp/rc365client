import Button from "aod-dependencies/Button";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import SearchBox from "aod-dependencies/SearchBox/CustomSearchBox";
import Toggle from "aod-dependencies/Toggle/CustomToggle";
import * as React from "react";
import { BaseUser } from "src/common/classes/BaseUser";
import { BuildRCAttribute, ValidateFunctions } from "src/common/functions";
import { IMinMaxLength } from "src/common/interfaces/IMinMaxLength";
import { IconGeneralProps } from "src/common/style";
import { TypeConfirm, TypeSearchList } from "src/entity/enums";
import Form from "src/ui/containers/Organization/Detail/FormUserContainer";
import SearchItem from "src/ui/containers/Organization/Detail/Tab/User/UsersSearchContainer";
import { CreateNewListState, CreateNewProps } from "./CreateModels";
import {
  CreateNewUsersWrapper,
  FormItem,
  FormListWrapper,
  InfomationWrapper,
  SearchingWrapper,
} from "./CreateStyle";

export default class CreateNewUser extends React.Component<
  CreateNewProps,
  CreateNewListState
> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: CreateNewProps) {
    super(props);
    this.state = {
      users: [],
      typingTimeout: 0,
      searchingText: "",
      visibleText: "",
      skipNumber: 0,
      selectedItems: [],
      isSearching: false,
      isSomeUsersAlreadyAdded: false,
      typeList: TypeSearchList.Searching,
      sourceItems: [],
      prevItems: [],
      removeItems: [],
      isHaveInvalid: false,
      numberImported: 0,
    };
    this.Action = React.createRef();
  }

  componentWillUnmount() {
    if (this.props.isWorking) {
      this._onUpdateWorkingUser();
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.workingUsers && this.props.workingUsers.length > 0) {
      this._onChageUserState(this.props.workingUsers);
    } else {
      this._onAddMoreUser();
    }
  }

  componentDidUpdate(prevProps: CreateNewProps) {
    if (
      this.props.workingUsers &&
      prevProps.workingUsers !== this.props.workingUsers
    ) {
      this._onChageUserState(this.props.workingUsers);
    }
  }

  componentDidMount() {
    let { workingUsers } = this.props;
    let searching = document.getElementById(
      "infomation-searching"
    )?.clientWidth;
    if (searching && workingUsers && workingUsers.length > 0) {
      this.setState({
        users: workingUsers,
        sourceItems: [...workingUsers, ...this.state.sourceItems],
      });
    }
    if (!searching && workingUsers && workingUsers.length > 0) {
      this.setState({
        users: workingUsers,
        sourceItems: [...workingUsers, ...this.state.sourceItems],
      });
    }
  }

  private _onUpdateWorkingUser = (users?: BaseUser[]) => {
    if (this.props.OnUpdateWorkingUsers) {
      let val =
        users && this.props.isWorking
          ? [...this.state.users, ...users]
          : users && !this.props.isWorking
          ? users
          : this.state.users;
      this.props.OnUpdateWorkingUsers(val);
    }
  };

  private _onChageUserState = (users: BaseUser[]) => {
    this.setState({ users }, () => this._onScrollToBottom());
  };

  private _onUpdateIsSearchPanel = (val?: boolean) => {
    let value = val ? val : !this.props.isSearchInPanel;
    if (this.props.OnUpdateIsSearchInPanel) {
      this.props.OnUpdateIsSearchInPanel(value);
    }
  };

  private _onAddMoreUser = () => {
    let currentUser = [...this.state.users];
    let defaultUser = new BaseUser();
    currentUser.push(defaultUser);
    this._onChageUserState(currentUser);
  };

  private _onRemoveItemConfirm = (index: number) => {
    let crtUsers = [...this.state.users];
    if (crtUsers.length === 1) {
      let defaultUser = new BaseUser();
      this.setState({ users: [defaultUser] });
      this._onHandleUpdateWorkingStatus(false);
    }
    if (crtUsers.length > 1) {
      crtUsers.splice(index, 1);
      this._onChageUserState(crtUsers);
    }
  };

  private _onHandleUpdateWorkingStatus = (value: boolean) => {
    if (this.props.isWorking !== value && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(value);
    }
  };

  private _onScrollToBottom = () => {
    let fromList = document.getElementById("fromList-user");
    if (fromList) {
      fromList.scrollTop = fromList.scrollHeight;
    }
  };

  private _onHandleEditData = (user: BaseUser, index?: number) => {
    let crtUsers = [...this.state.users];
    if (index !== undefined && crtUsers.length > index) {
      crtUsers[index] = user;
      this.setState({
        users: crtUsers,
      });
    }
  };

  private _onCheckIsHaveUserInvalid = (): boolean => {
    let crtUser = [...this.state.users];
    // const re =
    //   /^(([^<>(){}\[\]\\!#$%&*|^+=`~?,;:\s@"]+(\.[^<>()\[\]\\!#$%&*|^+=`~?,;:\s@"]+)*)|(".+"))$/;
    const fieldLenth: IMinMaxLength[] = [
      { key: "mobilePhone", max: 64 },
      { key: "email", max: 64 },
      { key: "zipOrPostalCode", max: 64 },
      { key: "faxNumber", max: 64 },
      { key: "department", max: 64 },
      { key: "office", max: 64 },
      { key: "streetAddress", max: 1024 },
      { key: "countryOrRegion", max: 128 },
      { key: "city", max: 128 },
      { key: "stateOrProvince", max: 128 },
      { key: "jobTitle", max: 128 },
      { key: "displayName", max: 65 },
    ];
    return crtUser.some((us) => {
      let user = new BaseUser(us);
      let isDublicated = ValidateFunctions.onValidateEmailAlreadyExist(
        user.email,
        this.state.users
      );
      let exceptKeys = undefined;
      if (user.mobilePhone.trim() === "") {
        exceptKeys = ["mobilePhone"];
      }
      let isInvalid = user.IsHaveInvalidLengthField(exceptKeys, fieldLenth);
      if (
        user.email === "" ||
        isInvalid ||
        user.name === "" ||
        user.displayName === "" ||
        // us.domain === "" ||
        !ValidateFunctions.onValidateIsEmail(String(user.email.trim())) ||
        isDublicated
      ) {
        return true;
      }
      return false;
    });
  };

  private _onUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType && this.props.confirmType !== type) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onUpdateUserEditToStore();
  };

  private _onFocusToFirstInvalidItem = async () => {
    let index: number | null = null;
    let crtUser = [...this.state.users];
    await crtUser.forEach((us, i) => {
      let isDublicated = ValidateFunctions.onValidateEmailAlreadyExist(
        us.email,
        this.state.users
      );
      let isValid = ValidateFunctions.onValidateIsEmail(us.email);
      if (
        (us.email === "" || us.name === "" || !isValid || isDublicated) &&
        index === null
      ) {
        index = i;
      }
    });
    if (index !== null) {
      if (crtUser[index].name === "") {
        let itemEmpty: HTMLElement = document.querySelectorAll(
          `[data-rc-id='txt.name.crUser.${index}']`
        )[0] as HTMLElement;
        if (itemEmpty) {
          return itemEmpty.focus();
        }
      }
      if (
        crtUser[index].email === "" ||
        !ValidateFunctions.onValidateIsEmail(crtUser[index].email) ||
        !ValidateFunctions.onValidateEmailAlreadyExist(
          crtUser[index].email,
          this.state.users
        )
      ) {
        let itemEmpty: HTMLElement = document.querySelectorAll(
          `[data-rc-id='txt.email.crUser.${index}']`
        )[0] as HTMLElement;
        if (itemEmpty) {
          return itemEmpty.focus();
        }
      }
    }
  };

  private _onHandleSubmitSearch = () => {
    if (
      this.state.typeList === TypeSearchList.Searching &&
      this.state.selectedItems.length > 0
    ) {
      this._onHandleSearchItemSaving();
      this.setState({ numberImported: this.state.numberImported + 1 });
    }
    if (
      this.state.typeList === TypeSearchList.Selected &&
      this.state.removeItems.length > 0
    ) {
      this.onHandleRemoveList();
    }
  };

  private _onFocusSearchBox = () => {
    let heigthList = document.getElementById("search-input")?.clientHeight;
    if (heigthList && this.state.skipNumber === 0) {
      let skip = Math.ceil(heigthList / 42) + 1;
      this.setState({ skipNumber: skip });
    }
  };

  private _FilterRemovedItems = (selectedItems: any[], prevItems: any[]) => {
    let crtSourceItems = [...this.state.sourceItems];
    if (
      this.state.sourceItems.length >= selectedItems.length &&
      selectedItems.length < prevItems.length
    ) {
      let missingItem = prevItems.filter(
        (i) => !selectedItems.some((item) => item.id === i.id)
      );
      if (missingItem.length > 0) {
        crtSourceItems = crtSourceItems.filter(
          (item) => !missingItem.some((i) => i.id === item.id)
        );
        return crtSourceItems;
      }
    }
    return crtSourceItems;
  };

  private _onHandleSelectedItemsAndPrev = (items: any[]) => {
    let crtSelected = [...this.state.selectedItems];
    let crtPrevItems = [...this.state.prevItems];
    let crtRemove = [...this.state.removeItems];
    let crtSourceItems = [...this.state.sourceItems];

    if (this.state.typeList === TypeSearchList.Selected) {
      crtRemove = [...items];
    }
    if (this.state.typeList === TypeSearchList.Searching) {
      // first
      if (
        this.state.selectedItems.length < 1 &&
        this.state.sourceItems.length < 1
      ) {
        crtSelected = items;
      } else if (
        this.state.selectedItems.length > 0 ||
        (this.state.selectedItems.length < 1 &&
          this.state.prevItems.length < 1 &&
          this.state.sourceItems.length > 0)
      ) {
        crtPrevItems = crtSelected;
        crtSelected = items;
        if (this.state.sourceItems.length > this.state.selectedItems.length) {
          crtSourceItems = this._FilterRemovedItems(crtSelected, crtPrevItems);
        }
      }
    }
    this.setState({
      selectedItems: crtSelected,
      prevItems: crtPrevItems,
      removeItems: crtRemove,
      sourceItems: crtSourceItems,
    });
  };

  private _HandleConcatSelectedAndSource = () => {
    let crtSelectedItems = [...this.state.selectedItems];
    let crtSources = [...this.state.sourceItems];
    if (crtSources.length < 1) {
      return crtSelectedItems;
    }
    if (crtSources.length > 0 && crtSelectedItems.length > 0) {
      crtSelectedItems.forEach((item) => {
        let index = crtSources.findIndex((i) => i.id === item.id);
        if (index === -1) {
          crtSources.push(item);
        }
      });
      return crtSources;
    }
    return crtSources;
  };

  onSentData = async () => {
    await this._onHandleGetDataForm();
    let isHaveInvalid = await this._onCheckIsHaveUserInvalid();
    if (isHaveInvalid) {
      this._onFocusToFirstInvalidItem();
      this.setState({ isHaveInvalid: !this.state.isHaveInvalid });
    }
    if (!isHaveInvalid) {
      this._onUpdateConfirmType(TypeConfirm.Review);
      this._onUpdateWorkingUser();
    }
  };

  onSearchUsers = async () => {
    await this.setState({
      searchingText: "",
      visibleText: "",
      removeItems: [],
      prevItems: [],
      selectedItems: [],
      sourceItems: [],
      typeList: TypeSearchList.Searching,
      isSomeUsersAlreadyAdded: false,
    });
    this._onUpdateIsSearchPanel();
  };

  _onSearchWhenStopTyping = (
    event?: React.ChangeEvent<HTMLInputElement>,
    str?: string
  ): void => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      isSearching: true,
      isSomeUsersAlreadyAdded: false,
      visibleText: str || "",
      typeList: TypeSearchList.Searching,
      typingTimeout: window.setTimeout(() => {
        let rs = this._HandleConcatSelectedAndSource();
        this.setState({
          isSearching: false,
          searchingText: str ? str.trim() : "",
          prevItems: [],
          selectedItems: [],
          sourceItems: rs,
        });
      }, 1000),
    });
  };

  onHandleRemoveList = () => {
    let currentSource = [...this.state.sourceItems];
    let sourceArray = currentSource.filter(
      (item) => !this.state.removeItems.some((i) => i.id === item.id)
    );
    this.setState({
      sourceItems: sourceArray,
      removeItems: [],
    });
  };

  _onHandleSearchItemSaving = async () => {
    let items = await this._HandleConcatSelectedAndSource();
    await this._onUpdateWorkingUser(items);
    await this.setState(
      {
        searchingText: "",
        prevItems: [],
        sourceItems: [],
        selectedItems: [],
      },
      () => this._onScrollToBottom()
    );
    this._onUpdateIsSearchPanel();
    this._onHandleUpdateWorkingStatus(true);
  };

  _onHandleChangeToggle = async (
    ev?: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ) => {
    if (checked) {
      let rs = this._HandleConcatSelectedAndSource();
      this.setState({
        typeList: TypeSearchList.Selected,
        isSomeUsersAlreadyAdded: false,
        prevItems: [],
        selectedItems: [],
        sourceItems: rs,
      });
    } else {
      this.setState({
        typeList: TypeSearchList.Searching,
        isSomeUsersAlreadyAdded: false,
        selectedItems: this.state.sourceItems,
        removeItems: [],
        sourceItems: this.state.sourceItems,
      });
    }
  };

  onHandleClearSearchText = () => {
    this.setState({
      isSearching: false,
      searchingText: "",
      visibleText: "",
    });
  };

  onHandleTrimSearchText = () => {
    setTimeout(() => {
      if (this.state.visibleText.trim() !== "") {
        this.setState({ visibleText: this.state.visibleText.trim() });
      }
    }, 0);
  };

  render() {
    let idWrapper = BuildRCAttribute(
      this.props.isSearchInPanel ? "pnl.users.search" : "pnl.users.form"
    );
    let idTextCount = BuildRCAttribute(
      `pnl.sp.users.${
        this.state.typeList === TypeSearchList.Searching ? "add" : "delete"
      }`
    );
    let idTypeList = BuildRCAttribute(`sp.user.${this.state.typeList}`);
    let idName = BuildRCAttribute(`sp.us.name`);
    return (
      <CreateNewUsersWrapper
        className="CreateNewUsersWrapper"
        {...idWrapper}
        theme={this.props.theme}
      >
        <InfomationWrapper
          className="InfomationWrapper"
          id="infomation-searching"
          theme={{
            theme: this.props.theme,
            isSomeUsersAlreadyAdded: this.state.isSomeUsersAlreadyAdded,
          }}
        >
          <h4 {...idName}>{this.props.organizationInfomation?.name}</h4>
          <div className="btn__actionGr">
            {this.props.isSearchInPanel ? (
              <Button
                className="search-save__btn"
                rcName={`${
                  this.state.typeList !== TypeSearchList.Searching
                    ? "Remove"
                    : "Import"
                }.crUser`}
                onClick={this._onHandleSubmitSearch}
                darkMode={this.props.theme}
                text={
                  this.state.typeList !== TypeSearchList.Searching
                    ? "Remove"
                    : "Import"
                }
                type="Primary"
                disabled={
                  (this.state.typeList === TypeSearchList.Searching &&
                    this.state.sourceItems.length +
                      this.state.selectedItems.length >
                      0) ||
                  (this.state.typeList === TypeSearchList.Selected &&
                    this.state.removeItems.length > 0)
                    ? false
                    : true
                }
              />
            ) : (
              <Button
                className="search-save__btn"
                rcName="Search.crUser"
                onClick={this.onSearchUsers}
                darkMode={this.props.theme}
                text="Search"
                type="Primary"
                icon="Search"
              />
            )}
            {this.props.isSearchInPanel && (
              <Button
                rcName="Cancel.crUser"
                text="Cancel"
                onClick={this.onSearchUsers}
                darkMode={this.props.theme}
              />
            )}
          </div>
        </InfomationWrapper>
        {this.state.isSomeUsersAlreadyAdded && (
          <span className="exist__message">
            Some users adding already exist
          </span>
        )}
        {this.props.isSearchInPanel ? (
          <SearchingWrapper
            className="SearchingWrapper"
            theme={this.props.theme}
          >
            <h3 className="item_searchTitle">Add users</h3>
            <span className="item_searchLabel">Search to add users</span>
            <SearchBox
              rcName="Search.crUser"
              onFocus={this._onFocusSearchBox}
              darkMode={this.props.theme}
              placeholder="Search"
              id="search-input"
              onChange={this._onSearchWhenStopTyping}
              disabled={
                this.state.typeList !== TypeSearchList.Searching ? true : false
              }
              onClear={this.onHandleClearSearchText}
              value={this.state.visibleText}
              onBlur={this.onHandleTrimSearchText}
            />
            <div className="search__infomation">
              {this.state.typeList === TypeSearchList.Searching ? (
                <span className="search__totalAdding" {...idTextCount}>
                  Adding (
                  {this.state.sourceItems.length < 0
                    ? this.state.selectedItems.length
                    : this._HandleConcatSelectedAndSource().length}
                  )
                </span>
              ) : (
                <span className="search__totalAdding" {...idTextCount}>
                  Delete ({this.state.removeItems.length})
                </span>
              )}
              <div className="search__action">
                <span {...idTypeList} className="search__listType">
                  {this.state.typeList}
                </span>
                <Toggle
                  onChange={this._onHandleChangeToggle}
                  darkMode={this.props.theme}
                  rcName="CrUser"
                  inlineLabel
                  checked={
                    this.state.typeList === TypeSearchList.Selected
                      ? true
                      : false
                  }
                />
              </div>
            </div>
            <div className="searchItems__list">
              {this.state.visibleText.trim() !== "" ? (
                <SearchItem
                  theme={this.props.theme}
                  typeSearch={this.state.typeList}
                  searchingText={this.state.searchingText}
                  orgInfo={this.props.organizationInfomation}
                  selectedItems={this.state.selectedItems}
                  sourceItems={this.state.sourceItems}
                  removeItems={this.state.removeItems}
                  signalRWorkflowId={this.props.signalRWorkflowId}
                  onHandleSelectedItems={this._onHandleSelectedItemsAndPrev}
                />
              ) : null}
            </div>
          </SearchingWrapper>
        ) : (
          <FormListWrapper
            className="FormListWrapper"
            id="fromList-user"
            theme={this.props.theme}
          >
            {this.state.users.map((item: BaseUser, index: number) => {
              return (
                <FormItem key={index} theme={this.props.theme}>
                  <Form
                    numberImported={this.state.numberImported}
                    rcName={`crUser.${index}`}
                    index={index}
                    workingUsers={this.state.users}
                    ref={this.Action}
                    OnGetFormData={this._onHandleEditData}
                    user={item}
                    isHaveInvalid={this.state.isHaveInvalid}
                    OnHandleRemove={this._onRemoveItemConfirm}
                  />
                  {this.state.users.length - 1 === index && (
                    <div className="btnAdd-user">
                      <CommandBarButton
                        onClick={this._onAddMoreUser}
                        iconProps={IconGeneralProps.addIcon}
                        darkMode={this.props.theme}
                        text="Add more"
                        rcName="AddMore.crUser"
                      />
                    </div>
                  )}
                </FormItem>
              );
            })}
          </FormListWrapper>
        )}
      </CreateNewUsersWrapper>
    );
  }
}

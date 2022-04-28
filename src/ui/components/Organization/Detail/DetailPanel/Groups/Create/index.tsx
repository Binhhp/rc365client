import * as React from "react";
import {
  CreateNewGroupWrapper,
  InfomationWrapper,
  FormItem,
  FormList,
  SearchingWrapper,
} from "./CreateStyle";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { CreateNewGroupProps, CreateNewGroupState } from "./CreateModels";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { IconGeneralProps } from "src/common/style";
import Form from "src/ui/containers/Organization/Detail/FormGroupContainer";
import { BuildRCAttribute, ValidateFunctions } from "src/common/functions";
import { TypeConfirm, TypeSearchList } from "src/entity/enums";
import Button from "aod-dependencies/Button";
import SearchBox from "aod-dependencies/SearchBox/CustomSearchBox";
import { LoadingSpinner } from "src/common/ui/Loading/LoadingSpinner";
import SearchItem from "src/ui/containers/Organization/Detail/Tab/Group/GroupSearchContainer";
import Toggle from "aod-dependencies/Toggle/CustomToggle";
import { IMinMaxLength } from "src/common/interfaces/IMinMaxLength";

export default class CreateNewGroup extends React.Component<
  CreateNewGroupProps,
  CreateNewGroupState
> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: CreateNewGroupProps) {
    super(props);
    this.state = {
      groups: [],
      isHaveInvalid: false,
      searchingText: "",
      visibleText: "",
      isSearching: false,
      isSomeResourceAlreadyAdded: false,
      typeList: TypeSearchList.Searching,
      selectedItems: [],
      sourceItems: [],
      removeItems: [],
      prevItems: [],
      typingTimeout: 0,
    };
    this.Action = React.createRef();
  }

  UNSAFE_componentWillMount() {
    if (this.props.workingGroups && this.props.workingGroups.length > 0) {
      this._onChangeGroupState(this.props.workingGroups);
    } else {
      this._onAddMoreUser();
    }
  }
  private _onAddMoreUser = () => {
    let crtGroups = [...this.state.groups];
    let group = new BaseGroup();
    crtGroups.push(group);
    this._onChangeGroupState(crtGroups);
  };
  private _onHandleUpdateWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };
  private _onScrollToBottom = () => {
    let fromList = document.getElementById("fromList-group");
    if (fromList) {
      fromList.scrollTop = fromList.scrollHeight;
    }
  };

  private _onHandleGetDataForm = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onUpdateGroupEditToStore();
  };

  private _onChangeGroupState = (groups: BaseGroup[]) => {
    this.setState({ groups }, () => this._onScrollToBottom());
  };

  private _onHandleEditData = (group: BaseGroup, index?: number) => {
    let crtGroups = [...this.state.groups];
    if (index !== undefined && crtGroups.length > index) {
      crtGroups[index] = group;
      this.setState({ groups: crtGroups });
      // if (this.props.OnUpdateWorkingGroups) {
      //   this.props.OnUpdateWorkingGroups(crtGroups);
      // }
    }
  };

  private _onFocusToFirstInvalidItem = async () => {
    let index: number | null = null;
    let crtUser = [...this.state.groups];
    await crtUser.forEach((us, i) => {
      let isDublicated = ValidateFunctions.onValidateEmailAlreadyExist(
        us.email,
        this.state.groups
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
          `[data-rc-id='txt.name.grp.${index}']`
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
          this.state.groups
        )
      ) {
        let itemEmpty: HTMLElement = document.querySelectorAll(
          `[data-rc-id='txt.email.grp.${index}']`
        )[0] as HTMLElement;
        if (itemEmpty) {
          return itemEmpty.focus();
        }
      }
    }
  };

  private _onHandleUpdateWorkingGroups = (groups?: BaseGroup[]) => {
    if (this.props.OnUpdateWorkingGroups) {
      let val =
        groups && this.props.isWorking
          ? [...this.state.groups, ...groups]
          : groups && !this.props.isWorking
          ? groups
          : this.state.groups;
      this.props.OnUpdateWorkingGroups(val);
    }
  };

  private _onCheckIsHaveGroupInvalid = (): boolean => {
    const fieldLenth: IMinMaxLength[] = [
      { key: "email", max: 64 },
      { key: "description", max: 1024 },
    ];
    // const re =
    //   /^(([^<>(){}\[\]\\!#$%&*|^+=`~?,;:\s@"]+(\.[^<>()\[\]\\!#$%&*|^+=`~?,;:\s@"]+)*)|(".+"))$/;
    return this.state.groups.some((gr) => {
      let isDublicated = ValidateFunctions.onValidateEmailAlreadyExist(
        gr.email,
        this.state.groups
      );
      let isInvalid = gr.IsHaveInvalidLengthField(undefined, fieldLenth);
      if (
        (gr.email.trim() !== "" &&
          !ValidateFunctions.onValidateIsEmail(String(gr.email.trim()))) ||
        (gr.email.trim() !== "" && isDublicated) ||
        isInvalid ||
        gr.name.trim() === ""
        // us.domain === "" ||
        // !ValidateFunctions.onValidateIsEmail(String(gr.email.trim())) ||
        // !re.test(String(us.email.trim())) ||
        // isDublicated
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

  private _compareWithPrev = (items: BaseGroup[]): BaseGroup[] => {
    let result = this.state.selectedItems.filter(
      (i) => !items.some((src) => i.id === src.id)
    );
    return result;
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

  private _onHandleSelectedItemsAndPrev = (items: any[]) => {
    let { typeList } = this.state;
    let crtSelected = [...this.state.selectedItems];
    let crtPrevItems = [...this.state.prevItems];
    let crtSource = [...this.state.sourceItems];
    if (typeList === TypeSearchList.Selected) {
      return this.setState({
        removeItems: items,
      });
    } else {
      // first
      if (crtSelected.length < 1 && crtSource.length < 1) {
        return this.setState({
          selectedItems: items,
        });
      } else if (
        //Toggle
        crtSelected.length === 0 &&
        crtPrevItems.length === 0 &&
        crtSource.length > 0
      ) {
        return this.setState({
          prevItems: items,
          selectedItems: items,
        });
      } else {
        //default
        let newSrc = [...crtSource];
        let rs = this._compareWithPrev(items);
        if (
          //remove item already added in source
          (crtPrevItems.length === 0 &&
            items.length < crtSelected.length &&
            items.length > 0) ||
          (items.length === 0 &&
            (crtPrevItems.length === 1 || crtSelected.length === 1)) ||
          (rs.length > 0 &&
            crtSource.length > 0 &&
            items.length < crtSelected.length &&
            items.length > 0)
        ) {
          newSrc = crtSource.filter((s) => !rs.some((r) => r.id === s.id));
        }
        return this.setState({
          prevItems: crtSelected,
          selectedItems: items,
          sourceItems: newSrc,
        });
      }
    }
  };

  private _onUpdateIsSearchPanel = (val?: boolean) => {
    let value = val ? val : !this.props.isSearchInPanel;
    if (this.props.OnUpdateIsSearchInPanel) {
      this.props.OnUpdateIsSearchInPanel(value);
    }
  };

  onSentData = async () => {
    await this._onHandleGetDataForm();
    let isHaveInvalid = this._onCheckIsHaveGroupInvalid();
    if (isHaveInvalid) {
      this._onFocusToFirstInvalidItem();
      this.setState({ isHaveInvalid: !this.state.isHaveInvalid });
    }
    if (!isHaveInvalid) {
      this._onUpdateConfirmType(TypeConfirm.Review);
      this._onHandleUpdateWorkingGroups();
    }
  };

  onAddMoreForm = () => {
    let crtGroups = [...this.state.groups];
    let group = new BaseGroup();
    crtGroups.push(group);
    this._onChangeGroupState(crtGroups);
  };

  onRemoveItemConfirm = (index: number) => {
    let crtGroups = [...this.state.groups];
    if (crtGroups.length === 1) {
      let defaultUser = new BaseGroup();
      this.setState({ groups: [defaultUser] });
      this._onHandleUpdateWorkingStatus(false);
    }
    if (crtGroups.length > 1) {
      crtGroups.splice(index, 1);
      this.setState({ groups: crtGroups });
    }
    this._onHandleUpdateWorkingGroups();
  };

  onHandleChangeToggle = async (
    ev?: React.MouseEvent<HTMLElement>,
    checked?: boolean
  ) => {
    if (checked) {
      let rs = this._HandleConcatSelectedAndSource();
      this.setState({
        typeList: TypeSearchList.Selected,
        isSomeResourceAlreadyAdded: false,
        prevItems: [],
        selectedItems: [],
        sourceItems: rs,
      });
    } else {
      this.setState({
        typeList: TypeSearchList.Searching,
        isSomeResourceAlreadyAdded: false,
        prevItems: [],
        selectedItems: [],
        sourceItems: this.state.sourceItems,
      });
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
      isSearching: true,
      visibleText: str || "",
      isSomeResourceAlreadyAdded: false,
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

  onSearchResource = async () => {
    await this.setState({
      searchingText: "",
      removeItems: [],
      prevItems: [],
      selectedItems: [],
      sourceItems: [],
      typeList: TypeSearchList.Searching,
      isSomeResourceAlreadyAdded: false,
    });
    this._onUpdateIsSearchPanel();
  };

  render() {
    let idName = BuildRCAttribute(`sp.gr.name`);
    let idWrapper = BuildRCAttribute(
      this.props.isSearchInPanel ? "pnl.groups.search" : "pnl.groups.form"
    );
    let idTextCount = BuildRCAttribute(
      `pnl.sp.groups.${
        this.state.typeList === TypeSearchList.Searching ? "add" : "delete"
      }`
    );
    let idTypeList = BuildRCAttribute(`sp.groups.${this.state.typeList}`);
    return (
      <CreateNewGroupWrapper
        className="CreateNewGroupWrapper"
        {...idWrapper}
        theme={this.props.theme}
      >
        <InfomationWrapper
          className="InfomationWrapper"
          theme={this.props.theme}
        >
          <h4 {...idName}>
            {this.props.organizationInfomation &&
              this.props.organizationInfomation.name}
          </h4>
          <div className="btn__actionGr">
            {this.props.isSearchInPanel ? (
              <Button
                className="search-save__btn"
                rcName={`${
                  this.state.typeList !== TypeSearchList.Searching
                    ? "Remove"
                    : "Import"
                }.grp`}
                // onClick={this._onHandleSubmitSearch}
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
                rcName="Search.grp"
                onClick={this.onSearchResource}
                darkMode={this.props.theme}
                text="Search"
                type="Primary"
                icon="Search"
              />
            )}
            {this.props.isSearchInPanel && (
              <Button
                rcName="Cancel.grp"
                text="Cancel"
                onClick={this.onSearchResource}
                darkMode={this.props.theme}
              />
            )}
          </div>
        </InfomationWrapper>
        {this.props.isSearchInPanel ? (
          <SearchingWrapper
            className="SearchingWrapper"
            theme={this.props.theme}
          >
            <h3 className="item_searchTitle">Add groups</h3>
            <span className="item_searchLabel">Search to add groups</span>
            <SearchBox
              rcName="Search.Group"
              darkMode={this.props.theme}
              placeholder="Search"
              id="search-input"
              onChange={this.onSearchWhenStopTyping}
              disabled={
                this.state.typeList !== TypeSearchList.Searching ? true : false
              }
              value={this.state.visibleText}
              onBlur={() =>
                this.setState({
                  visibleText: this.state.visibleText.trim(),
                })
              }
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
                  onChange={this.onHandleChangeToggle}
                  darkMode={this.props.theme}
                  rcName="Grp"
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
              {this.state.isSearching ? (
                <LoadingSpinner darkMode={this.props.theme} />
              ) : this.state.searchingText !== "" ||
                this.state.typeList === TypeSearchList.Selected ? (
                <SearchItem
                  theme={this.props.theme}
                  typeSearch={this.state.typeList}
                  searchingText={this.state.searchingText}
                  orgInfo={this.props.organizationInfomation}
                  selectedItems={this.state.selectedItems}
                  sourceItems={this.state.sourceItems}
                  removeItems={this.state.removeItems}
                  onHandleSelectedItems={this._onHandleSelectedItemsAndPrev}
                />
              ) : null}
            </div>
          </SearchingWrapper>
        ) : (
          <FormList
            className="FormList"
            id="fromList-group"
            theme={this.props.theme}
          >
            {this.state.groups.map((item, index) => {
              return (
                <FormItem key={index} theme={this.props.theme}>
                  <Form
                    index={index}
                    rcName={`grp.${index}`}
                    group={item}
                    workingGroups={this.state.groups}
                    OnHandleRemove={this.onRemoveItemConfirm}
                    ref={this.Action}
                    isHaveInvalid={this.state.isHaveInvalid}
                    OnGetFormData={this._onHandleEditData}
                  />
                  {this.state.groups.length - 1 === index && (
                    <div className="btnAdd-group">
                      <CommandBarButton
                        onClick={() => this.onAddMoreForm()}
                        iconProps={IconGeneralProps.addIcon}
                        darkMode={this.props.theme}
                        text="Add more"
                        rcName="AddMore.crtGroup"
                      />
                    </div>
                  )}
                </FormItem>
              );
            })}
          </FormList>
        )}
      </CreateNewGroupWrapper>
    );
  }
}

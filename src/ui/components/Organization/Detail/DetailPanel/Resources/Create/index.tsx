import Button from "aod-dependencies/Button";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import SearchBox from "aod-dependencies/SearchBox/CustomSearchBox";
import Toggle from "aod-dependencies/Toggle/CustomToggle";
import * as React from "react";
import { BaseResource } from "src/common/classes/BaseResource";
import { BuildRCAttribute, ValidateFunctions } from "src/common/functions";
import { IMinMaxLength } from "src/common/interfaces/IMinMaxLength";
import { IconGeneralProps } from "src/common/style";
import {
  TypeConfirm,
  TypeResourceForm,
  TypeSearchList,
} from "src/entity/enums";
import Form from "src/ui/containers/Organization/Detail/FormResourceContainer";
import SearchItem from "src/ui/containers/Organization/Detail/Tab/Resource/ResourceSearchContainer";
import { ICreateResourceProps, ICreateResourceState } from "./CreateModels";
import {
  CreateResourceWrapper,
  FormListWrapper,
  SearchingWrapper,
} from "./CreateStyle";

export default class CreateResource extends React.Component<
  ICreateResourceProps,
  ICreateResourceState
> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ICreateResourceProps) {
    super(props);
    this.Action = React.createRef();
    this.state = {
      searchingText: "",
      visibleText: "",
      isHaveInvalid: false,
      isSearching: false,
      isSomeResourceAlreadyAdded: false,
      typeList: TypeSearchList.Searching,
      selectedItems: [],
      sourceItems: [],
      removeItems: [],
      prevItems: [],
      typingTimeout: 0,
      numberImported: 0,
    };
  }

  componentWillUnmount() {
    if (this.props.OnUpdateWorkingResource && this.props.workingResources) {
      this.props.OnUpdateWorkingResource(this.props.workingResources);
    }
  }

  UNSAFE_componentWillMount() {
    if (this.props.workingResources && this.props.workingResources.length < 1) {
      let rs = new BaseResource();
      this._onUpdateWorkingResources([rs]);
    }
  }

  private _onScrollToBottom = () => {
    let fromList = document.getElementById("fromList-resource");
    if (fromList) {
      fromList.scrollTop = fromList.scrollHeight;
    }
  };

  private _onCallActionUpdateEditResource = async (type?: TypeConfirm) => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onUpdateResourceStore();
  };

  private _onUpdateWorkingResources = (rs: BaseResource[]) => {
    if (this.props.OnUpdateWorkingResource && rs.length > 0) {
      this.props.OnUpdateWorkingResource(rs);
    }
  };
  private _onUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onFocusToFirstInvalidItem = async () => {
    let index: number | null = null;
    let crtResource = this.props.workingResources
      ? [...this.props.workingResources]
      : [];
    await crtResource.forEach((us, i) => {
      let isDublicated = ValidateFunctions.onValidateEmailAlreadyExist(
        us.email,
        crtResource
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
      if (crtResource[index].name === "") {
        let itemEmpty: HTMLElement = document.querySelectorAll(
          `[data-rc-id='txt.name.${index}']`
        )[0] as HTMLElement;
        if (itemEmpty) {
          return itemEmpty.focus();
        }
      }
      if (
        crtResource[index].email === "" ||
        !ValidateFunctions.onValidateIsEmail(crtResource[index].email) ||
        !ValidateFunctions.onValidateEmailAlreadyExist(
          crtResource[index].email,
          crtResource
        )
      ) {
        let itemEmpty: HTMLElement = document.querySelectorAll(
          `[data-rc-id='txt.email.${index}']`
        )[0] as HTMLElement;
        if (itemEmpty) {
          return itemEmpty.focus();
        }
      }
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

  private _onUpdateIsSearchPanel = (val?: boolean) => {
    let value = val ? val : !this.props.isSearchInPanel;
    if (this.props.OnUpdateIsSearchInPanel) {
      this.props.OnUpdateIsSearchInPanel(value);
    }
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

  private _onHandleSearchItemSaving = async () => {
    let items = await this._HandleConcatSelectedAndSource();
    await this._onUpdateWorkingResources(items);
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
    this.onUpdateWorkingStatus(true);
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

  onHandleRemoveList = () => {
    let currentSource = [...this.state.sourceItems];
    let sourceArray = currentSource.filter(
      (item) => !this.state.removeItems.includes(item)
    );
    let currentSelected = [...this.state.selectedItems];
    let selectedArr = currentSelected.filter(
      (item) => !this.state.removeItems.includes(item)
    );
    this.setState({
      sourceItems: sourceArray,
      selectedItems: selectedArr,
      removeItems: [],
    });
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
      isSomeResourceAlreadyAdded: false,
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

  onSearchResource = async () => {
    await this.setState({
      searchingText: "",
      visibleText: "",
      removeItems: [],
      prevItems: [],
      selectedItems: [],
      sourceItems: [],
      typeList: TypeSearchList.Searching,
      isSomeResourceAlreadyAdded: false,
    });
    this._onUpdateIsSearchPanel();
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
        prevItems: this.state.sourceItems,
        selectedItems: this.state.sourceItems,
        removeItems: [],
        sourceItems: this.state.sourceItems,
      });
    }
  };

  onUpdateWorkingStatus = (val: boolean) => {
    if (this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  onHandleAddMoreResource = async () => {
    let crtResources = this.props.workingResources
      ? [...this.props.workingResources]
      : [];
    let rs = new BaseResource();
    crtResources.push(rs);
    await this._onUpdateWorkingResources(crtResources);
    this._onScrollToBottom();
  };

  onSentData = async () => {
    this._onCallActionUpdateEditResource();
    let isHaveInvalidRs = await this.onHandleIsHaveErrorResource();
    if (isHaveInvalidRs) {
      this._onFocusToFirstInvalidItem();
      return this.setState({ isHaveInvalid: !this.state.isHaveInvalid });
    }
    if (!isHaveInvalidRs) {
      // let crtResources = this.props.workingResources
      // ? [...this.props.workingResources]
      // : [];
      return this._onUpdateConfirmType(TypeConfirm.Review);
      // this._onUpdateWorkingResources(crtResources)
    }
  };

  onHandleIsHaveErrorResource = () => {
    const fieldLength: IMinMaxLength[] = [
      { key: "phone", max: 16, min: 9 },
      { key: "email", max: 64 },
    ];
    let crtWorkingResource = this.props.workingResources
      ? [...this.props.workingResources]
      : [];
    let resources = crtWorkingResource.map((rs) => {
      let item = new BaseResource();
      item.email = rs.email;
      item.gallery = rs.gallery;
      item.id = rs.id;
      item.location = rs.location;
      item.maxDelivery = rs.maxDelivery;
      item.minHours = rs.minHours;
      item.minHoursMess = rs.minHoursMess;
      item.name = rs.name;
      item.phone = rs.phone;
      item.timeZone = rs.timeZone;
      item.capacity = rs.capacity;
      item.deadline = rs.deadline;
      item.deadlineMess = rs.deadlineMess;
      item.deadlineTime = rs.deadlineTime;
      item.department = rs.department;
      item.description = rs.description;
      item.displayName = rs.displayName;
      item.domain = rs.domain;
      return item;
    });
    return resources.some((rs) => {
      let isDublicated = ValidateFunctions.onValidateEmailAlreadyExist(
        rs.email,
        resources
      );
      let exceptKeys = ["deadlineMess", "minHoursMess"];
      if (rs.phone.trim() === "") {
        exceptKeys.push("phone");
      }
      let isInvalid = rs.IsHaveInvalidLengthField(exceptKeys, fieldLength);
      if (
        rs.email.trim() === "" ||
        isInvalid ||
        rs.name.trim() === "" ||
        rs.displayName.trim() === "" ||
        // rs.domain === "" ||
        isDublicated
      ) {
        return true;
      }
      return false;
    });
  };

  onHandleNewResource = (resource: BaseResource, index: number) => {
    let currentResources = this.props.workingResources
      ? [...this.props.workingResources]
      : [];
    currentResources.splice(index, 1, resource);
    this.props.OnGetDataResourcesFS &&
      this.props.OnGetDataResourcesFS(currentResources);
  };

  onHandleUpdateResources = (resource: BaseResource, index?: number) => {
    let crtResoures = this.props.workingResources
      ? [...this.props.workingResources]
      : [];
    if (index !== undefined && crtResoures.length > index) {
      crtResoures[index] = resource;
      this._onUpdateWorkingResources(crtResoures);
    }
  };

  onHandleRemoveResources = (index: number) => {
    let crtResources = this.props.workingResources
      ? [...this.props.workingResources]
      : [];
    if (crtResources.length === 1) {
      let rs = new BaseResource();
      this._onUpdateWorkingResources([rs]);
      this.onUpdateWorkingStatus(false);
    }
    if (crtResources.length > 1) {
      crtResources.splice(index, 1);
      this._onUpdateWorkingResources(crtResources);
    }
  };

  onHandleClearSearchText = () => {
    this.setState({
      isSearching: false,
      searchingText: "",
      visibleText: "",
      prevItems: [],
      selectedItems: [],
      sourceItems: [],
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
      this.props.isSearchInPanel ? "pnl.resources.search" : "pnl.resources.form"
    );
    let idTextCount = BuildRCAttribute(
      `pnl.sp.resources.${
        this.state.typeList === TypeSearchList.Searching ? "add" : "delete"
      }`
    );
    let idTypeList = BuildRCAttribute(`sp.resources.${this.state.typeList}`);
    let idRsName = BuildRCAttribute(`sp.rs.name`);
    return (
      <CreateResourceWrapper
        className="CreateResourceWrapper"
        {...idWrapper}
        theme={this.props.theme}
      >
        <div className="content__wrapper">
          <h4 {...idRsName}>
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
                }.crResource`}
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
                rcName="Search.crResource"
                onClick={this.onSearchResource}
                darkMode={this.props.theme}
                text="Search"
                type="Primary"
                icon="Search"
              />
            )}
            {this.props.isSearchInPanel && (
              <Button
                rcName="Cancel.crResource"
                text="Cancel"
                onClick={this.onSearchResource}
                darkMode={this.props.theme}
              />
            )}
          </div>
        </div>
        {this.props.isSearchInPanel ? (
          <SearchingWrapper
            className="SearchingWrapper"
            theme={this.props.theme}
          >
            <h3 className="item_searchTitle">Add resources</h3>
            <span className="item_searchLabel">Search to add resources</span>
            <SearchBox
              rcName="Search.crResource"
              darkMode={this.props.theme}
              placeholder="Search"
              id="search-input"
              onChange={this.onSearchWhenStopTyping}
              disabled={
                this.state.typeList !== TypeSearchList.Searching ? true : false
              }
              value={this.state.visibleText}
              onBlur={this.onHandleTrimSearchText}
              onClear={this.onHandleClearSearchText}
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
                  rcName="CrResource"
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
            id="fromList-resource"
            theme={{
              theme: this.props.theme,
              // isLoadingRegister: this.state.isLoadingRegister,
            }}
            className="FormListWrapper"
          >
            {this.props.workingResources &&
              this.props.workingResources.map((rs, index) => {
                return (
                  <div className="formList__item" key={index}>
                    <Form
                      numberImported={this.state.numberImported}
                      ref={this.Action}
                      rcName={`${index}`}
                      index={index}
                      //resource={rs}
                      type={TypeResourceForm.Full}
                      OnGetFormData={this.onHandleUpdateResources}
                      OnHandleRemove={this.onHandleRemoveResources}
                      isHaveInvalid={this.state.isHaveInvalid}
                    />
                    {this.props.workingResources &&
                      this.props.workingResources.length - 1 === index && (
                        <div className="btnAdd-resource">
                          <CommandBarButton
                            onClick={this.onHandleAddMoreResource}
                            iconProps={IconGeneralProps.addIcon}
                            darkMode={this.props.theme}
                            text="Add more"
                            rcName="addMore.resource"
                          />
                        </div>
                      )}
                  </div>
                );
              })}
          </FormListWrapper>
        )}
      </CreateResourceWrapper>
    );
  }
}

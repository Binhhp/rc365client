import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import { IContextualMenuItem } from "aod-dependencies/@uifabric/utilities";
import { DatePicker } from "aod-dependencies/DatePicker";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import Dropdown from "aod-dependencies/Dropdown/CustomDropdown";
import Picker from "aod-dependencies/MyPicker";
import { Separator } from "aod-dependencies/Separator";
import SpinButton from "aod-dependencies/SpinButton/CustomSpinButton";
import { IStackTokens, Stack } from "aod-dependencies/Stack";
import TextField from "aod-dependencies/TextField/CustomTextField";
import Tooltip from "aod-dependencies/Tooltip/CustomToolTip";
import * as React from "react";
import { BaseResource } from "src/common/classes/BaseResource";
import { DayPickerStrings } from "src/common/constants/Calendar";
import { NewErrorType } from "src/common/constants/ErrorTypes";
import { optionsCalendarSingle } from "src/common/constants/TimeConstants";
import { BuildRCAttribute, TimeFunction } from "src/common/functions";
import {
  ErrorFieldItem,
  FieldValidateFunctions,
  IRenderErrorMessageField,
  IValidateStringAndReturnErrors,
} from "src/common/functions/FieldValidate";
import {
  TypeOfError,
  TypeResourceForm,
  TypeSpinBtnFocus,
} from "src/entity/enums";
import { IDeadlineProps, IFormInputProps, IFormInputState } from "./FormModels";
import {
  FormInputWrapper,
  IconWrapper,
  InputWrapper,
  OrderConfiguarationWrapper,
  OrderInputWrapper,
  RenderDeadlineGroupWrapper,
} from "./FormStyle";

const stackTokens: IStackTokens = {
  childrenGap: 15,
};

const capacityMaximum = 50000;

const RenderDeadlineGroup = (props: IDeadlineProps) => {
  // handle function
  const onHandleSelectDate = (val: Date | { date: Date }[]): void => {
    if (!Array.isArray(val)) {
      props.onChangeResourceDataFieldTS("deadline", val.toLocaleDateString());
    }
  };

  const onHandleSelectTime = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option) {
      props.onChangeResourceDataFieldTS("deadlineTime", String(option.key));
    }
  };

  return (
    <RenderDeadlineGroupWrapper theme={props.theme}>
      <div className="group__input">
        <DatePicker
          strings={DayPickerStrings}
          firstWeekOfYear={1}
          showMonthPickerAsOverlay={true}
          showGoToToday={false}
          placeholder="Select a date..."
          ariaLabel="Select a date"
          darkMode={props.theme}
          rcName={`deadline.${props.rcName}`}
          value={
            props.resource.deadline
              ? new Date(props.resource.deadline)
              : undefined
          }
          calendarProps={{
            onSelectChanged: onHandleSelectDate,
            showGoToToday: false,
            autoNavigateOnSelection: false,
          }}
        />
        <span className="group__compartment"> ~ </span>
        <Dropdown
          rcName={`Time.${props.rcName}`}
          options={optionsCalendarSingle}
          darkMode={props.theme}
          placeholder="Time"
          styles={{
            callout: { zIndex: 1 },
            root: { width: "100px" },
            dropdown: { border: "none" },
          }}
          dropdownWidth={100}
          calloutProps={{ calloutMaxHeight: 300 }}
          selectedKey={
            props.resource.deadlineTime !== ""
              ? props.resource.deadlineTime
              : "none"
          }
          onChange={onHandleSelectTime}
        />
      </div>
    </RenderDeadlineGroupWrapper>
  );
};

export default class Form extends React.Component<
  IFormInputProps,
  IFormInputState
> {
  constructor(props: IFormInputProps) {
    super(props);
    this.state = {
      isExpandingOC: true,
      isCollapsed: false,
      resource: new BaseResource(),
      type: "",
      errors: [],
    };
  }

  UNSAFE_componentWillMount() {
    if (this.props.resource) {
      let resource = new BaseResource(this.props.resource);
      if (this.props.timeZones && this.props.resource.timeZone) {
        let tz = this.props.timeZones.find(
          (t) => t.key === this.props.resource.timeZone
        );
        if (tz) {
          resource.timeZone = tz.text;
        }
      }
      if (this.props.timeZones && !this.props.resource.timeZone) {
        let clientTimeZone = TimeFunction.GetClientTimeZone();
        let timeZone = this.props.timeZones.find((tz) =>
          tz.text.includes(clientTimeZone)
        );
        if (timeZone) {
          resource.timeZone = timeZone.text;
        }
      }
      let newExpandingOC =
        this.props.type === TypeResourceForm.Order ? false : true;
      this.setState({
        resource: resource,
        isExpandingOC: newExpandingOC,
      });
    }
  }

  async componentDidUpdate(prevProps: IFormInputProps) {
    console.log('prevProps', prevProps)
    let prevResource = JSON.stringify(prevProps.resource);
    let thisResource = JSON.stringify(this.props.resource);
    if (prevResource !== thisResource) {
      let resource = prevProps.resource.Clone();
      this.setState({ resource });
    }
    if (
      prevProps.workingResources &&
      prevProps.workingResources.length > 1 &&
      prevProps.index !== undefined
    ) {
      this._onCheckIsAlreadyExist(prevProps.workingResources);
    }
    if (this.props.isHaveInvalid !== prevProps.isHaveInvalid) {
      await this.FocusToFirstInvalidItemInEdit();
    }
    if (
      this.props.numberImported &&
      this.props.numberImported > 0 &&
      this.props.workingResources &&
      this.props.workingResources.length > 0
    ) {
      this.FocusToFirstInvalidItemInEdit(true);
    }
  }

  componentWillUnmount() {
    this._onGetFromData();
  }

  componentDidMount() {
    if (
      this.props.numberImported &&
      this.props.numberImported > 0 &&
      this.props.resource
    ) {
      this.FocusToFirstInvalidItemInEdit(true);
    }
  }

  FocusToFirstInvalidItemInEdit = async (isFocus: boolean = false) => {
    let crtErrors = [...this.state.errors];
    let fieldArr = [
      {
        key: "name",
        value: this.state.resource.name,
      },
      {
        key: "email",
        value: this.state.resource.email,
      },
      {
        key: "displayName",
        value: this.state.resource.displayName || "",
      },
    ];
    fieldArr.forEach((i) => {
      let err = this._onHandleErrorsCase(i.value, i.key);
      err.forEach((e) => {
        let idx = crtErrors.findIndex((ce) => ce.key === e.key);
        if (idx === -1) {
          crtErrors.push(e);
        } else {
          crtErrors.splice(idx, 1, e);
        }
      });
      this.setState({ errors: crtErrors });
    });
    if (crtErrors.length > 0) {
      let field: HTMLElement = document.querySelectorAll(
        `[data-rc-id='txt.${crtErrors[0].key}.${this.props.rcName}']`
      )[0] as HTMLElement;
      if (field && !isFocus) {
        return field.focus();
      }
    }
  };

  private _onSaveDataChanges = async (
    resource: BaseResource,
    errors?: TypeOfError[]
  ) => {
    // let crtErrors = [...this.state.errors];
    // if (errors) {
    //   crtErrors = [...crtErrors, ...errors];
    // }
    await this.setState({
      resource,
      // errors: crtErrors,
    });
    this._onHandleWorkingStatus(true);
    this._onGetFromData();
  };

  private _onCheckIsAlreadyExist = (resources: BaseResource[]) => {
    // let crtErrorList = [...this.state.errors];
    // let isExistArr = resources.filter(
    //   (us) =>
    //     us.email === this.state.resource.email &&
    //     this.state.resource.email.trim() !== ""
    // );
    // // let isExistArr = resources.filter(
    // //   (us) =>
    // //     `${us.email}@${us.domain}` ===
    // //       `${this.state.resource.email}@${this.state.resource.domain}` &&
    // //     this.state.resource.email.trim() !== ""
    // // );
    // let ExistIndex = crtErrorList.findIndex((er) => er === TypeOfError.Exist);
    // if (isExistArr.length > 1 && ExistIndex === -1) {
    //   let newErrorList = crtErrorList.filter(
    //     (er) =>
    //       ![
    //         TypeOfError.Email,
    //         TypeOfError.Choose,
    //         TypeOfError.Invalid,
    //       ].includes(er)
    //   );
    //   newErrorList.push(TypeOfError.Exist);
    //   this.setState({ errors: newErrorList });
    // }
    // if (isExistArr.length < 2 && ExistIndex !== -1) {
    //   crtErrorList.splice(ExistIndex, 1);
    //   this.setState({ errors: crtErrorList });
    // }
  };

  private _mapMaxMinLengthByKey = (key: string): number[] | undefined => {
    switch (key) {
      case "phone":
        return [16, 9];
      case "email":
        return [64, 0];
      case "office":
        return [64, 0];
      case "Capacity":
        return [50000, 0];
      default:
        return [];
    }
  };

  private _buildFieldMsgText = (type: string) => {
    let conditions = this._mapMaxMinLengthByKey(type);
    let obj: IRenderErrorMessageField = {
      key: type,
      base: this.state.resource,
      errors: this.state.errors,
      maxLength: conditions ? conditions[0] : undefined,
      minLength: conditions ? conditions[1] : undefined,
      existArray: this.props.workingResources,
    };
    return FieldValidateFunctions.RenderErrorMessageField(obj);
  };

  private _onHandleChangeStateForSpinBtn = async (
    type: TypeSpinBtnFocus,
    val?: number
  ) => {
    this._onHandleWorkingStatus(true);
    let currentResource = new BaseResource(this.state.resource);
    let value = val ? val : 0;
    currentResource.UpdateClassByKey(type, value);
    let err = this._onHandleErrorsCase(String(value), type);
    if (type === TypeSpinBtnFocus.MinHours && !val) {
      currentResource.minHoursMess = "";
    }
    await this.setState({ resource: currentResource, errors: err });
    this._onGetFromData();
  };

  private _onHandleWorkingStatus = (val: boolean) => {
    if (val !== this.props.isWorking && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _mapKeyFieldWithCheckTypes = (key: string): NewErrorType[] => {
    switch (key) {
      case "name":
        return [NewErrorType.Empty, NewErrorType.Length];
      case "displayName":
        return [NewErrorType.Empty, NewErrorType.Length];
      case "email":
        return [
          NewErrorType.Empty,
          NewErrorType.Email,
          NewErrorType.Exist,
          NewErrorType.Length,
        ];
      case "Capacity":
        return [NewErrorType.Max];
      default:
        return [NewErrorType.Length];
    }
  };

  private _onHandleErrorsCase = (
    str: string,
    key: string
  ): ErrorFieldItem[] => {
    let types = this._mapKeyFieldWithCheckTypes(key);
    let conditions = this._mapMaxMinLengthByKey(key);
    let obj: IValidateStringAndReturnErrors = {
      errors: this.state.errors,
      key,
      str,
      types,
      maxLength: conditions ? conditions[0] : undefined,
      minLength: conditions ? conditions[1] : undefined,
      existArray: this.props.workingResources,
    };
    return FieldValidateFunctions.ValidateStringAndReturnErrors(obj);
  };

  private _onChangeTextField = async (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtResource = new BaseResource(this.state.resource);
    let fieldVal = newValue ? newValue : "";
    this._onHandleWorkingStatus(true);
    if (newValue && nameInput !== null) {
      crtResource.UpdateClassByKey(nameInput, fieldVal);
      let err = this._onHandleErrorsCase(newValue, nameInput);
      await this.setState({ errors: err, resource: crtResource });
    }
    if (!newValue && nameInput !== null) {
      crtResource.UpdateClassByKey(nameInput, "");
      let err = this._onHandleErrorsCase("", nameInput);
      await this.setState({ errors: err, resource: crtResource });
    }
    this._onGetFromData();
  };

  private _onChangeExpandOC = () => {
    this.setState({
      isExpandingOC: !this.state.isExpandingOC,
    });
  };

  private _onCollapsedItem = () => {
    if (this.props.index !== undefined && this.props.workingResources) {
      this.setState({ isCollapsed: !this.state.isCollapsed });
    }
  };

  private _onHandleLocationField = (locationStr: string) => {
    let currentResource = new BaseResource(this.state.resource);
    currentResource.UpdateClassByKey("location", locationStr);
    this._onSaveDataChanges(currentResource);
  };

  private _onHandleDeadline = (key: string, value: string) => {
    let currentResource = new BaseResource(this.state.resource);
    currentResource.UpdateClassByKey(key, value);
    this._onSaveDataChanges(currentResource);
  };

  private _onGetFromData = () => {
    console.log('this.state.resource', this.state.resource)
    if (this.props.OnGetFormData) {
      this.props.OnGetFormData(this.state.resource, this.props.index);
    }
  };

  private _onRemoveItem = () => {
    if (
      this.props.index !== undefined &&
      this.props.workingResources &&
      this.props.OnHandleRemove
    ) {
      this.props.OnHandleRemove(this.props.index);
      if (this.props.workingResources.length === 1) {
        this.setState({ errors: [] });
      }
    }
  };

  private _onHandleTrimTextField = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtResource = new BaseResource(this.state.resource);
    if (nameInput !== null) {
      for (let [key, value] of Object.entries(crtResource)) {
        // crtResource.UpdateClassByKey(nameInput, value);
        if (key === `_${nameInput}` && typeof value === "string") {
          crtResource.UpdateClassByKey(nameInput, value.trim());
          this.setState({ resource: crtResource });
        }
      }
    }
  };

  onHandleSelectDropdown = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number,
    type?: string
  ) => {
    this._onHandleWorkingStatus(true);
    if (option) {
      let crtResource = this.state.resource.Clone() as BaseResource;
      if (type && type === "timeZone") {
        crtResource.timeZone = String(option.key);
      } else {
        crtResource.domain = String(option.key);
      }
      this.setState({ resource: crtResource }, () => {
        this._onGetFromData();
      });
    }
  };

  onUpdateResourceStore = (rs: BaseResource) => {
    this._onGetFromData();
  };

  onValidateSpin = (
    value: string,
    event?: React.SyntheticEvent<HTMLElement>,
    type?: TypeSpinBtnFocus
  ) => {
    let val = value ? Number(value) : 0;
    if (!isNaN(Number(value)) && type) {
      this._onHandleChangeStateForSpinBtn(
        type,
        val
        // val > capacityMaximum ? capacityMaximum : val
      );
    }
  };

  onDecrementSpin = (value: string, type?: TypeSpinBtnFocus): string | void => {
    if (value && !isNaN(Number(value)) && type) {
      let numberVal = Number(value) > 1 ? Number(value) - 1 : 0;
      this._onHandleChangeStateForSpinBtn(type, numberVal);
    }
  };

  onIncrementSpin = (value: string, type?: TypeSpinBtnFocus): string | void => {
    if (value && !isNaN(Number(value)) && type) {
      this._onHandleChangeStateForSpinBtn(type, Number(value) + 1);
    }
  };

  onHandlePickerVal = (str?: string) => {
    this._onHandleWorkingStatus(true);
    let crtResource = this.state.resource.Clone() as BaseResource;
    crtResource.timeZone = str ? str : "";
    this.setState({ resource: crtResource });
  };

  RenderTimezonePicker = () => {
    let opts: IContextualMenuItem[] = [];
    if (this.props.timeZones) {
      opts = this.props.timeZones.map((t) => {
        return {
          key: t.key,
          text: t.text,
          name: t.text,
        } as IContextualMenuItem;
      });
    }
    return (
      <Picker
        darkMode={this.props.theme}
        rcName="pik.timeZone"
        items={opts}
        inputProps={{
          placeholder: "Plance Holder",
          label: "Time Zone",
        }}
        onGetValueOfPicker={this.onHandlePickerVal}
        value={this.state.resource.timeZone}
        // errorMessage={this._onHandleBuildErrorMsgTextLocal("city")}
      />
    );
  };

  render() {
    let idDeadline = BuildRCAttribute(`lbl.deadLine.${this.props.rcName}`);
    let idMinHourAndDelivery = BuildRCAttribute(
      `lbl.delivery.${this.props.rcName}`
    );
    let idOrder = BuildRCAttribute(`sp.order.${this.props.rcName}`);
    let idGeneral = BuildRCAttribute(`sp.general.${this.props.rcName}`);
    return (
      <FormInputWrapper className="FormInputWrapper" theme={this.props.theme}>
        {this.props.index !== undefined && this.props.workingResources && (
          <div>
            <Separator
              styles={{
                content: {
                  color: this.props.theme === "dark" ? "#ffffff" : "#212121",
                  backgroundColor:
                    this.props.theme === "dark" ? "#333333" : "#ffffff",
                },
                root: {
                  selectors: {
                    ":before": {
                      backgroundColor:
                        this.props.theme === "dark" ? "#000000" : "#a6a6a6",
                    },
                  },
                },
              }}
              className="form__hr"
              rcName={`${this.props.rcName}`}
            >{`Resource ${this.props.index + 1}`}</Separator>
            <IconWrapper
              theme={{
                darkMode: this.props.theme,
                isCollapsed: this.state.isCollapsed,
              }}
              className="IconWrapper"
            >
              <Icon
                iconName={
                  this.state.isCollapsed ? `ChevronLeft` : `ChevronDown`
                }
                onClick={this._onCollapsedItem}
                rcName={`${
                  this.state.isCollapsed ? "collapsed" : "expanded"
                }.resource.${this.props.rcName}`}
              />
              <Icon
                onClick={this._onRemoveItem}
                iconName="Cancel"
                rcName={`close.resource.${this.props.rcName}`}
              />
            </IconWrapper>
          </div>
        )}
        {!this.state.isCollapsed && (
          <div className="ConfirmWrapper">
            {this.props.type !== TypeResourceForm.Order && (
              <InputWrapper
                className="InputWrapper"
                theme={{
                  darkMode: this.props.theme,
                  capacity: this.state.errors.some(
                    (er) => er.key === TypeSpinBtnFocus.Capacity
                  ),
                }}
              >
                <Stack horizontal tokens={stackTokens}>
                  <Stack.Item grow={3} className="stack__required">
                    <TextField
                      onChange={this._onChangeTextField}
                      name="name"
                      label="Name"
                      placeholder="Place Holder"
                      darkMode={this.props.theme}
                      value={this.state.resource.name}
                      rcName={`name.${this.props.rcName}`}
                      required
                      errorMessage={this._buildFieldMsgText("name")}
                      onBlur={this._onHandleTrimTextField}
                    />
                  </Stack.Item>
                  <Stack.Item grow={3} className="stack__required">
                    <TextField
                      onChange={this._onChangeTextField}
                      name="email"
                      label="Email"
                      placeholder="Place Holder"
                      darkMode={this.props.theme}
                      value={this.state.resource.email}
                      rcName={`email.${this.props.rcName}`}
                      required
                      errorMessage={this._buildFieldMsgText("email")}
                      onBlur={this._onHandleTrimTextField}
                      // onRenderSuffix={() => {
                      //   return (
                      //     <Dropdown
                      //       rcName={`domain.${this.props.rcName}`}
                      //       onChange={this.onHandleSelectDropdown}
                      //       placeholder="Domain"
                      //       options={this.props.domainOptions || []}
                      //       selectedKey={this.state.resource.domain}
                      //       styles={{
                      //         dropdown: { border: "none" },
                      //         title: {
                      //           borderRadius: 0,
                      //           fontWeight: "normal",
                      //           borderWidth: "1px",
                      //           border: "none",
                      //           background: "transparent",
                      //           color:
                      //             this.props.theme === ThemeEnums.Dark
                      //               ? "#ffffff !important"
                      //               : "#323130 !important",
                      //         },
                      //       }}
                      //       calloutProps={{
                      //         styles: { calloutMain: { width: "fit-content" } },
                      //       }}
                      //     />
                      //   );
                      // }}
                    />
                  </Stack.Item>
                </Stack>
                <Stack horizontal tokens={stackTokens}>
                  <Stack.Item grow={3} className="stack__required">
                    <TextField
                      onChange={this._onChangeTextField}
                      name="displayName"
                      label="Display Name"
                      placeholder="Place Holder"
                      darkMode={this.props.theme}
                      value={this.state.resource.displayName}
                      rcName={`displayName.${this.props.rcName}`}
                      required
                      errorMessage={this._buildFieldMsgText("displayName")}
                      onBlur={this._onHandleTrimTextField}
                    />
                  </Stack.Item>
                  <Stack.Item grow={3} className="stack__required">
                    {this.RenderTimezonePicker()}
                  </Stack.Item>
                </Stack>
                {/* <Stack horizontal tokens={stackTokens}>
                  <Stack.Item grow={3}>
                    <TextField
                      onChange={this._onChangeTextField}
                      name="phone"
                      label="Phone"
                      placeholder="Place Holder"
                      darkMode={this.props.theme}
                      value={this.state.resource.phone}
                      rcName={`phone.${this.props.rcName}`}
                      errorMessage={
                        this.state.rsErrors.some((e) => e === "invalid")
                          ? "Invalid phone number."
                          : undefined
                      }
                      onBlur={this._onHandleTrimTextField}
                    />
                  </Stack.Item>
                  <Stack.Item grow={3}>
                    <TextField
                      onChange={this._onChangeTextField}
                      name="department"
                      label="Department"
                      placeholder="Place Holder"
                      darkMode={this.props.theme}
                      value={this.state.resource.department}
                      rcName={`department.${this.props.rcName}`}
                      onBlur={this._onHandleTrimTextField}
                    />
                  </Stack.Item>
                </Stack> */}
                <Stack horizontal tokens={stackTokens}>
                  <Stack.Item className="stack__required" grow={3}>
                    {/* <LocationField
                      treeNode={toppingOptions}
                      onGetSeletedItemsTree={this._onHandleLocationField}
                      textFieldProps={{
                        label: "Location",
                        placeholder: "Place Holder",
                      }}
                      theme={this.props.theme}
                      rcName={`location.${this.props.rcName}`}
                    /> */}
                    <TextField
                      onChange={this._onChangeTextField}
                      name="phone"
                      label="Phone"
                      placeholder="Place Holder"
                      darkMode={this.props.theme}
                      value={this.state.resource.phone}
                      rcName={`phone.${this.props.rcName}`}
                      onBlur={this._onHandleTrimTextField}
                      errorMessage={this._buildFieldMsgText("phone")}
                    />
                  </Stack.Item>
                  <Stack.Item className="stack__required" grow={3}>
                    <SpinButton
                      label="Capacity"
                      darkMode={this.props.theme}
                      min={0}
                      max={capacityMaximum}
                      step={1}
                      styles={{
                        labelWrapper: { paddingBottom: "0 !important" },
                        input: { minWidth: "0", width: "100%" },
                      }}
                      value={String(this.state.resource.capacity) || "0"}
                      onValidate={(val, e) =>
                        this.onValidateSpin(val, e, TypeSpinBtnFocus.Capacity)
                      }
                      onDecrement={(val) =>
                        this.onDecrementSpin(val, TypeSpinBtnFocus.Capacity)
                      }
                      onIncrement={(val) =>
                        this.onIncrementSpin(val, TypeSpinBtnFocus.Capacity)
                      }
                      placeholder="Place Holder"
                      className="form__spinBtn"
                      rcName={`capacity.${this.props.rcName}`}
                    />
                    {this.state.errors.some(
                      (er) => er.key === TypeSpinBtnFocus.Capacity
                    ) && (
                      <span className="error__span">
                        Capacity ranges from 0 to 50,000
                      </span>
                    )}
                  </Stack.Item>
                </Stack>
                {this.props.type === TypeResourceForm.Full && (
                  <div
                    className="OC__according"
                    {...idOrder}
                    onClick={this._onChangeExpandOC}
                  >
                    <Icon
                      className="OC__icon"
                      iconName={
                        this.state.isExpandingOC
                          ? "CalculatorAddition"
                          : "CalculatorSubtract"
                      }
                    />
                    <span className="OC__title" style={{ cursor: "pointer" }}>
                      Order Configuration
                    </span>
                  </div>
                )}
              </InputWrapper>
            )}

            {this.props.type !== TypeResourceForm.General && (
              <OrderConfiguarationWrapper
                className="OrderConfiguarationWrapper"
                theme={{
                  darkMode: this.props.theme,
                  isExpandingOC: this.state.isExpandingOC,
                }}
              >
                {!this.state.isExpandingOC && (
                  <OrderInputWrapper
                    className="OrderInputWrapper"
                    theme={this.props.theme}
                  >
                    <Stack
                      className="stack__groupInput"
                      horizontal
                      tokens={stackTokens}
                    >
                      <Stack.Item grow={3}>
                        <p
                          style={{
                            margin: "5px 0",
                            fontWeight: 600,
                          }}
                          {...idDeadline}
                        >
                          Deadline
                        </p>
                        <RenderDeadlineGroup
                          theme={this.props.theme}
                          onChangeResourceDataFieldTS={this._onHandleDeadline}
                          isWorking={this.props.isWorking}
                          resource={this.state.resource}
                          rcName={this.props.rcName}
                        />
                      </Stack.Item>
                      <Stack.Item grow={3}>
                        <p
                          style={{
                            margin: "5px 0",
                            fontWeight: 600,
                          }}
                          {...idMinHourAndDelivery}
                        >
                          MinHours & Max Delivery
                        </p>
                        <div className="group__input">
                          <Tooltip
                            content="Minimun Hours"
                            darkMode={this.props.theme}
                            rcName={`minHours.${this.props.rcName}`}
                          >
                            <SpinButton
                              darkMode={this.props.theme}
                              min={0}
                              step={1}
                              styles={{
                                labelWrapper: { paddingBottom: "0 !important" },
                                input: {
                                  minWidth: "0",
                                  width: "100%",
                                  border: "none",
                                },
                              }}
                              value={
                                this.state.resource.minHours
                                  ? String(this.state.resource.minHours)
                                  : "0"
                              }
                              placeholder="Place Holder"
                              className="form__spinBtn"
                              rcName={`minHours.${this.props.rcName}`}
                              onValidate={(val, e) =>
                                this.onValidateSpin(
                                  val,
                                  e,
                                  TypeSpinBtnFocus.MinHours
                                )
                              }
                              onDecrement={(val) =>
                                this.onDecrementSpin(
                                  val,
                                  TypeSpinBtnFocus.MinHours
                                )
                              }
                              onIncrement={(val) =>
                                this.onIncrementSpin(
                                  val,
                                  TypeSpinBtnFocus.MinHours
                                )
                              }
                            />
                          </Tooltip>
                          <span className="group__compartment"> ~ </span>
                          <Tooltip
                            content="Max Delivery"
                            darkMode={this.props.theme}
                            rcName={`maxDelivery.${this.props.rcName}`}
                          >
                            <SpinButton
                              darkMode={this.props.theme}
                              min={0}
                              step={1}
                              styles={{
                                labelWrapper: { paddingBottom: "0 !important" },
                                input: { minWidth: "0", width: "100%" },
                              }}
                              value={
                                this.state.resource.maxDelivery
                                  ? String(this.state.resource.maxDelivery)
                                  : "0"
                              }
                              onValidate={(val, e) =>
                                this.onValidateSpin(
                                  val,
                                  e,
                                  TypeSpinBtnFocus.MaxDelivery
                                )
                              }
                              onDecrement={(val) =>
                                this.onDecrementSpin(
                                  val,
                                  TypeSpinBtnFocus.MaxDelivery
                                )
                              }
                              onIncrement={(val) =>
                                this.onIncrementSpin(
                                  val,
                                  TypeSpinBtnFocus.MaxDelivery
                                )
                              }
                              placeholder="Place Holder"
                              className="form__spinBtn"
                              rcName={`maxDelivery.${this.props.rcName}`}
                            />
                          </Tooltip>
                        </div>
                      </Stack.Item>
                    </Stack>
                    <TextField
                      onChange={this._onChangeTextField}
                      name="deadlineMess"
                      multiline
                      rows={3}
                      label="Deadline Message"
                      darkMode={this.props.theme}
                      placeholder="Place Holder"
                      value={this.state.resource.deadlineMess}
                      rcName={`deadlineMessage.${this.props.rcName}`}
                      onBlur={this._onHandleTrimTextField}
                      disabled={
                        this.state.resource.deadline &&
                        this.state.resource.deadline.trim() === ""
                          ? true
                          : false
                      }
                    />
                    <TextField
                      onChange={this._onChangeTextField}
                      name="minHoursMess"
                      multiline
                      rows={3}
                      label="Minimum Hours Message"
                      darkMode={this.props.theme}
                      value={this.state.resource.minHoursMess}
                      placeholder="Place Holder"
                      rcName={`minHoursMess.${this.props.rcName}`}
                      onBlur={this._onHandleTrimTextField}
                      disabled={this.state.resource.minHours < 1}
                    />
                  </OrderInputWrapper>
                )}
              </OrderConfiguarationWrapper>
            )}
          </div>
        )}
      </FormInputWrapper>
    );
  }
}

import { Icon } from "aod-dependencies/@uifabric/icons";
import Button from "aod-dependencies/Button";
import TextField from "aod-dependencies/TextField/CustomTextField";
import * as React from "react";
import { BaseContext } from "src/common/classes/BaseContext";
import { BaseFeatureContextTenant } from "src/common/classes/BaseFeature";
import { NewErrorType } from "src/common/constants";
import { ValidatorJsonContext } from "src/common/contexts";
import {
  ErrorFieldItem,
  FieldValidateFunctions,
  IRenderErrorMessageField,
  IValidateStringAndReturnErrors,
  ValidatorJsonExpression,
  ValidatorJsonFile,
} from "src/common/functions/FieldValidate";
import { BuildRCAttribute } from "src/common/functions/RCAttribute";
import { IconGeneralProps } from "src/common/style";
import { ValidateJsonField } from "src/common/ui/LocationField/FieldStyle";
import { TypeConfirm } from "src/entity/enums";
import StorageTemplate from "src/ui/containers/Tenant/Feature/FeatureStorageTemplateContainer";
import { IWorkingStorageConfig } from "../StorageTemplate/StorageTemplateModel";
import { IConfigCommonProps, IConfigCommonStates } from "./ConfigModel";
import { ConfigCommonWrapper } from "./ConfigStyle";

class Editor extends React.Component<IConfigCommonProps, IConfigCommonStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: "",
      type: "",
      conversationId: "",
      isConfirm: false,
      confirmType: TypeConfirm.Null,
      workingItems: [],
      errors: [],
      loggingItem: null,
    };
  }

  componentWillUnmount() {
    // this._GetFieldEditorValue();
    this.context.update(new ValidatorJsonFile());
  }

  componentDidMount() {
    let values = this._IsHaveInitAndNotInitContexts();
    if (values.isHaveNotInit && !values.isHaveInit) {
      this.setState({ type: "Context" });
    }
  }

  private _onHandleClosePanel = () => {
    if (this.props.onHandleClosePanel) {
      this.props.onHandleClosePanel();
    }
  };

  private _onHandleCancelPanel = () => {
    if (this.props.isWorking) {
      this.setState({ isConfirm: true, confirmType: TypeConfirm.Cancel });
    }
    if (!this.props.isWorking) {
      this._onHandleClosePanel();
    }
  };

  private _onHandleUpdateWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onHandleUpdateConfigurationContexts = () => {
    let loggingConfiguration = this._onHandleConvertLoggingObjToString();
    let contextKeys: string[] = [];
    if (this.props.selectedContexts) {
      const seletedContextKeys: string[] = [...this.props.selectedContexts].map(
        (c) => {
          return String(c.contextKey);
        }
      );
      if (this.props.contextKeys) {
        contextKeys = [
          ...new Set([...seletedContextKeys, ...this.props.contextKeys]),
        ];
      }
    }
    if (this.props.workingTenant && this.props.onUpdateConfigurationContexts) {
      this.props.onUpdateConfigurationContexts(
        this.props.workingTenant.id,
        this.state.workingItems,
        contextKeys,
        loggingConfiguration
      );
    }
  };
  private _onHandleUpdateConfigurationFeatures = () => {
    if (
      this.props.selectedFeatures &&
      this.props.selectedFeatures.length > 0 &&
      this.props.workingTenant &&
      this.props.onUpdateConfigurationFeatures
    ) {
      // let inputValue = this._GetFieldEditorValue();
      this.props.onUpdateConfigurationFeatures(
        this.props.workingTenant.id,
        this.props.selectedFeatures,
        this.state.value
      );
    }
  };

  private _onHandleCallApiByType = () => {
    if (
      this.state.type === "Context" &&
      this.state.confirmType === TypeConfirm.Submit
    ) {
      this._onHandleUpdateConfigurationContexts();
    }
    if (
      this.state.type === "Feature" &&
      this.state.confirmType === TypeConfirm.Submit
    ) {
      this._onHandleUpdateConfigurationFeatures();
    }
  };

  private _onHandleConvertLoggingObjToString = () => {
    let str = "";
    if (this.state.loggingItem) {
      str = `Server=${
        this.state.loggingItem.Server ? this.state.loggingItem.Server : ""
      };Database=${
        this.state.loggingItem.Database ? this.state.loggingItem.Database : ""
      };User Id=${
        this.state.loggingItem.User ? this.state.loggingItem.User : ""
      };Password=${
        this.state.loggingItem.Password ? this.state.loggingItem.Password : ""
      }`;
    }
    return str;
  };

  private _IsHaveInitAndNotInitContexts = (): {
    isHaveInit: boolean;
    isHaveNotInit: boolean;
  } => {
    let isHaveInit = false;
    let isHaveNotInit = false;
    if (this.props.selectedContexts && this.props.selectedContexts.length > 0) {
      let crtSelectedContexts = [...this.props.selectedContexts];
      crtSelectedContexts.forEach((c) => {
        if (c.isInitialized) {
          isHaveInit = true;
        }
        if (!c.isInitialized) {
          isHaveNotInit = true;
        }
      });
    }
    return { isHaveInit, isHaveNotInit };
  };

  private _onHandleBuildErrorMsgTextLocal = (type: string) => {
    let base = {
      _Server: this.state.loggingItem?.Server || "",
      _Database: this.state.loggingItem?.Database || "",
      _User: this.state.loggingItem?.User || "",
      _Password: this.state.loggingItem?.Password || "",
    };
    let obj: IRenderErrorMessageField = {
      key: type,
      base: base,
      errors: this.state.errors,
    };
    return FieldValidateFunctions.RenderErrorMessageField(obj);
  };

  private _onHandleErrorsCase = (
    str: string,
    key: string,
    test?: ErrorFieldItem[]
  ): ErrorFieldItem[] => {
    let obj: IValidateStringAndReturnErrors = {
      errors: test ? test : this.state.errors,
      key,
      str,
      types: [NewErrorType.Empty, NewErrorType.Length],
    };
    return FieldValidateFunctions.ValidateStringAndReturnErrors(obj);
  };

  private _onHandleCheckIsHaveErrors = () => {
    let values = this._IsHaveInitAndNotInitContexts();
    if (
      Array.isArray(this.props.signalRData) &&
      this.props.signalRData.length > 0 &&
      this.state.type === "Context"
    ) {
      if (
        this.state.workingItems.length < 1 &&
        values.isHaveNotInit &&
        !values.isHaveInit
      ) {
        return true;
      }
    }
    if (this.state.type === "Feature" && this.state.value.trim() === "") {
      return true;
    }
    return false;
  };

  private _onHandleFocusIntoInvalidInput = () => {
    let crtErrors = [...this.state.errors];
    if (crtErrors.length > 0) {
      let itemEmpty: HTMLElement = document.querySelectorAll(
        `[data-rc-id='txt.logging.${crtErrors[0].key.toLowerCase()}']`
      )[0] as HTMLElement;
      if (itemEmpty) {
        return itemEmpty.focus();
      }
    }
  };

  private _onHandleCheckLoggingField = () => {
    let baseObj: any = {
      Server: this.state.loggingItem?.Server || "",
      Database: this.state.loggingItem?.Database || "",
      User: this.state.loggingItem?.User || "",
      Password: this.state.loggingItem?.Password || "",
    };
    let crtErrors: ErrorFieldItem[] = [];
    for (const key in baseObj) {
      let errors = this._onHandleErrorsCase(
        baseObj[key] as string,
        key,
        crtErrors
      );
      crtErrors = errors;
    }
    return this.setState({ errors: crtErrors });
  };

  private _IsHaveInvalidWorkingItem = (): boolean => {
    if (this.state.workingItems.length > 0) {
      return this.state.workingItems.some(
        (i) => !i.Server || !i.Database || !i.Password || !i.User
      );
    }
    return true;
  };

  onHandleChangeEditor = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    val?: string
  ) => {
    const defaultError = new ValidatorJsonFile();
    const resultValid = ValidatorJsonExpression.check(val as string);
    if (resultValid) {
      defaultError.set(resultValid, "Invalid json format");
      this.context.update(defaultError);
    } else {
      this.context.update(new ValidatorJsonFile());
    }
    this.setState({ value: val ? val : "" });
    this._onHandleUpdateWorkingStatus(true);
  };

  onSelectTypeConfiguration = (type: string) => {
    this.setState({ type });
  };

  onHandleSubmitPanel = async () => {
    let IsHaveErrors = this._onHandleCheckIsHaveErrors();
    if (this.props.isWorking && !IsHaveErrors) {
      this.setState({ isConfirm: true, confirmType: TypeConfirm.Submit });
    }
    if (this.props.isWorking && IsHaveErrors) {
      await this._onHandleCheckLoggingField();
      this._onHandleFocusIntoInvalidInput();
    }
  };

  onHandleBackToSelect = () => {
    if (this.props.isWorking) {
      this.setState({ isConfirm: true, confirmType: TypeConfirm.Leave });
    }
    if (!this.props.isWorking) {
      this.setState({ type: "", value: "" });
    }
  };

  onHandleNoConfirm = () => {
    this.setState({ isConfirm: false, confirmType: TypeConfirm.Null });
  };

  onHandleYesConfirm = () => {
    if (this.state.isConfirm && this.state.confirmType === TypeConfirm.Submit) {
      this._onHandleClosePanel();
      this._onHandleCallApiByType();
    }
    if (this.state.isConfirm && this.state.confirmType === TypeConfirm.Cancel) {
      this._onHandleClosePanel();
    }
    if (this.state.isConfirm && this.state.confirmType === TypeConfirm.Leave) {
      this.setState({
        value: "",
        confirmType: TypeConfirm.Null,
        isConfirm: false,
        type: "",
      });
    }
    this._onHandleUpdateWorkingStatus(false);
  };

  onHandleWorkingConfig = (items: IWorkingStorageConfig[]) => {
    this.setState({ workingItems: items });
  };

  onHandleChangeField = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    str?: string,
    type?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let item: any = this.state.loggingItem;
    this._onHandleUpdateWorkingStatus(true);
    if (!this.state.loggingItem) {
      item = {
        key: "logging",
        connectionString: "",
        contextKey: "",
      } as IWorkingStorageConfig;
    }
    if (nameInput !== null && item && type) {
      item[type] = str ? str : "";
      // let errors = this._onHandleErrorsCase(str ? str : "", nameInput);
      // this.setState({ loggingItem: item, errors });
      this.setState({ loggingItem: item });
    }
  };

  static contextType?: React.Context<any> | undefined = ValidatorJsonContext;
  RenderFeatureForm = () => {
    let idTitle = BuildRCAttribute(`sp.title.cm.udt`);
    let updateNumber = BuildRCAttribute(`sp.number.cm.udt`);
    const validator = this.context.state as ValidatorJsonFile;
    return (
      <div className="configuration__form">
        {this.RenderWorkingItems(true)}
        <div className="form__content">
          <h4 className="form__title">
            <span {...idTitle}>{this.state.type}</span>
            <span {...updateNumber}>{` (${
              this.props.selectedFeatures
                ? this.props.selectedFeatures.length
                : "0"
            })`}</span>
          </h4>
          <ValidateJsonField>{validator.errorMessage}</ValidateJsonField>
          <TextField
            rows={15}
            rowSpan={30}
            multiline
            id={`editor__field${this.props.sourceLogging ? "__logging" : ""}`}
            className="editor__field"
            darkMode={this.props.theme}
            rcName={"cm.udt"}
            onChange={this.onHandleChangeEditor}
            value={this.state.value}
            placeholder="Place Holder"
          />
        </div>
        <div className="form__footer">
          <div className="footer__left">
            <Button
              darkMode={this.props.theme}
              type="Primary"
              text="Update"
              disabled={this.props.isWorking ? validator.isValid : true}
              rcName={`update.cm.udt}`}
              onClick={this.onHandleSubmitPanel}
              className="m-r-15"
            />
            <Button
              darkMode={this.props.theme}
              text="Back"
              rcName={`back.cm.udt}`}
              onClick={() => this.setState({ type: "" })}
            />
          </div>
          <Button
            darkMode={this.props.theme}
            text="Cancel"
            rcName={`cancel.cm.udt}`}
            onClick={this._onHandleCancelPanel}
          />
        </div>
      </div>
    );
  };

  RenderContextStorageForm = (isDisabledBack?: boolean) => {
    let idTitle = BuildRCAttribute(`sp.title.cm.udt`);
    let updateNumber = BuildRCAttribute(`sp.number.cm.udt`);
    let isHaveInvalidItem = this._IsHaveInvalidWorkingItem();
    let disable = true;
    if (
      this.props.isWorking &&
      this.state.workingItems.length > 0 &&
      this.props.signalRData &&
      Array.isArray(this.props.signalRData) &&
      this.props.signalRData.length > 0 &&
      !isHaveInvalidItem
    ) {
      disable = false;
    }
    if (
      this.props.isWorking &&
      this.props.signalRData &&
      typeof this.props.signalRData === "object" &&
      Array.isArray(this.props.signalRData) &&
      this.props.signalRData.length < 1
    ) {
      disable = false;
    }
    if(this.state.errors.length === 0 && 
      this.state.workingItems && 
      this.state.workingItems.length > 0 &&
      !isHaveInvalidItem){
      disable = false;
    } 
    return (
      <div className="form__storage">
        <div style={{marginLeft: "20px"}}>{!isDisabledBack && this.RenderWorkingItems()}</div>
        <h4 className="form__title">
          <span {...idTitle}>{this.state.type}</span>
          <span {...updateNumber}>{` (${
            this.props.selectedContexts
              ? this.props.selectedContexts.length
              : "0"
          })`}</span>
        </h4>
        <p className="infomation__text">( Include some contexts required )</p>
        <StorageTemplate
          rcName={this.props.rcName}
          isMultiples
          workingStorageConfig={this.state.workingItems}
          onHandleWorkingStorageConfig={this.onHandleWorkingConfig}
        />
        <div className="form__footer">
          <div className="footer__left">
            <Button
              darkMode={this.props.theme}
              type="Primary"
              text="Update"
              disabled={disable}
              rcName={`update.cm.udt`}
              onClick={this.onHandleSubmitPanel}
              className="m-r-15"
            />
            {!isDisabledBack && (
              <Button
                darkMode={this.props.theme}
                text="Back"
                rcName={`back.cm.udt}`}
                onClick={this.onHandleBackToSelect}
              />
            )}
          </div>
          <Button
            darkMode={this.props.theme}
            text="Cancel"
            rcName={`cancel.cm.udt}`}
            onClick={this._onHandleCancelPanel}
          />
        </div>
      </div>
    );
  };

  RenderSelectTypeConfiguration = () => {
    let contextBlk = BuildRCAttribute(`blk.context`);
    let featureBlk = BuildRCAttribute(`blk.feature`);
    let conditionsFeature =
      !this.props.selectedFeatures ||
      (this.props.selectedFeatures && this.props.selectedFeatures.length < 1);
    let conditionsContext =
      !this.props.selectedContexts ||
      (this.props.selectedContexts && this.props.selectedContexts.length < 1);
    return (
      <div className="select__wrapper">
        <p className="select__title">Select common configuration type </p>
        <div className="select__content">
          <div
            className={`select__blk ${
              conditionsContext ? "is-disable-blk" : ""
            }`}
            onClick={
              !conditionsContext
                ? () => this.onSelectTypeConfiguration("Context")
                : undefined
            }
            {...contextBlk}
          >
            <h4>Context</h4>
            <Icon iconName={IconGeneralProps.contextIcon.iconName} />
          </div>
          <div
            {...featureBlk}
            className={`select__blk ${
              conditionsFeature ? "is-disable-blk" : ""
            }`}
            onClick={
              !conditionsFeature
                ? () => this.onSelectTypeConfiguration("Feature")
                : undefined
            }
          >
            <h4>Feature</h4>
            <Icon iconName={IconGeneralProps.featureIcon.iconName} />
          </div>
        </div>
      </div>
    );
  };

  RenderConfirmTitle = (): string => {
    switch (this.state.confirmType) {
      case TypeConfirm.Leave:
      case TypeConfirm.Cancel:
        return "Changes that you made may not be saved. \nMakes you sure you want to close?";
      case TypeConfirm.Submit:
        return `Are you sure want to save these configurations`;
      default:
        return "";
    }
  };

  RenderListByType = () => {
    let typeList = BuildRCAttribute(`sp.type.list.title`);
    if (
      this.state.type === "Context" &&
      this.props.selectedContexts &&
      this.state.confirmType === TypeConfirm.Submit
    ) {
      return (
        <div className="confirm__list">
          <h5
            {...typeList}
          >{`${this.state.type} (${this.props.selectedContexts.length})`}</h5>
          <ul className="list__wrapper">
            {this.props.selectedContexts.map((c: BaseContext, i: number) => {
              return (
                <li key={i} className="list__item">
                  {c.contextKey}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
    if (
      this.state.type === "Context" &&
      this.props.selectedFeatures &&
      this.state.confirmType === TypeConfirm.Submit
    ) {
      return (
        <div className="confirm__list">
          <h5
            {...typeList}
          >{`${this.state.type} (${this.props.selectedFeatures.length})`}</h5>
          <ul className="list__wrapper">
            {this.props.selectedFeatures.map(
              (c: BaseFeatureContextTenant, i: number) => {
                return (
                  <li key={i} className="list__item">
                    {c.featureName}
                  </li>
                );
              }
            )}
          </ul>
        </div>
      );
    }
  };

  RenderConfirmByType = () => {
    let confirmType = BuildRCAttribute(`sp.confirm.type`);
    return (
      <div className="confirm__content">
        <div className="confirm__mainContent">
          <h4 {...confirmType}>{this.RenderConfirmTitle()}</h4>
          {this.RenderListByType()}
        </div>
        <div className="confirm__footer">
          <Button
            darkMode={this.props.theme}
            type="Primary"
            text="Yes"
            rcName={`cfm.yes}`}
            onClick={this.onHandleYesConfirm}
            className="m-r-15"
          />
          <Button
            darkMode={this.props.theme}
            text="No"
            rcName={`cfm.no}`}
            onClick={this.onHandleNoConfirm}
          />
        </div>
      </div>
    );
  };

  RenderLoggingConfiguration = () => {
    let idTitle = BuildRCAttribute("sp.title.logging");
    return (
      <div className="logging__form">
        {this.RenderWorkingItems()}
        <h4 {...idTitle}>Logging Configuration</h4>
        <div className="storage__inputs">
          <TextField
            placeholder="Place holder"
            darkMode={this.props.theme}
            label="Server"
            name="Server"
            value={this.state.loggingItem?.Server}
            onChange={(e, str) => this.onHandleChangeField(e, str, "Server")}
            className="txt__item"
            rcName={`logging.server`}
            autoFocus
            // errorMessage={this._onHandleBuildErrorMsgTextLocal("Server")}
            // required
          />
          <TextField
            placeholder="Place holder"
            darkMode={this.props.theme}
            label="Database"
            name="Database"
            value={this.state.loggingItem?.Database}
            onChange={(e, str) => this.onHandleChangeField(e, str, "Database")}
            className="txt__item"
            rcName={`logging.database`}
            // errorMessage={this._onHandleBuildErrorMsgTextLocal("Database")}
            // required
          />
          <TextField
            placeholder="Place holder"
            darkMode={this.props.theme}
            label="User"
            name="User"
            value={this.state.loggingItem?.User}
            onChange={(e, str) => this.onHandleChangeField(e, str, "User")}
            className="txt__item"
            rcName={`logging.user`}
            // errorMessage={this._onHandleBuildErrorMsgTextLocal("User")}
            // required
          />
          <TextField
            placeholder="Place holder"
            darkMode={this.props.theme}
            label="Password"
            name="Password"
            type="password"
            value={this.state.loggingItem?.Password}
            onChange={(e, str) => this.onHandleChangeField(e, str, "Password")}
            className="txt__item"
            rcName={`logging.password`}
            // errorMessage={this._onHandleBuildErrorMsgTextLocal("Password")}
            // required
          />
        </div>
      </div>
    );
  };

  RenderContentPanel = () => {
    let values = this._IsHaveInitAndNotInitContexts();
    if (this.state.isConfirm) {
      return this.RenderConfirmByType();
    } else if (values.isHaveInit && values.isHaveNotInit) {
      return (
        <div className="blk__error">
          {this.RenderWorkingItems()}
          <h3>
            It is not possible to configure both the initialized and
            non-initialized contexts at the same time.
          </h3>
        </div>
      );
    } else if (values.isHaveInit && !values.isHaveNotInit) {
      if (this.state.type === "Feature") {
        return this.RenderFeatureForm();
      }
      if (this.state.type === "Context") {
        return this.RenderContextStorageForm();
      }
      return this.RenderSelectTypeConfiguration();
    } else {
      return (
        <>
          {this.RenderLoggingConfiguration()}
          {this.RenderContextStorageForm(true)}
        </>
      );
    }
  };

  RenderWorkingItems = (isFeature?: boolean) => {
    let items: any[] = [];
    let key = "";
    let idBlk = BuildRCAttribute("blk.WorkingItems");
    if (
      !isFeature &&
      this.props.selectedContexts &&
      this.props.selectedContexts.length > 0
    ) {
      key = "contextKey";
      items = [...this.props.selectedContexts];
    }
    if (
      isFeature &&
      this.props.selectedFeatures &&
      this.props.selectedFeatures.length > 0
    ) {
      key = "featureName";
      items = [...this.props.selectedFeatures];
    }
    let nameList = items.map((i: any) => {
      return i[key];
    });
    return (
      <div className="working__item" {...idBlk}>
          <span className="wi__title">Working Items: </span>
          <span className="wi__name">{nameList.join(", ")}</span>
        </div>  
    );
  };

  render() {
    return (
      <ConfigCommonWrapper
        theme={{
          darkMode: this.props.theme,
          withLogging: this.props.workingContext?.isInitialized,
        }}
        className="ConfigCommonWrapper"
      >
        <div className="panelWrapper">{this.RenderContentPanel()}</div>
      </ConfigCommonWrapper>
    );
  }
}

export default Editor;

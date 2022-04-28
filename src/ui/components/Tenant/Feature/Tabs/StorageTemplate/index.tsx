import { IDropdownOption } from "aod-dependencies/Dropdown";
import Dropdown from "aod-dependencies/Dropdown/CustomDropdown";
import TextField from "aod-dependencies/TextField/CustomTextField";
import * as React from "react";
import { BaseContext } from "src/common/classes/BaseContext";
import { ValidatorJsonContext } from "src/common/contexts";
import { BuildRCAttribute } from "src/common/functions";
import { ValidatorJsonFile } from "src/common/functions/FieldValidate";
import { LoadingSpinner } from "src/common/ui/Loading";
import { TypeConfirm } from "src/entity/enums";
import { ItemInMultipleContextRequest } from "src/repositories/request";
import {
  IStorageTemplateProps,
  IStorageTemplateStates,
  IWorkingStorageConfig,
} from "./StorageTemplateModel";
import {
  EmptyWrapper,
  LoadingWrapper,
  StorageTemplateWrapper,
} from "./StorageTemplateStyle";

class StorageTemplate extends React.Component<
  IStorageTemplateProps,
  IStorageTemplateStates
> {
  static contextType?: React.Context<any> | undefined = ValidatorJsonContext;
  constructor(props: IStorageTemplateProps) {
    super(props);
    this.state = {
      source: {},
      isInvalidJSON: false,
      isEmpty: false,
      opts: [],
      workingStorageConfig: [],
      selectedOpts: [],
      isLoading: false,
      cId: "",
      isLoadingDBDone: false,
    };
  }

  UNSAFE_componentWillMount() {
    if (
      this.props.isMultiples ||
      (!this.props.isMultiples &&
        this.props.signalRDB &&
        this.props.signalRDB.length < 1)
    ) {
      this._onHandleGetContextDatabase();
    }
  }

  componentDidMount() {
    this._onHandleFirstMount();
  }

  UNSAFE_componentWillReceiveProps(nextProps: IStorageTemplateProps) {
    if (this.props.workingContext !== nextProps.workingContext) {
      this._onHandleResetSignalRData();
      if (this.props.onHandleWorkingStorageConfig) {
        this.props.onHandleWorkingStorageConfig([]);
      }
      this.setState({
        source: {},
        isInvalidJSON: false,
        isEmpty: false,
        opts: [],
        workingStorageConfig: [],
        selectedOpts: [],
        isLoading: false,
        cId: "",
        isLoadingDBDone: false,
      });
      this.props.OnUpdateSignalRData([]);
      this.props.OnUpdateConversationId("");
      this._onHandleGetContextDatabase(nextProps.workingContext);
    }
  }

  componentDidUpdate(
    prevProps: IStorageTemplateProps,
    prevStates: IStorageTemplateStates
  ) {
    if (
      this.props.workingConfig !== prevProps.workingConfig ||
      this.props.sourceLogging !== prevProps.sourceLogging
    ) {
      this._onHandleFirstMount();
    }
    if (
      this.props.isPanelPageOpen &&
      this.props.isPanelPageOpen !== prevProps.isPanelPageOpen &&
      this.props.confirmType === TypeConfirm.Submit
    ) {
      this.onHandleUpdateConfig();
    }
    if (
      this.props.signalRData !== prevProps.signalRData &&
      this.props.signalRData
    ) {
      this._BuildFormByValue();
    }
    if (
      this.state.cId === this.props.signalRConversationId &&
      this.props.signalRData &&
      !this.props.isMultiples &&
      Array.isArray(this.props.signalRData) &&
      this.props.onHandleSignalRDB
    ) {
      if(this.props.signalRDB &&
        this.props.signalRDB.length < 1){
        this.props.onHandleSignalRDB(this.props.signalRData);
      }
    }
    if (this.state.isLoading) {
      this.setState({ isLoading: false });
    }
  }

  shouldComponentUpdate(
    nextProps: IStorageTemplateProps,
    nextStates: IStorageTemplateStates
  ) {
    if (
      (this.state.isLoadingDBDone && this.state === nextStates) ||
      (nextStates.isLoadingDBDone && this.state === nextStates)
    ) {
      return false;
    } else {
      return true;
    }
  }

  componentWillUnmount() {
    this.setState({ isLoadingDBDone: false });
    // this._onHandleResetSignalRData();
    // this.onHandleUpdateConfig();
    this.context.update(new ValidatorJsonFile());
  }

  private _onHandleResetSignalRData = () => {
    if (this.props.onHandleSignalRDB) {
      this.props.onHandleSignalRDB([]);
    }
  };

  private _onHandleGetContextDatabase = (workingContext?: BaseContext) => {
    if (
      this.props.OnGetContextDataBases &&
      this.props.workingTenant &&
      this.props.selectedContexts &&
      this.props.workingContext
    ) {
      let contextKeys = [...this.props.selectedContexts].map((c) => {
        return c.contextKey;
      });
      if (this.props.selectedContexts.length < 1) {
        if (workingContext) {
          contextKeys = [workingContext.contextKey];
        } else {
          contextKeys = [this.props.workingContext.contextKey];
        }
      }
      this.setState({ isLoading: true });
      this.props
        .OnGetContextDataBases(this.props.workingTenant.id, contextKeys)
        .then((res) => {
          if (res) {
            this.setState({
              cId: res.conversationId,
            });
          }
        })
        .catch((er) => this.setState({ isLoading: false }));
    }
  };

  private _onHandleSentWorkingStorageConfig = (
    arr?: IWorkingStorageConfig[]
  ) => {
    if (this.props.onHandleWorkingStorageConfig) {
      this.props.onHandleWorkingStorageConfig(
        arr ? arr : this.state.workingStorageConfig
      );
    }
  };

  private _onHandleworkingStorageConfigFromDetail = () => {
    if (this.props.workingStorageConfig) {
      this.setState({ workingStorageConfig: this.props.workingStorageConfig });
    }
  };

  private _onHandleFirstMount = async () => {
    await this._onHandleworkingStorageConfigFromDetail();
    // case using for update multiple contexts
    if (
      this.props.isMultiples ||
      (!this.props.isMultiples &&
        this.props.signalRDB &&
        this.props.signalRDB.length > 0)
    ) {
      this._BuildFormByValue();
    } else {
      if (this.props.sourceLogging && this.props.sourceLogging.trim() !== "") {
        this._onHandleJsonString(this.props.sourceLogging);
      } else if (
        this.props.workingConfig &&
        this.props.workingConfig.trim() !== "" &&
        this.props.sourceLogging === undefined
      ) {
        this._onHandleJsonString(this.props.workingConfig);
      } else {
        this.setState({ ...this.state, isEmpty: true });
      }
    }
  };

  private _BuildFormByValue = () => {
    let crtWorkingStorage = [...this.state.workingStorageConfig];
    let opts: IDropdownOption[] = [];
    if (
      (this.props.signalRData && Array.isArray(this.props.signalRData)) ||
      (!this.props.isMultiples &&
        this.props.signalRDB &&
        this.props.signalRDB.length > 0)
    ) {
      let data = [...this.props.signalRData];
      if (
        !this.props.isMultiples &&
        this.props.signalRDB &&
        this.props.signalRDB.length > 0
      ) {
        data = [...this.props.signalRDB];
        crtWorkingStorage = [];
      }
      opts = data.map((db) => {
        let idx = crtWorkingStorage.findIndex((s) => s.key === db.name);
        if (idx !== -1 && db.connectionString) {
          let item = this._onHandleConvertConnectionStringToArray(
            String(crtWorkingStorage[idx].key),
            db.connectionString,
            crtWorkingStorage[idx].contextKey,
            crtWorkingStorage[idx].featureKey
          );
          crtWorkingStorage.splice(idx, 1, item);
        }
        return {
          key: `${db.name}_${db.contextKey}`,
          text: `${db.name} (${db.contextKey})`,
          data: db.connectionString || "",
          name: db.contextKey,
          customData: db.name,
        } as IDropdownOption;
      });
    }
    if (crtWorkingStorage.length > 0 && opts.length > 0) {
      crtWorkingStorage.forEach((s) => {
        let idx = opts.findIndex((opt) => opt.key === s.key);
        if (idx === -1) {
          crtWorkingStorage = [];
        }
      });
    }
    let selectAllOpt: IDropdownOption = {
      key: "selectedAll__opt",
      text: "Select All",
    };
    opts.unshift(selectAllOpt);
    this.setState({ opts, workingStorageConfig: crtWorkingStorage });
  };

  private _onHandleJsonString = (str: string) => {
    let sourceStr = str.replaceAll("\\", "");
    try {
      let value = JSON.parse(sourceStr);
      let str = JSON.stringify(value, undefined, 4);
      let val = JSON.parse(str);
      this.setState({ source: val, isEmpty: false }, () =>
        this._BuildFormByValue()
      );
    } catch {
      this.setState({ isInvalidJSON: true, isEmpty: false });
    }
  };

  private _HandleChangeToSourceTab = () => {
    if (this.props.onHandleCurrentTab) {
      this.props.onHandleCurrentTab();
    }
  };

  private _onHandleConvertWorkingConfigToStringJson = (item: any) => {
    let result: string[] = [];
    for (const key in item) {
      if (
        !["key", "connectionString", "contextKey", "featureKey"].includes(key)
      ) {
        let str = `${key}=${item[key]}`;
        result.push(str);
      }
    }
    if (result.length > 0) {
      return result.join(";");
    }
    return "";
  };

  private _onHandleUpdateSourceWithWorkingParameters = (): string => {
    let crtSource = { ...this.state.source };
    let crtWorkingConfig = [...this.state.workingStorageConfig];
    if (
      crtSource.Databases &&
      Array.isArray(crtSource.Databases) &&
      !this.props.isMultiples
    ) {
      let crtParameters = [...this.state.workingStorageConfig];
      let rs = crtSource.Databases.map((db: any) => {
        let idx = crtParameters.findIndex((p) => p.key === db.Name);
        if (idx !== -1) {
          db.Configuration.ConnectionString =
            this._onHandleConvertWorkingConfigToStringJson(crtParameters[idx]);
        }
        return db;
      });
      crtSource.Databases = rs;
      return JSON.stringify(crtSource);
    }
    if (
      crtWorkingConfig &&
      crtWorkingConfig.length > 0 &&
      !this.props.isMultiples
    ) {
      let rs = crtWorkingConfig.map((i) => {
        let item = new ItemInMultipleContextRequest();
        item.ContextKey = String(i.key);
        item.Name = String(i.key);
        item.ConnectionString =
          this._onHandleConvertWorkingConfigToStringJson(i);
        return item;
      });
      crtSource.Databases = rs;
      return JSON.stringify(crtSource);
    }
    return "";
  };

  private _HandleWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onHandleConvertConnectionStringToArray = (
    key: string,
    str: string,
    contextKey?: string,
    featureKey?: string
  ): IWorkingStorageConfig => {
    let item: IWorkingStorageConfig = {
      key,
      contextKey: contextKey || "",
      featureKey: featureKey || "",
      connectionString: str,
    };
    if (str && str.trim() !== "" && str.indexOf(";") !== -1) {
      let arr = str.split(";");
      let validArr = arr.filter(
        (rs) =>
          typeof rs === "string" && rs.trim() !== "" && rs.indexOf("=") !== -1
      );
      if (validArr.length > 0) {
        validArr.forEach((i) => {
          let iArr = i.split("=");
          switch (iArr[0].toLocaleLowerCase()) {
            case "server":
              return (item.Server = iArr[1]);
            case "database":
              return (item.Database = iArr[1]);
            case "password":
              return (item.Password = iArr[1]);
            case "user id":
            case "user":
              return (item.User = iArr[1]);
            default:
              break;
          }
        });
      }
    }
    return item;
  };

  onHandleSelectDropdown = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    index?: number
  ) => {
    if (option && option.key !== "selectedAll__opt") {
      let crtWorkingConfig = [...this.state.workingStorageConfig];
      let crtSelectedOpts = [...this.state.selectedOpts];
      let idx = crtWorkingConfig.findIndex((p) => p.key === option.key);
      let idxOpt = crtSelectedOpts.findIndex(
        (opt) => opt === String(option.key)
      );
      let param = this._onHandleConvertConnectionStringToArray(
        String(option.key),
        option.data,
        option.name,
        option.customData
      );
      if (idx === -1) {
        crtWorkingConfig.push(param);
      }
      if (idxOpt === -1) {
        crtSelectedOpts.push(String(option.key));
      }
      if (idx !== -1) {
        crtWorkingConfig.splice(idx, 1);
      }
      if (idxOpt !== -1) {
        crtSelectedOpts.splice(idxOpt, 1);
      }
      this._onHandleSentWorkingStorageConfig(crtWorkingConfig);
      this.setState({
        selectedOpts: crtSelectedOpts,
        workingStorageConfig: crtWorkingConfig,
      });
    }
    if (option && option.key === "selectedAll__opt") {
      let crtOpts = [...this.state.opts].filter(
        (o) => o.key !== "selectedAll__opt"
      );
      let selectedOpts = [...this.state.opts].map((o) => String(o.key));
      if (
        this.state.workingStorageConfig.length ===
        this.state.opts.length - 1
      ) {
        crtOpts = [];
        selectedOpts = [];
      }
      let params = crtOpts.map((o) => {
        let param = this._onHandleConvertConnectionStringToArray(
          String(o.key),
          o.data,
          o.name,
          o.customData
        );
        return param;
      });
      this._onHandleSentWorkingStorageConfig(params);
      this.setState({
        selectedOpts: selectedOpts,
        workingStorageConfig: params,
      });
      if (selectedOpts.length > 0) {
        if ((this.context.state as ValidatorJsonFile)?.isValid) {
          this.context.update(new ValidatorJsonFile());
        }
      }
    }
  };

  onHandleChangeField = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    str?: string,
    type?: string,
    key?: string
  ) => {
    const target = event.target as HTMLTextAreaElement;
    const nameInput: string | null = target.getAttribute("name");
    let crtWorkingConfig = [...this.state.workingStorageConfig];
    this._HandleWorkingStatus(true);
    if (nameInput !== null) {
      let idx = crtWorkingConfig.findIndex((st) => st.key === key);
      if (idx !== -1) {
        let item: any = crtWorkingConfig[idx];
        item[nameInput] = str ? str : "";
      }
    }
    this._onHandleSentWorkingStorageConfig();
    this.setState({ workingStorageConfig: crtWorkingConfig });
  };

  onHandleUpdateConfig = async () => {
    let config = await this._onHandleUpdateSourceWithWorkingParameters();
    this._onHandleSentWorkingStorageConfig();
    if (
      config &&
      config.trim() !== "" &&
      this.props.OnUpdateWorkingConfig &&
      !this.state.isInvalidJSON
    ) {
      this.props.OnUpdateWorkingConfig(config);
    }
  };

  onHandleGoToSource = () => {
    if (this.props.OnUpdateWorkingConfig) {
      this._HandleChangeToSourceTab();
    }
  };

  RenderDropdown = () => {
    let idTitle = BuildRCAttribute("sp.title");
    if (
      this.props.signalRData &&
      Array.isArray(this.props.signalRData) &&
      this.props.signalRData.length < 1 &&
      !this.state.isLoading &&
      this.state.cId !== ""
    ) {
      return (
        <EmptyWrapper className="EmptyWrapper" theme={this.props.theme}>
          <h3 {...idTitle}>The context does not need to config</h3>
        </EmptyWrapper>
      );
    } else if (
      (this.props.signalRData &&
        Array.isArray(this.props.signalRData) &&
        this.props.signalRData.length > 0 &&
        !this.state.isLoading &&
        this.state.cId !== "") ||
      (!this.props.isMultiples &&
        this.state.cId === "" &&
        this.props.signalRDB &&
        this.props.signalRDB.length > 0)
    ) {
      if (this.state.opts.length > 1 && !this.state.isLoadingDBDone) {
        this.setState({ isLoadingDBDone: true });
      }
      return (
        <Dropdown
          options={this.state.opts}
          rcName="database"
          selectedKeys={this.state.selectedOpts}
          label="Databases"
          placeholder="Select database"
          darkMode={this.props.theme}
          onChange={this.onHandleSelectDropdown}
          multiSelect
          dropdownWidth="fit-content"
        />
      );
    } else {
      if (this.state.isLoading) {
        return (
          <LoadingWrapper>
            <LoadingSpinner darkMode={this.props.theme} rcName="database" />
          </LoadingWrapper>
        );
      }
    }
  };

  render() {
    let idTitle = BuildRCAttribute("sp.form.title");
    return (
      <StorageTemplateWrapper
        className="StorageTemplateWrapper"
        theme={this.props.theme}
      >
        {this.RenderDropdown()}
        <div className="txt__group">
          {this.props.workingStorageConfig && this.props.workingStorageConfig.length > 0
            ? this.props.workingStorageConfig.map((p) => {
                return (
                  <div className="storage__form">
                    <h4 {...idTitle} className="storage__title">
                      {String(p.key)}
                    </h4>
                    <div className="storage__inputs">
                      <TextField
                        placeholder="Place holder"
                        darkMode={this.props.theme}
                        label="Server"
                        name="Server"
                        value={p.Server}
                        onChange={(e, str) =>
                          this.onHandleChangeField(
                            e,
                            str,
                            "Server",
                            String(p.key)
                          )
                        }
                        className="txt__item"
                        rcName={`${String(p.key)}.server`}
                      />
                      <TextField
                        placeholder="Place holder"
                        darkMode={this.props.theme}
                        label="Database"
                        name="Database"
                        value={p.Database}
                        onChange={(e, str) =>
                          this.onHandleChangeField(
                            e,
                            str,
                            "Database",
                            String(p.key)
                          )
                        }
                        className="txt__item"
                        rcName={`${String(p.key)}.database`}
                      />
                      <TextField
                        placeholder="Place holder"
                        darkMode={this.props.theme}
                        label="User"
                        name="User"
                        value={p.User}
                        onChange={(e, str) =>
                          this.onHandleChangeField(
                            e,
                            str,
                            "User",
                            String(p.key)
                          )
                        }
                        className="txt__item"
                        rcName={`${String(p.key)}.user`}
                      />
                      <TextField
                        placeholder="Place holder"
                        darkMode={this.props.theme}
                        label="Password"
                        name="Password"
                        type="password"
                        value={p.Password}
                        onChange={(e, str) =>
                          this.onHandleChangeField(
                            e,
                            str,
                            "Password",
                            String(p.key)
                          )
                        }
                        className="txt__item"
                        rcName={`${String(p.key)}.password`}
                      />
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
        {/* )} */}
      </StorageTemplateWrapper>
    );
  }
}

export default StorageTemplate;

import * as React from "react";
import { DefaultStorageConfigSource, IEditorProps, IEditorStates } from "./EditorModel";
import { EditorWrapper } from "./EditorStyle";
import TextField from "aod-dependencies/TextField/CustomTextField";
import { BuildRCAttribute } from "src/common/functions/RCAttribute";
import { TypeConfirm } from "src/entity/enums";
import {
  ValidatorJsonExpression,
  ValidatorJsonFile,
} from "src/common/functions/FieldValidate";
import { ValidatorJsonContext } from "src/common/contexts";
import { IWorkingStorageConfig } from "../StorageTemplate/StorageTemplateModel";

class Editor extends React.Component<IEditorProps, IEditorStates> {
  constructor(props: IEditorProps) {
    super(props);
    this.state = {
      value: "",
    };
  }

  static contextType?: React.Context<any> | undefined = ValidatorJsonContext;
  componentDidMount() {
    let str = this._onHandleConfigurationString();
    this._onHandleJsonString(str);
  }

  componentDidUpdate(prevProps: IEditorProps, prevState: IEditorStates) {
    if (
      (this.props.workingConfig &&
        this.props.workingConfig !== prevProps.workingConfig) ||
      (this.props.sourceLogging &&
        this.props.loggingConfig &&
        this.props.loggingConfig !== prevProps.loggingConfig) ||
      (this.props.workingParameter &&
        this.props.workingParameter !== prevProps.workingParameter)
    ) {
      let str = this._onHandleConfigurationString();
      this._onHandleJsonString(str);
    }
    if (
      this.props.isPanelPageOpen &&
      this.props.isPanelPageOpen !== prevProps.isPanelPageOpen &&
      this.props.confirmType === TypeConfirm.Submit
    ) {
      this.onHandleUpdateConfig();
    }
  }

  componentWillUnmount() {
    // this.context.update(new ValidatorJsonFile());
    this._GetFieldEditorValue();
    this._onUpdateWorkingStorageConfig();
  }

  private _onUpdateWorkingStorageConfig = () => {
    try{
      if(this.state.value){
        const workingConfig = JSON.parse(this.state.value) as DefaultStorageConfigSource;
        var workingStorageConfig: IWorkingStorageConfig[] = [];
        if(workingConfig?.Databases && workingConfig?.Databases.length > 0){
          workingConfig.Databases.map(db => {
            const config = this.props.workingStorageConfig?.filter(x => x.featureKey === db.Name);
            if(config && config.length > 0) {
              const wb = this._onHandleConvertConnectionStringToArray(
                  String(config[0].key),
                  config[0].connectionString,
                  config[0].contextKey,
                  config[0].featureKey)
              workingStorageConfig.push(wb)
            }
          });
          if(this.props.onHandleWorkingStorageConfig){
            this.props.onHandleWorkingStorageConfig(workingStorageConfig);
          }
        }
      }
    }
    catch{}
  }

  private _onHandleConfigurationString = (): string => {
    if (
      this.props.isParameter &&
      typeof this.props.workingParameter === "string"
    ) {
      return this.props.workingParameter;
    }
    if (
      this.props.sourceLogging &&
      this.props.sourceLogging.trim() !== "" &&
      !this.props.isParameter
    ) {
      return this.props.sourceLogging;
    }
    if (
      this.props.workingConfig &&
      this.props.workingConfig.trim() !== "" &&
      this.props.sourceLogging === undefined &&
      !this.props.isParameter
    ) {
      if(this.props.workingStorageConfig && 
        this.props.workingStorageConfig.length > 0){
          return this.props.workingConfig;
      }
    }
    return "";
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

  private _onHandleJsonString = (str: string) => {
    let sourceStr = str.replaceAll("\\", "");
    const defaultError = new ValidatorJsonFile();
    const resultValid = ValidatorJsonExpression.check(sourceStr as string);
    const isHaveDBSameName = ValidatorJsonExpression.checkIsHaveDBSameName(
      sourceStr as string,
      "Name"
    );
    if (resultValid) {
      defaultError.set(resultValid, "Invalid json format.");
      this.context.update(defaultError);
    } 
    else if (!resultValid && isHaveDBSameName) {
      defaultError.set(isHaveDBSameName, "Database name already exist.");
      this.context.update(defaultError);
    } else {
      this.context.update(new ValidatorJsonFile());
    }

    if (
      this.props.workingContext &&
      this.props.configurationType === "context" &&
      !this.props.isParameter &&
      this.props.signalRData
    ) {
      let sample = { Databases: [] };
      if (
        this.props.signalRDB &&
        this.props.signalRDB.length > 0 &&
        this.props.workingStorageConfig &&
        this.props.workingStorageConfig.length > 0
      ) {
        let rs: any = [...this.props.workingStorageConfig].map((c) => {
          return {
            Name: c.featureKey,
            Configuration: {
              ConnectionString: `Server=${c.Server};Database=${c.Database};User=${c.User};Password=${c.Password}`,
            },
          };
        });
        sample.Databases = rs;
        let str = JSON.stringify(sample, undefined, 4);
        this.setState({ value: str });
      }
    } else {
      try {
        let obj = JSON.parse(sourceStr);
        this.setState({ value: JSON.stringify(obj, undefined, 4) });
      } catch {
        this.setState({
          value: sourceStr,
        });
      }
    }
  };

  private _onHandleUpdateWorkingLogging = async (str: string) => {
    if (this.props.onUpdateWorkingLogging && this.props.loggingConfig !== str) {
      await this.props.onUpdateWorkingLogging(str);
    }
  };
  private _onHandleUpdateWorkingParameter = (str: string) => {
    if (this.props.onUpdateWorkingParameter) {
      this.props.onUpdateWorkingParameter(str);
    }
  };

  private _GetFieldEditorValue = () => {
    try{
      let id = `editor__field${this.props.sourceLogging ? "__logging" : ""}`;
      let fieldValue = document.getElementById(id) as HTMLInputElement;
      if (fieldValue) {
        this._onHandleUpdateEditorValue(fieldValue.value);
        if (
          this.props.signalRDB &&
          this.props.signalRDB.length > 0 &&
          this.props.onHandleSignalRDB
        ) {
          try {
            let obj = JSON.parse(fieldValue.value);
            if (obj && obj.Databases) {
              let newSignalRDB = [...this.props.signalRDB].map((db) => {
                let idx = [...obj.Databases].findIndex((o) => o.Name === db.name);
                // console.log(idx);
                if (idx !== -1) {
                  db.connectionString =
                    obj.Databases[idx].Configuration.ConnectionString || "";
                  return db;
                }
                return db;
              });
              this.props.onHandleSignalRDB(newSignalRDB);
            }
          } catch {}
        }
      }
    }
    catch{}
  };

  private _onHandleUpdateEditorValue = async (str: string) => {
    if (this.props.isParameter) {
      await this._onHandleUpdateWorkingParameter(str);
    }
    if (
      this.props.onUpdateWorkingConfig &&
      !this.props.sourceLogging &&
      !this.props.isParameter
    ) {
      try {
        let obj = JSON.parse(str);
        await this.props.onUpdateWorkingConfig(JSON.stringify(obj));
      } catch {
        await this.props.onUpdateWorkingConfig(str);
      }
    }
    if (this.props.sourceLogging && !this.props.isParameter) {
      try {
        let obj = JSON.parse(str);
        this._onHandleUpdateWorkingLogging(JSON.stringify(obj));
      } catch {
        this._onHandleUpdateWorkingLogging(str);
      }
    }
  };

  //private _onHandleResetApplicationStore = () => {
  //  if (this.props.OnResetApplicationStore) {
  //    this.props.OnResetApplicationStore();
  //  }
  //};

  private _onHandleUpdateWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  onHandleUpdateConfig = () => {
    this._GetFieldEditorValue();
  };

  onHandleChangeEditor = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    val?: string
  ) => {
    const defaultError = new ValidatorJsonFile();
    const resultValid = ValidatorJsonExpression.check(val as string);
    const isHaveDBSameName = ValidatorJsonExpression.checkIsHaveDBSameName(
      val as string,
      "Name"
    );
    if (resultValid) {
      defaultError.set(resultValid, "Invalid json format.");
      this.context.update(defaultError);
    } else if (!resultValid && isHaveDBSameName) {
      defaultError.set(isHaveDBSameName, "Database name already exist.");
      this.context.update(defaultError);
    } else {
      this.context.update(new ValidatorJsonFile());
    }
    this.setState({ value: val ? val : "" });
    this._onHandleUpdateWorkingStatus(true);
  };

  render() {
    let idTitle = BuildRCAttribute(
      `sp.title.editor.${this.props.sourceLogging ? "logging" : "storage"}`
    );
    let idError = BuildRCAttribute("sp.errMsg");
    const validator = this.context?.state as ValidatorJsonFile;
    return (
      <EditorWrapper
        theme={{
          darkMode: this.props.theme,
          withLogging: this.props.workingContext.isInitialized,
        }}
        className="EditorWrapper"
      >
        {this.props.content && (
          <h4 className="editor__title" {...idTitle}>
            {this.props.content}
          </h4>
        )}
        <span {...idError} className="err__message">
          {validator.errorMessage}
        </span>
        <TextField
          rows={30}
          rowSpan={30}
          multiline
          id={`editor__field${this.props.sourceLogging ? "__logging" : ""}`}
          className="editor__field"
          darkMode={this.props.theme}
          rcName={this.props.rcName}
          onChange={this.onHandleChangeEditor}
          value={this.state.value}
          placeholder="Place Holder"
        />
      </EditorWrapper>
    );
  }
}
export default Editor;

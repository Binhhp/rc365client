import Checkbox from "aod-dependencies/Checkbox/CustomCheckBox";
import SpinButton from "aod-dependencies/SpinButton/CustomSpinButton";
import TextField from "aod-dependencies/TextField/CustomTextField";
import * as React from "react";
import { BuildRCAttribute } from "src/common/functions";
import { TypeConfirm } from "src/entity/enums";
import { ITempleteProps, ITempleteStates } from "./TempleteModel";
import { EmptyWrapper, InvalidWrapper, TempleteWrapper } from "./TempleteStyle";

class Template extends React.Component<ITempleteProps, ITempleteStates> {
  constructor(props: ITempleteProps) {
    super(props);
    this.state = {
      source: {},
      blocks: [],
      isInvalidJSON: false,
      isEmpty: false,
    };
  }

  componentDidMount() {
    this._onHandleFirstMount();
  }

  componentDidUpdate(prevProps: ITempleteProps, prevStates: ITempleteStates) {
    if (
      this.props.isPanelPageOpen &&
      this.props.isPanelPageOpen !== prevProps.isPanelPageOpen &&
      this.props.confirmType === TypeConfirm.Submit
    ) {
      this.onHandleUpdateConfig();
    }
    if (
      this.props.workingConfig !== prevProps.workingConfig ||
      this.props.sourceLogging !== prevProps.sourceLogging ||
      this.props.workingParameter !== prevProps.workingParameter
    ) {
      this._onHandleFirstMount();
    }
  }

  componentWillUnmount() {
    this.onHandleUpdateConfig();
  }

  private _onHandleGetParameterVal = (obj: any, childObj?: any): any => {
    if (!childObj) {
      for (const key in obj) {
        if (key === "Parameters") {
          return JSON.stringify(obj[key]);
        }
        if (key !== "Parameters" && typeof obj[key] === "object") {
          return this._onHandleGetParameterVal(obj, obj[key]);
        }
      }
    }
    if (childObj && typeof childObj === "object" && !Array.isArray(childObj)) {
      for (const key in childObj) {
        if (key === "Parameters") {
          return JSON.stringify(childObj[key]);
        }
        if (key !== "Parameters" && typeof childObj[key] === "object") {
          return this._onHandleGetParameterVal(obj, childObj);
        }
      }
    }
    if (childObj && typeof childObj === "object" && Array.isArray(childObj)) {
      childObj.forEach((i: any) => {
        if (typeof i === "object") {
          return this._onHandleGetParameterVal(obj, i);
        }
      });
    }
  };

  private _onHandleConfigurationString = (): string => {
    if (
      this.props.isParameter &&
      this.props.workingParameter &&
      this.props.workingParameter !== ""
    ) {
      return this.props.workingParameter;
    }
    if (this.props.sourceLogging && this.props.sourceLogging.trim() !== "") {
      return this.props.sourceLogging;
    }
    if (
      this.props.workingConfig &&
      this.props.workingConfig.trim() !== "" &&
      this.props.sourceLogging === undefined
    ) {
      return this.props.workingConfig;
    }
    return "";
  };

  private _onHandleFirstMount = () => {
    let configString = this._onHandleConfigurationString();
    if (["", "{}"].includes(configString)) {
      return this.setState({ isEmpty: true, blocks: [], source: {} });
    }
    if (configString && !["", "{}"].includes(configString)) {
      this._onHandleJsonString(configString);
    }
  };

  private _onHandleJsonString = (str: string) => {
    let sourceStr = str.replaceAll("\\", "");
    try {
      let value = JSON.parse(sourceStr);
      let str = JSON.stringify(value, undefined, 4);
      let crtEmpty = this.state.isEmpty;
      if (this.props.isParameter && value) {
        if (
          !this.props.workingParameter ||
          (this.props.workingParameter &&
            this.props.workingParameter.trim() === "{}")
        ) {
          crtEmpty = true;
        } else {
          crtEmpty = false;
        }
      }
      let val = JSON.parse(str);
      this.setState({ source: val, blocks: [], isEmpty: crtEmpty }, () =>
        this._BuildFormByValue()
      );
    } catch {
      this.setState({ isInvalidJSON: true, blocks: [], source: {} });
    }
  };

  private _onHandleUpdateWorkingLogging = async (str?: string) => {
    if (this.props.onUpdateWorkingLogging && this.props.loggingConfig !== str) {
      await this.props.onUpdateWorkingLogging(str ? str : "");
    }
  };

  private _HandleWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _HandleChangeToSourceTab = () => {
    if (this.props.onHandleCurrentTab) {
      this.props.onHandleCurrentTab();
    }
  };

  private _BuildFormByValue = async () => {
    let crtSource = Object.entries(this.state.source);
    let dataSrc = Object.entries(this.state.source);
    // await this._BuildSourceBlock();
    let rs = crtSource.map((s) => {
      s[1] = [];
      return s;
    });
    await this.setState({ blocks: rs });
    if (dataSrc.length > 0) {
      for (let i = 0; i < dataSrc.length; i++) {
        this._BuildBlocks(
          dataSrc[i][0],
          dataSrc[i][1],
          dataSrc[i][0],
          dataSrc[i][0]
        );
      }
    }
  };

  private _BuildBlocks = async (
    key: string,
    obj: any,
    parentKey: string,
    rootKey: string
  ) => {
    if (
      typeof obj === "object" &&
      Array.isArray(obj) &&
      this._IsHaveObjInArray(obj)
    ) {
      await obj.forEach((o) => {
        if (typeof o === "object" && !Array.isArray(o)) {
          let newO = Object.entries(o);
          newO.forEach((i) => {
            this._BuildBlocks(i[0], i[1], key, rootKey);
          });
        }
      });
    } else if (typeof obj === "object" && !Array.isArray(obj)) {
      let newObj = Object.entries(obj);
      await newObj.forEach((o) => {
        this._BuildBlocks(o[0], o[1], key, rootKey);
      });
    } else {
      this._FindAndChangeState(key, obj, parentKey, rootKey);
    }
  };

  private _FindAndChangeState = (
    key: string,
    value: any,
    parentKey: string,
    rootKey: string
  ) => {
    let crtBlocks = [...this.state.blocks];
    let indexRoot = crtBlocks.findIndex((b) => b[0] === rootKey && b[1]);
    if (indexRoot !== -1) {
      let block = crtBlocks[indexRoot][1];
      let isExist = block.some((b: any) => b[0] === key);
      if (!isExist) {
        block.push([key, value]);
      }
      if (isExist) {
        let countWithSameKey = block.filter(
          (b: any) => b[0] === key || b[0].split(" ")[0] === key
        ).length;
        let keyWithCount = `${key} ${rootKey} ${countWithSameKey + 1}`;
        block.push([keyWithCount, value]);
      }
      this.setState({ blocks: crtBlocks });
    }
  };

  private _IsHaveObjInArray = (arr: any[]) => {
    return arr.some((i) => typeof i === "object");
  };

  private _GetAllFieldValue = (): any[] => {
    let id = `TempleteWrapper${
      this.props.sourceLogging && this.props.sourceLogging.trim() !== ""
        ? "__logging"
        : ""
    }`;
    let wrapper = document.getElementById(id);
    let result = [];
    if (wrapper) {
      let inputs = wrapper.getElementsByTagName("input");
      for (let i = 0; i < inputs.length; i++) {
        let name = inputs[i].name.split(".")[0];
        let parent = inputs[i].name.split(".")[1];
        let value: any =
          inputs[i].type === "checkbox" ? inputs[i].checked : inputs[i].value;
        if (inputs[i].className.indexOf("ms-spinButton") !== -1) {
          value = Number(value);
        }
        let index = result.findIndex(
          (rs) => rs[0] === name && rs[1] !== value && rs[2] === parent
        );
        if (index !== -1) {
          let itemVal: any = result[index][1];
          if (Array.isArray(itemVal)) {
            itemVal.push(value);
          } else {
            itemVal = [itemVal, value];
            result[index][1] = itemVal;
          }
        } else {
          result.push([name, value, parent]);
        }
      }
    }
    return result;
  };

  private _ChangeSourceData = async () => {
    let newValue = await this._GetAllFieldValue();
    newValue.forEach((item) => {
      // this._onTest(item);
      if (typeof item === "object" && Array.isArray(item)) {
        let arr = item[0].split(" ");
        item[0] = arr[0];
        let id = arr.length > 1 ? arr[arr.length - 1] : "1";
        this._onHandleFindItem(item, undefined, id, undefined, "root"); // case exact value but can set to source
      }
    });
  };

  // private _onTest = (item: any[], obj?: any,parent?: string) => {
  //   let crtSource = this.state.source;
  //   if (!obj) {
  //     for (const key in crtSource) {
  //       // case correct key
  //       if (key === item[0] && typeof crtSource[key] !== "object") {
  //         console.log("correct");
  //         return;
  //       }
  //       if (
  //         key !== item[0] &&
  //         typeof crtSource[key] === "object" &&
  //         Array.isArray(crtSource[key])
  //       ) {
  //         crtSource[key].forEach((i: any) => {
  //           this._onTest(item, i);
  //         });
  //       }
  //       if (
  //         key !== item[0] &&
  //         typeof crtSource[key] === "object" &&
  //         !Array.isArray(crtSource[key])
  //       ) {
  //         this._onTest(item, crtSource[key]);
  //       }
  //     }
  //   }
  // };

  private _onHandleFindItem = (
    item: any[],
    obj?: any,
    id?: string,
    index?: number,
    parent?: string
  ) => {
    if (item[0] === "Level") {
      // console.log("object");
    }
    if (!obj) {
      let crtSrouce = this.state.source;
      for (const key in crtSrouce) {
        // tìm đúng key rồi nhưng parent không thỏa mãn điều kiện
        if (
          (key === item[0] &&
            !index &&
            parent &&
            (parent === item[2] || item[2] === key)) ||
          (key === item[0] && !index)
        ) {
          crtSrouce[key] = item[1];
        }
        if (
          (key === item[0] && index && Number(id) === index) ||
          (key === item[0] &&
            index &&
            Number(id) === index &&
            parent &&
            (parent === item[2] || item[2] === key))
        ) {
          crtSrouce[key] = item[1];
        }
        if (
          key !== item[0] &&
          typeof crtSrouce[key] === "object" &&
          !Array.isArray(crtSrouce[key])
        ) {
          this._onHandleFindItem(item, crtSrouce[key], id, undefined, key);
        }
        if (
          key !== item[0] &&
          typeof crtSrouce[key] === "object" &&
          Array.isArray(crtSrouce[key])
        ) {
          crtSrouce[key].forEach((i: any, index: number) => {
            if (typeof i === "object" && !Array.isArray(i)) {
              this._onHandleFindItem(item, i, id, index + 1, key);
            }
          });
        }
      }
    }
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      for (const key in obj) {
        if (
          (key === item[0] &&
            !index &&
            parent &&
            (parent === item[2] || item[2] === key)) ||
          (key === item[0] && !index)
        ) {
          obj[key] = item[1];
        }

        if (
          (key === item[0] && index && Number(id) === index) ||
          (key === item[0] &&
            index &&
            Number(id) === index &&
            parent &&
            (parent === item[2] || item[2] === key))
        ) {
          obj[key] = item[1];
        }
        if (
          key !== item[0] &&
          typeof obj[key] === "object" &&
          !Array.isArray(obj[key])
        ) {
          this._onHandleFindItem(item, obj[key], id, undefined, key);
        }
        if (
          key !== item[0] &&
          typeof obj[key] === "object" &&
          Array.isArray(obj[key])
        ) {
          obj[key].forEach((i: any, index: number) => {
            if (typeof i === "object" && !Array.isArray(i)) {
              this._onHandleFindItem(item, i, id, index + 1, key);
            }
          });
        }
      }
    }
  };

  private _onHandleUpdateWorkingConfiguration = () => {
    if (this.props.OnUpdateWorkingConfig) {
      let sourceStr = JSON.stringify(this.state.source);
      this.props.OnUpdateWorkingConfig(sourceStr);
    }
  };

  private _onHandleUpdateWorkingParameter = () => {
    if (this.props.onUpdateWorkingParameter) {
      let sourceStr = JSON.stringify(this.state.source);
      this.props.onUpdateWorkingParameter(sourceStr);
    }
  };

  private _onHandleCheckRenderTitleOfBlock = () => {
    let obj = this.state.source;
    for (const key in this.state.source) {
      if (typeof obj[key] === "object") {
        return true;
      }
    }
    return false;
  };

  onHandleUpdateConfig = async () => {
    await this._ChangeSourceData();
    if (this.props.isParameter && !this.state.isInvalidJSON) {
      return this._onHandleUpdateWorkingParameter();
    }
    if (
      !this.state.isInvalidJSON &&
      !this.props.sourceLogging &&
      !this.props.isParameter
    ) {
      this._onHandleUpdateWorkingConfiguration();
    }
    if (
      !this.state.isInvalidJSON &&
      this.props.sourceLogging &&
      !this.props.isParameter
    ) {
      this._onHandleUpdateWorkingLogging(JSON.stringify(this.state.source));
    }
  };

  onHandleChangeField = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    str?: string
  ) => {
    this._HandleWorkingStatus(true);
  };

  onHandleChangeCBox = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    isChecked?: boolean
  ) => {
    this._HandleWorkingStatus(true);
  };

  RenderTextField = (
    value: string,
    label: string,
    parent: string,
    index?: number
  ) => {
    return (
      <TextField
        placeholder="Place holder"
        className="form__field"
        darkMode={this.props.theme}
        defaultValue={value}
        key={index}
        name={`${label}${index ? `.${index}` : ""}`}
        rcName={`${label}${index ? `.${index}` : ""}`}
        onChange={this.onHandleChangeField}
      />
    );
  };

  RenderCheckbox = (value: boolean, label: string, parent: string) => {
    return (
      <Checkbox
        className="form__checkbox"
        darkMode={this.props.theme}
        defaultChecked={value}
        label={label}
        name={`${label}.${parent}`}
        rcName={label}
        onChange={this.onHandleChangeCBox}
      />
    );
  };

  RenderBlockField = () => {
    let titleConditon = this._onHandleCheckRenderTitleOfBlock();
    return this.state.blocks.map((b, i) => {
      let title = b[0].indexOf(".") === -1 ? b[0] : b[0].split(".")[0];
      return (
        <div key={i} className="form__block">
          {!this.props.isParameter && titleConditon && <h3>{title}</h3>}
          {b[1].length > 0 &&
            b[1].map((item: any, index: any) => {
              return this.RenderBlockChild(item, b[0]);
            })}
        </div>
      );
    });
  };

  RenderBlockChild = (array: any[], parent: string) => {
    let typeVal = typeof array[1];
    let idItem = BuildRCAttribute("frm.item.title");
    return (
      <div className="form__item">
        {typeVal !== "boolean" && <p {...idItem}>{array[0]}</p>}
        {this.RenderFields(array[1], array[0], parent)}
      </div>
    );
  };

  onValidateSpin = (
    value: string,
    event?: React.SyntheticEvent<HTMLElement>
  ) => {
    this._HandleWorkingStatus(true);
    return value;
  };
  onDecrementSpin = (value: string): string | void => {
    this._HandleWorkingStatus(true);
    let val = Number(value);
    String(val--);
    return String(val--);
  };
  onIncrementSpin = (value: string): string | void => {
    this._HandleWorkingStatus(true);
    let val = Number(value);
    String(val++);
    return String(val++);
  };

  RenderSpinBtn = (
    value: string | number,
    label: string,
    parent: string,
    index?: number
  ) => {
    return (
      <SpinButton
        darkMode={this.props.theme}
        step={1}
        styles={{
          labelWrapper: { paddingBottom: "0 !important" },
          input: { minWidth: "0", width: "100%" },
        }}
        inputProps={{ name: `${label}.${parent}` }}
        defaultValue={String(value)}
        onValidate={this.onValidateSpin}
        onDecrement={this.onDecrementSpin}
        onIncrement={this.onIncrementSpin}
        placeholder="Place Holder"
        className="form__spinBtn"
        rcName={`${label}${index ? `.${index}` : ""}`}
      />
    );
  };

  RenderFields = (value: any, label: string, parent: string) => {
    let type = typeof value;
    if (type === "string") {
      return this.RenderTextField(value, label, parent);
    }
    if (type === "number") {
      return this.RenderSpinBtn(value, label, parent);
    }
    if (type === "boolean") {
      return this.RenderCheckbox(value, label, parent);
    }
    if (type === "object") {
      return value.map((item: any, index: any) => {
        if (typeof item === "number") {
          return this.RenderSpinBtn(item, label, parent, index);
        }
        return this.RenderTextField(item, label, parent, index);
      });
    }
  };

  onHandleGoToSource = () => {
    if (this.props.OnUpdateWorkingConfig && !this.props.isParameter) {
      if (this.props.sourceConfig && this.props.sourceLogging) {
        this.props.OnUpdateWorkingConfig(this.props.sourceConfig);
        this._onHandleUpdateWorkingLogging();
      }
    }
    this._HandleChangeToSourceTab();
  };

  render() {
    let idInvalidTitle = BuildRCAttribute("div.invalid.title");
    let idTitleEmpty = BuildRCAttribute("div.title.empty");
    let idInvalid = BuildRCAttribute("div.invalid");
    let idRestore = BuildRCAttribute("lik.GoSource");

    return (
      <TempleteWrapper
        id={`TempleteWrapper${
          this.props.sourceLogging && this.props.sourceLogging.trim() !== ""
            ? "__logging"
            : ""
        }`}
        theme={this.props.theme}
        className="TempleteWrapper"
      >
        {this.state.isInvalidJSON && !this.state.isEmpty ? (
          <InvalidWrapper className="InvalidWrapper" theme={this.props.theme}>
            <h3 {...idInvalidTitle}>Invalid json structure</h3>
            <span
              {...idRestore}
              className="invalid__btn"
              onClick={this.onHandleGoToSource}
            >
              Go to source
            </span>
          </InvalidWrapper>
        ) : this.state.isEmpty && !this.state.isInvalidJSON ? (
          <EmptyWrapper
            {...idInvalid}
            className="EmptyWrapper"
            theme={this.props.theme}
          >
            <h3 {...idTitleEmpty}>Empty</h3>
            <span
              {...idRestore}
              className="invalid__btn"
              onClick={this.onHandleGoToSource}
            >
              Go to source
            </span>
          </EmptyWrapper>
        ) : (
          this.RenderBlockField()
        )}
      </TempleteWrapper>
    );
  }
}
export default Template;

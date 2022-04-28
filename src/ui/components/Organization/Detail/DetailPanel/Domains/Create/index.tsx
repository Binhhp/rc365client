import * as React from "react";
import {
  CreateNewWrapper,
  InfomationWrapper,
  ActionWrapper,
  InputItemWrapper,
  ContentWrapper,
} from "./CreateStyle";
import {
  CreateNewDomainState,
  CreateNewDomainProps,
  ErrorOfDomain,
} from "./CreateModels";
import TextField from "aod-dependencies/TextField/CustomTextField";
import CommandBarButton from "aod-dependencies/Button/CommandBarButton/CustomCommanBarButton";
import { Icon } from "aod-dependencies/@uifabric/icons/Icon";
import { IconGeneralProps } from "src/common/style";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { BuildRCAttribute, ValidateFunctions } from "src/common/functions";
import { TypeConfirm } from "src/entity/enums";
import { NewErrorType } from "src/common/constants/ErrorTypes";

export default class CreateNewDomain extends React.Component<
  CreateNewDomainProps,
  CreateNewDomainState
> {
  constructor(props: CreateNewDomainProps) {
    super(props);
    this.state = {
      index: 0,
      domains: [],
      errors: [],
      cId: "",
    };
  }

  UNSAFE_componentWillMount() {
    if (this.props.workingDomains && this.props.workingDomains.length > 0) {
      this.setState({
        domains: this.props.workingDomains,
      });
    } else {
      this.onAddMoreTextField();
    }
  }

  componentWillUnmount() {
    if (this.props.OnStoreWorkingCreateDomains) {
      this.props.OnStoreWorkingCreateDomains(this.state.domains);
    }
  }

  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.confirmType !== type && this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onHandleUpdateWorkingDomains = () => {
    if (this.props.OnStoreWorkingCreateDomains) {
      this.props.OnStoreWorkingCreateDomains(this.state.domains);
    }
  };

  private _onFocusToFirstInvalidField = async () => {
    let crtDomain = [...this.state.domains];
    let crtErrors = [...this.state.errors];
    let inputs = document.getElementsByTagName("input");
    let idx = crtDomain.findIndex((d) => d.name.trim() === "");
    // check all field
    crtDomain.forEach((d, index) => {
      let errs = this._onHandleUpdateErrorDomain(d.name, index);
      crtErrors = [...new Set([...crtErrors, ...errs])];
    });
    this.setState({ errors: crtErrors });
    if (inputs && idx !== -1) {
      inputs[idx].focus();
    }
  };

  private _onHandleWorkingStatus = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.OnUpdateWorkingStatus) {
      this.props.OnUpdateWorkingStatus(val);
    }
  };

  private _onScrollToBottom = () => {
    let fromList = document.getElementById("frmList.domain");
    if (fromList) {
      fromList.scrollTop = fromList.scrollHeight;
    }
  };

  ChangeDomainState = (newDomains: BaseDomain[]) => {
    this.setState({ domains: newDomains });
  };

  onAddMoreTextField = async () => {
    let currentDomains = [...this.state.domains];
    let defaultDomain = new BaseDomain();
    currentDomains.push(defaultDomain);
    await this.ChangeDomainState(currentDomains);
    this._onScrollToBottom();
  };

  onRemoveTextField = (index: number) => {
    let crtDomains = [...this.state.domains];
    let crtErrors = [...this.state.errors];
    let idxError = crtErrors.findIndex((e) => e.index === index);
    if (idxError !== -1) {
      crtErrors.splice(idxError, 1);
    }
    if (crtDomains.length === 1) {
      let defaultDomain = new BaseDomain();
      crtDomains = [defaultDomain];
      crtErrors = [];
      if (this.props.isWorking && this.props.OnUpdateWorkingStatus) {
        this.props.OnUpdateWorkingStatus(false);
      }
    } else if (crtDomains.length > 1) {
      crtDomains.splice(index, 1);
    }
    this.setState({ domains: crtDomains, errors: crtErrors });
  };

  private _onHandleUpdateErrorDomain = (
    str: string,
    index: number
  ): ErrorOfDomain[] => {
    let crtDomains = [...this.state.domains];
    let crtErrors = [...this.state.errors];
    if (str.trim() === "") {
      crtErrors = crtErrors.filter((e) => e.index !== index);
      let item: ErrorOfDomain = {
        index,
        error: NewErrorType.Empty,
      };
      crtErrors.push(item);
    } else if (str.trim() !== "" && !ValidateFunctions.onVerifyDomain(str)) {
      crtErrors = crtErrors.filter((e) => e.index !== index);
      let item: ErrorOfDomain = {
        index,
        error: NewErrorType.Domain,
      };
      crtErrors.push(item);
    } else if (str.trim() !== "" && str.length > 66) {
      crtErrors = crtErrors.filter((e) => e.index !== index);
      let item: ErrorOfDomain = {
        index,
        error: NewErrorType.Length,
      };
      crtErrors.push(item);
    } else if (
      str.trim() !== "" &&
      str.length <= 66 &&
      crtDomains.filter((d) => d.name === str).length > 1
    ) {
      crtErrors = crtErrors.filter((e) => e.index !== index);
      let item: ErrorOfDomain = {
        index,
        error: NewErrorType.Exist,
      };
      crtErrors.push(item);
    } else {
      crtErrors = crtErrors.filter((e) => e.index !== index);
    }
    return crtErrors;
  };

  onChangeTextField = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    str?: string,
    idx?: number
  ): void => {
    let crtDomains = [...this.state.domains];
    this._onHandleWorkingStatus(true);
    if (typeof idx === "number" && str) {
      crtDomains[idx].name = str;
      let errs = this._onHandleUpdateErrorDomain(str, idx);
      this.setState({ errors: errs, domains: crtDomains });
    }
    if (typeof idx === "number" && !str) {
      crtDomains[idx].name = "";
      let errs = this._onHandleUpdateErrorDomain("", idx);
      this.setState({ errors: errs, domains: crtDomains });
    }
  };

  onFocusTextField = (index: number) => {
    this.setState({ index });
  };

  onSentData = async () => {
    let isHaveInvalid = [...this.state.domains].some(
      (d) =>
        d.name.trim() === "" ||
        (d.name.trim() !== "" && d.name.trim().length > 66)
    );
    if (
      !isHaveInvalid &&
      this.props.isWorking &&
      this.props.OnUpdateIsConfirmCreate &&
      this.state.errors.length < 1
    ) {
      this._onHandleUpdateWorkingDomains();
      this._onHandleUpdateConfirmType(TypeConfirm.Review);
    }
    if (isHaveInvalid || this.state.errors.length > 0) {
      this._onFocusToFirstInvalidField();
    }
  };

  RenderTextFieldErrorMessage = (idx: number): string => {
    let crtError = [...this.state.errors];
    let error = crtError.find((e) => e.index === idx);
    if (error) {
      switch (error.error) {
        case NewErrorType.Length:
          return "Maximum character is 66.";
        case NewErrorType.Empty:
          return "Enter domain.";
        case NewErrorType.Exist:
          return "Domain already exist.";
        case NewErrorType.Domain:
          return "Invalid domain.";
        default:
          return "";
      }
    }
    return "";
  };

  render() {
    let { domains } = this.state;
    let idName = BuildRCAttribute(`sp.dm.name`);
    return (
      <CreateNewWrapper className="CreateNewWrapper">
        <ContentWrapper className="ContentWrapper">
          <InfomationWrapper
            className="InfomationWrapper"
            theme={this.props.theme}
          >
            <h4 {...idName}>
              {this.props.organizationInfomation
                ? this.props.organizationInfomation.name
                : ""}
            </h4>
          </InfomationWrapper>
          <ActionWrapper
            className="ActionWrapper"
            id="frmList.domain"
            theme={this.props.theme}
          >
            {domains.map((item, index) => {
              let idForm = BuildRCAttribute(`sp.domain.${index}`);
              return (
                <InputItemWrapper key={index}>
                  <div className="inputItem__label">
                    <span {...idForm}>{`Domain ${index + 1}`}</span>
                    <Icon
                      onClick={() => this.onRemoveTextField(index)}
                      iconName="Cancel"
                      rcName={`rmv.${index}`}
                    />
                  </div>
                  <TextField
                    onFocus={() => this.onFocusTextField(index)}
                    onChange={(e, str) => this.onChangeTextField(e, str, index)}
                    darkMode={this.props.theme}
                    value={item.name}
                    rcName={`domain.${index}`}
                    errorMessage={this.RenderTextFieldErrorMessage(index)}
                    placeholder="Place holder"
                  />
                  {domains.length - 1 === index && (
                    <div className="btnAdd-group">
                      <CommandBarButton
                        onClick={this.onAddMoreTextField}
                        iconProps={IconGeneralProps.addIcon}
                        darkMode={this.props.theme}
                        text="Add more"
                        rcName="AddMore.crtDomain"
                      />
                    </div>
                  )}
                </InputItemWrapper>
              );
            })}
          </ActionWrapper>
        </ContentWrapper>
      </CreateNewWrapper>
    );
  }
}

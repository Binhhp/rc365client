import * as React from "react";
import { IGeneralProps, IGeneralStates } from "./GeneralModel";
import { GeneralWrapper, FooterPanelWrapper } from "./GeneralStyle";
import Button from "aod-dependencies/Button";
import { TypeConfirm } from "src/entity/enums";
import TextField from "aod-dependencies/TextField/CustomTextField";
import { BaseDomain } from "src/common/classes/BaseDomain";
import { NewErrorType } from "src/common/constants/ErrorTypes";
import { ValidateFunctions } from "src/common/functions";

export default class EditDomain extends React.Component<
  IGeneralProps,
  IGeneralStates
> {
  constructor(props: IGeneralProps) {
    super(props);
    this.state = {
      domain: new BaseDomain(),
      error: null,
    };
  }

  componentDidMount() {
    if (this.props.domain) {
      let domain = new BaseDomain();
      domain.name = this.props.domain.name;
      domain.guid = this.props.domain.guid;
      this.setState({ domain });
    }
  }

  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (type !== this.props.confirmType && this.props.onUpdateConfirmType) {
      this.props.onUpdateConfirmType(type);
    }
  };

  private _onHandleUpdateIsWorking = (val: boolean) => {
    if (this.props.isWorking !== val && this.props.onUpdateWorkingStatus) {
      this.props.onUpdateWorkingStatus(val);
    }
  };

  private _onHandleUpdateEditDomain = () => {
    let val = document.getElementById("edt.domain") as HTMLInputElement;
    if (this.props.onUpdateEditDomain && val) {
      let domain = new BaseDomain();
      domain.name = val.value;
      domain.guid = this.state.domain.guid;
      console.log("update domain here");
      this.props.onUpdateEditDomain(domain);
    }
  };

  private _onHandleUpdateErrorDomain = (str: string): NewErrorType | null => {
    if (!str || str.trim() === "") {
      return NewErrorType.Empty;
    } else if (str.trim() !== "" && !ValidateFunctions.onVerifyDomain(str)) {
      return NewErrorType.Domain;
    } else if (str.trim() !== "" && str.length > 66) {
      return NewErrorType.Length;
    } else {
      return null;
    }
  };

  onCallActionUpdateEdit = (type: TypeConfirm) => {
    if (type === TypeConfirm.Submit && !this.state.error) {
      this._onHandleUpdateConfirmType(type);
      this._onHandleUpdateEditDomain();
    }
    if (type === TypeConfirm.Submit && this.state.error) {
      let field: HTMLElement = document.querySelectorAll(
        `[data-rc-id='txt.edt.domain']`
      )[0] as HTMLElement;
      if (field) {
        field.focus();
      }
    }
    if (type !== TypeConfirm.Submit) {
      this._onHandleUpdateConfirmType(type);
    }
  };

  onHandleChangeDomain = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    let crtDomain = this.state.domain.Clone() as BaseDomain;
    let val = newValue ? newValue.trim() : "";
    let err = this._onHandleUpdateErrorDomain(val);
    this._onHandleUpdateIsWorking(true);
    crtDomain.name = val;
    if (this.state.error !== err) {
      return this.setState({ error: err, domain: crtDomain });
    }
    return this.setState({ domain: crtDomain });
  };

  RenderTextFieldErrorMessage = (): string => {
    switch (this.state.error) {
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
  };

  render() {
    return (
      <GeneralWrapper className="GeneralWrapper">
        <div className="general__form">
          <TextField
            placeholder="Place holder"
            id="edt.domain"
            darkMode={this.props.theme}
            rcName="edt.domain"
            onChange={this.onHandleChangeDomain}
            label="Domain"
            value={this.state.domain.name}
            errorMessage={this.RenderTextFieldErrorMessage()}
          />
        </div>
        <FooterPanelWrapper
          className="FooterPanelWrapper"
          theme={this.props.theme}
        >
          <div className="footer__actionBtn">
            <Button
              onClick={
                this.props.isWorking
                  ? () => this.onCallActionUpdateEdit(TypeConfirm.Submit)
                  : undefined
              }
              darkMode={this.props.theme}
              type="Primary"
              text="Update"
              rcName="update.edtDomain"
              disabled={!this.props.isWorking}
            />
            <Button
              onClick={() => this.onCallActionUpdateEdit(TypeConfirm.Delete)}
              darkMode={this.props.theme}
              text="Delete"
              rcName="delete.edtDomain"
            />
          </div>
          <Button
            onClick={() => this.onCallActionUpdateEdit(TypeConfirm.Cancel)}
            darkMode={this.props.theme}
            text="Cancel"
            rcName="cancel.edtDomain"
          />
        </FooterPanelWrapper>
      </GeneralWrapper>
    );
  }
}

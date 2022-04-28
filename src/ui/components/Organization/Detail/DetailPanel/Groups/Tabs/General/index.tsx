import * as React from "react";
import { GeneralWrapper, FooterPanelWrapper } from "./GeneralStyle";
import { IGeneralProps } from "./GeneralModel";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import Button from "aod-dependencies/Button";
import FormGroup from "src/ui/containers/Organization/Detail/FormGroupContainer";
import { BaseGroup } from "src/common/classes/BaseGroup";
import { ValidateFunctions } from "src/common/functions";
import { IMinMaxLength } from "src/common/interfaces/IMinMaxLength";
import { LoadingSpinner } from "src/common/ui/Loading";

export default class GeneralTab extends React.Component<IGeneralProps> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IGeneralProps) {
    super(props);
    this.Action = React.createRef();
  }
  private _onHandleGroupData = (group: BaseGroup) => {
    this.setState({ group });
  };

  private _onHandleUpdateGroupRedux = () => {
    if (this.props.isWorking && this.props.group && this.props.OnUpdateGroup) {
      this.props.OnUpdateGroup(this.props.group);
    }
  };
  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onCallActionUpdateEditGroup = async (type: TypeConfirm) => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onUpdateGroupEditToStore();
    this.onHandleFooterActions(type);
  };

  private FocusToFirstInvalidItemInEdit = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.FocusToFirstInvalidItemInEdit();
  };

  private _onHandleCallApi = (type: TypeConfirm) => {
    switch (type) {
      case TypeConfirm.Submit:
        return this.onHandleSubmit();

      case TypeConfirm.Delete:
        return this.onHandleDelete();

      case TypeConfirm.Cancel:
        return this.onHandleCancel();

      default:
        return;
    }
  };

  private _onCheckIsHaveUserInvalid = (): boolean => {
    // const re =
    //   /^(([^<>(){}\[\]\\!#$%&*|^+=`~?,;:\s@"]+(\.[^<>()\[\]\\!#$%&*|^+=`~?,;:\s@"]+)*)|(".+"))$/;
    const fieldLenth: IMinMaxLength[] = [
      { key: "email", max: 64 },
      { key: "description", max: 1024 },
    ];
    if (this.props.group) {
      if (
        this.props.group.email.length > 256 ||
        this.props.group.name.trim() === "" ||
        this.props.group.name.length > 256 ||
        (this.props.group.email.trim() !== "" &&
          !ValidateFunctions.onValidateIsEmail(
            String(this.props.group.email.trim())
          )) ||
        (this.props.group &&
          this.props.group.IsHaveInvalidLengthField(undefined, fieldLenth))
      ) {
        return true;
      }
    }
    return false;
  };

  onHandleFooterActions = async (type: TypeConfirm) => {
    await this._onHandleUpdateGroupRedux();
    this._onHandleCallApi(type);
    if (
      this.props.OnUpdatePanelVisible &&
      !this.props.isWorking &&
      type === TypeConfirm.Cancel
    ) {
      this.props.OnUpdatePanelVisible(false, TypePanel.Null);
    }
  };

  onHandleDelete = () => {
    this._onHandleUpdateConfirmType(TypeConfirm.Delete);
  };

  onHandleSubmit = () => {
    if (this.props.isWorking) {
      this._onHandleUpdateConfirmType(TypeConfirm.Submit);
    }
  };

  onHandleCancel = () => {
    let { isWorking } = this.props;
    if (isWorking) {
      this._onHandleUpdateConfirmType(TypeConfirm.Cancel);
    }
    if (!isWorking && this.props.OnUpdatePanelVisible) {
      this.props.OnUpdatePanelVisible(false, TypePanel.Null);
    }
  };

  onHandleEditData = (group: BaseGroup) => {
    if (this.props.OnUpdateGroup) {
      this.props.OnUpdateGroup(group);
    }
  };

  onHandleSubmitFormEdit = async () => {
    let isHaveInvalid = await this._onCheckIsHaveUserInvalid();
    if (this.props.isWorking && !isHaveInvalid) {
      this._onCallActionUpdateEditGroup(TypeConfirm.Submit);
    } else {
      this.FocusToFirstInvalidItemInEdit();
    }
  };

  render() {
    return (
      <GeneralWrapper
        theme={{
          theme: this.props.theme,
        }}
        className="GeneralWrapper">
        {
          this.props.loading
          ? <LoadingSpinner darkMode={this.props.theme} rcName="group.edit.loading"></LoadingSpinner>
          : <FormGroup
              rcName="general"
              ref={this.Action}
              OnGetFormData={this.onHandleEditData}
              group={this.props.group}/>
        }
        <FooterPanelWrapper
          className="FooterPanelWrapper"
          theme={this.props.theme}>
          <div className="footer__actionBtn">
            <Button
              onClick={this.onHandleSubmitFormEdit}
              darkMode={this.props.theme}
              type="Primary"
              text="Update"
              rcName="update.edtGroup"
              disabled={!this.props.isWorking}
            />
            <Button
              onClick={() =>
                this._onCallActionUpdateEditGroup(TypeConfirm.Delete)
              }
              darkMode={this.props.theme}
              text="Delete"
              rcName="delete.edtGroup"
            />
          </div>
          <Button
            onClick={() =>
              this._onCallActionUpdateEditGroup(TypeConfirm.Cancel)
            }
            darkMode={this.props.theme}
            text="Cancel"
            rcName="cancel.edtGroup"/>
        </FooterPanelWrapper>
      </GeneralWrapper>
    );
  }
}

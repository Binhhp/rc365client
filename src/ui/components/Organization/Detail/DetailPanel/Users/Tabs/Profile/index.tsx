import * as React from "react";
import { FormWrapper, FooterPanelWrapper } from "./ProfileStyle";
import { ProfileTabProps } from "./ProfileModel";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import Button from "aod-dependencies/Button";
import FormUser from "src/ui/containers/Organization/Detail/FormUserContainer";
import { BaseUser } from "src/common/classes/BaseUser";
import { ValidateFunctions } from "src/common/functions";
import { IMinMaxLength } from "src/common/interfaces/IMinMaxLength";
import { LoadingSpinner } from "src/common/ui/Loading";

export default class ProfileTab extends React.Component<ProfileTabProps> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ProfileTabProps) {
    super(props);
    this.Action = React.createRef();
  }

  private _onHandleUpdateUserRedux = () => {
    if (this.props.isWorking && this.props.user && this.props.OnUpdateUser) {
      this.props.OnUpdateUser(this.props.user);
    }
  };
  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  private _onCallActionUpdateEditUser = async (type: TypeConfirm) => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onUpdateUserEditToStore();
    this.onHandleFooterActions(type);
  };

  private _onUpdateUserEditToStore = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.onUpdateUserEditToStore();
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
      { key: "mobilePhone", max: 64 },
      { key: "email", max: 64 },
      { key: "zipOrPostalCode", max: 64 },
      { key: "faxNumber", max: 64 },
      { key: "department", max: 64 },
      { key: "office", max: 64 },
      { key: "streetAddress", max: 1024 },
      { key: "countryOrRegion", max: 128 },
      { key: "city", max: 128 },
      { key: "stateOrProvince", max: 128 },
      { key: "jobTitle", max: 128 },
    ];
    let exceptKeys = undefined;
    if (this.props.user && this.props.user.mobilePhone.trim() === "") {
      exceptKeys = ["mobilePhone"];
    }
    if (
      this.props.user &&
      (this.props.user.email === "" ||
        this.props.user.name === "" ||
        this.props.user.IsHaveInvalidLengthField(exceptKeys, fieldLenth) ||
        this.props.user.displayName === "" ||
        this.props.user.displayName.length > 65 ||
        //this.props.user.domain === "" ||
        !ValidateFunctions.onValidateIsEmail(
          String(this.props.user.email.trim())
        ))
      // !re.test(String(this.props.user.email.trim())))
    ) {
      return true;
    }
    return false;
  };

  onHandleFooterActions = async (type: TypeConfirm) => {
    await this._onHandleUpdateUserRedux();
    this._onHandleCallApi(type);
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

  onHandleEditData = (user: BaseUser) => {
    if (this.props.OnUpdateUser) {
      this.props.OnUpdateUser(user);
    }
  };

  onHandleSubmitEdit = async () => {
    await this._onUpdateUserEditToStore();
    let isHaveInvalid = await this._onCheckIsHaveUserInvalid();
    if (!isHaveInvalid) {
      this._onCallActionUpdateEditUser(TypeConfirm.Submit);
    } else {
      this.FocusToFirstInvalidItemInEdit();
    }
  };

  render() {
    return (
      <FormWrapper
        theme={{
          theme: this.props.theme,
          // isHaveError: this.props.errorList && this.props.errorList.length > 0,
        }}
        className="ProfileWrapper">
          {
            this.props.loading
            ? <LoadingSpinner darkMode={this.props.theme} rcName="user.profile.loading"></LoadingSpinner>
            : <FormUser
              numberImported={1}
              rcName="profile"
              ref={this.Action}
              OnGetFormData={this.onHandleEditData}
              user={this.props.user}/>
          }
          <FooterPanelWrapper
            className="FooterPanelWrapper"
            theme={this.props.theme}>
            <div className="footer__actionBtn">
              <Button
                onClick={this.onHandleSubmitEdit}
                darkMode={this.props.theme}
                type="Primary"
                text="Update"
                rcName="Update.edtUser"
                disabled={!this.props.isWorking}
              />
              <Button
                onClick={() =>
                  this._onCallActionUpdateEditUser(TypeConfirm.Delete)
                }
                darkMode={this.props.theme}
                text="Delete"
                rcName="Delete.edtUser"
              />
            </div>
            <Button
              onClick={() => this._onCallActionUpdateEditUser(TypeConfirm.Cancel)}
              darkMode={this.props.theme}
              text="Cancel"
              rcName="Cancel.edtUser"
            />
          </FooterPanelWrapper>
      </FormWrapper>
    );
  }
}

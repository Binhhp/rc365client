import * as React from "react";
import { BaseAppointment } from "src/common/classes/BaseAppointments";
import { IEditProps, IEditStates } from "./EditModel";
import { EditWrapper, FooterWrapper, InfomationWrapper } from "./EditStyle";
import Form from "src/ui/containers/Organization/Calendar/CalendarFormContainer";
import Button from "aod-dependencies/Button";
import { TypeConfirm } from "src/entity/enums";

class EditAppointment extends React.Component<IEditProps, IEditStates> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IEditProps) {
    super(props);
    this.state = {
      appointment: new BaseAppointment(),
    };
    this.Action = React.createRef();
  }
  private _onHandleGetFormValues = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.OnHandleGetFormValues();
  };
  private _onHandleCheckAndFocusErrorField = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.OnCheckAndFocusErrorField();
  };
  private _onHandleUpdateConfirmType = (type: TypeConfirm) => {
    if (this.props.confirmType !== type && this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };
  private _onHandleUpdateWorkingAppointment = (apm: BaseAppointment) => {
    if (this.props.OnUpdateWorkingAppointment) {
      this.props.OnUpdateWorkingAppointment(apm);
    }
  };
  private _onHandleUpdateVisiblePagePanel = (val: boolean) => {
    if (
      this.props.isPanelPageOpen !== val &&
      this.props.OnUpdateVisiblePagePanel
    ) {
      this.props.OnUpdateVisiblePagePanel(val);
    }
  };
  onHandleEdit = async () => {
    await this._onHandleGetFormValues();
    let isHaveErrors = this.state.appointment.isHaveEmptyField();
    if (this.props.isWorking && !isHaveErrors) {
      await this._onHandleUpdateWorkingAppointment(this.state.appointment);
      this._onHandleUpdateConfirmType(TypeConfirm.Submit);
    }
    if (this.props.isWorking && isHaveErrors) {
      this._onHandleCheckAndFocusErrorField();
    }
  };
  onHandleCancel = async () => {
    await this._onHandleGetFormValues();
    if (this.props.isWorking) {
      await this._onHandleUpdateWorkingAppointment(this.state.appointment);
      this._onHandleUpdateConfirmType(TypeConfirm.Cancel);
    }
    if (!this.props.isWorking) {
      this._onHandleUpdateVisiblePagePanel(false);
    }
  };
  onHandleDelete = () => {
    this._onHandleUpdateConfirmType(TypeConfirm.Delete);
  };
  onHandleFormValues = (appointment: BaseAppointment) => {
    this.setState({ appointment });
  };
  render() {
    return (
      <EditWrapper className="EditWrapper" theme={this.props.theme}>
        <InfomationWrapper
          className="InfomationWrapper"
          theme={this.props.theme}
        >
          <div className="content">
            <h3>Resource</h3>
            <span>Timezone</span>
          </div>
          <Form
            rcName="edt.apm"
            ref={this.Action}
            OnGetFormValues={this.onHandleFormValues}
          />
        </InfomationWrapper>
        <FooterWrapper className="FooterWrapper" theme={this.props.theme}>
          <div className="action__gr">
            <Button
              type="Primary"
              rcName="update.appointment"
              text="Update"
              className="btn__action"
              darkMode={this.props.theme}
              onClick={this.onHandleEdit}
              disabled={!this.props.isWorking}
            />
            <Button
              rcName="delete.appointment"
              text="Delete"
              className="btn__action"
              darkMode={this.props.theme}
              onClick={this.onHandleDelete}
            />
          </div>
          <Button
            rcName="cancel.appointment"
            text="Cancel"
            darkMode={this.props.theme}
            onClick={this.onHandleCancel}
          />
        </FooterWrapper>
      </EditWrapper>
    );
  }
}

export default EditAppointment;

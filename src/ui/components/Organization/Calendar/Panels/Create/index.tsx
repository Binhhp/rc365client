import * as React from "react";
import { BaseAppointment } from "src/common/classes/BaseAppointments";
import { ICreateProps, ICreateStates } from "./CreateModel";
import { CreateWrapper, FooterWrapper } from "./CreateStyle";
import Form from "src/ui/containers/Organization/Calendar/CalendarFormContainer";
import Button from "aod-dependencies/Button";
import { TypeConfirm } from "src/entity/enums";

class CreateAppointment extends React.Component<ICreateProps, ICreateStates> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: ICreateProps) {
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
  private _onHandleUpdateVisiblePagePanel = (val: boolean) => {
    if (
      this.props.isPanelPageOpen !== val &&
      this.props.OnUpdateVisiblePagePanel
    ) {
      this.props.OnUpdateVisiblePagePanel(val);
    }
  };
  private _onHandleUpdateWorkingAppointment = (apm: BaseAppointment) => {
    if (this.props.OnUpdateWorkingAppointment) {
      this.props.OnUpdateWorkingAppointment(apm);
    }
  };

  onHandleCreate = async () => {
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

  onHandleFormValues = (appointment: BaseAppointment) => {
    this.setState({ appointment });
  };

  render() {
    return (
      <CreateWrapper className="CreateWrapper" theme={this.props.theme}>
        <Form
          rcName="cre.apm"
          ref={this.Action}
          OnGetFormValues={this.onHandleFormValues}
        />
        <FooterWrapper className="FooterWrapper" theme={this.props.theme}>
          <Button
            type="Primary"
            rcName="create.appointment"
            text="Create"
            darkMode={this.props.theme}
            onClick={this.onHandleCreate}
            disabled={!this.props.isWorking}
          />
          <Button
            rcName="cancel.appointment"
            text="Cancel"
            darkMode={this.props.theme}
            onClick={this.onHandleCancel}
          />
        </FooterWrapper>
      </CreateWrapper>
    );
  }
}

export default CreateAppointment;

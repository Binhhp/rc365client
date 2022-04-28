import * as React from "react";
import { GeneralTabWrapper } from "./GeneralStyle";
import { IGeneralTabProps } from "./GeneralModels";
import Form from "src/ui/containers/Organization/Detail/FormResourceContainer";
import { TypeResourceForm } from "src/entity/enums";
import {
  BaseResource,
  OnHandleMapDataToBaseResource,
} from "src/common/classes/BaseResource";
import { LoadingSpinner } from "src/common/ui/Loading";

export default class GeneralTab extends React.Component<IGeneralTabProps> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IGeneralTabProps) {
    super(props);
    this.Action = React.createRef();
  }

  FocusToFirstInvalidItemInEdit = async () => {
    if (!this.Action.current) {
      return;
    }
    await this.Action.current.FocusToFirstInvalidItemInEdit();
  };

  onHandleUpdateResources = (resource: BaseResource, index?: number) => {
    if (this.props.OnHandleUpdateResource) {
      let rs = OnHandleMapDataToBaseResource(resource);
      this.props.OnHandleUpdateResource(rs);
    }
  };

  render() {
    console.log(this.props);
    return (
      <GeneralTabWrapper className="GeneralTabWrapper" theme={this.props.theme}>
        {this.props.loading ? (
          <LoadingSpinner
            darkMode={this.props.theme}
            rcName="resource.edit.loading"
          ></LoadingSpinner>
        ) : (
          <Form
            rcName="edtResource"
            //resource={this.props.resource}
            type={TypeResourceForm.General}
            OnGetFormData={this.onHandleUpdateResources}
            ref={this.Action}
          />
        )}
      </GeneralTabWrapper>
    );
  }
}

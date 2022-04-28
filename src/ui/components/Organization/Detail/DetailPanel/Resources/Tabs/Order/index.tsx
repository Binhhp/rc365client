import * as React from "react";
import { OrderTabWrapper } from "./OrderStyle";
import { IOrderTabState, IOrderTabProps } from "./OrderModels";
import Form from "src/ui/containers/Organization/Detail/FormResourceContainer";
import { TypeResourceForm } from "src/entity/enums";
import { BaseResource } from "src/common/classes/BaseResource";

export default class OrderTab extends React.Component<
  IOrderTabProps,
  IOrderTabState
> {
  private Action: React.RefObject<HTMLInputElement | any>;
  constructor(props: IOrderTabProps) {
    super(props);
    this.state = {
      resource: new BaseResource(),
    };
    this.Action = React.createRef();
  }

  UNSAFE_componentWillMount() {
    if (this.props.resource) {
      let resource = new BaseResource(this.props.resource);
      this.setState({ resource });
    }
  }

  onHandleUpdateResources = (resource: BaseResource, index?: number) => {
    if (this.props.OnHandleUpdateResource) {
      this.props.OnHandleUpdateResource(resource);
    }
  };

  render() {
    return (
      <OrderTabWrapper className="OrderTabWrapper" theme={this.props.theme}>
        <Form
          ref={this.Action}
          rcName="edtResource"
          //resource={this.state.resource}
          type={TypeResourceForm.Order}
          OnGetFormData={this.onHandleUpdateResources}
        />
      </OrderTabWrapper>
    );
  }
}

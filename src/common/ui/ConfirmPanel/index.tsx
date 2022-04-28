import * as React from "react";
import { ConfirmWrapper } from "./ConfirmContentStyle";
import { IConfirmChangesProps } from "./ConfirmContentModel";
import Button from "aod-dependencies/Button";
import { TypeConfirm, TypePanel } from "src/entity/enums";
import {
  BuildRCAttribute,
  RenderContentByConfirmType,
} from "src/common/functions";
import Review from "src/ui/containers/Common/ReviewContainer";

export default class ConfirmContent extends React.Component<IConfirmChangesProps> {
  private _onHandleSubmit = () => {
    if (this.props.onHandleSubmit) {
      this.props.onHandleSubmit();
    }
  };

  private _onHandleCancel = () => {
    if (this.props.onHandleCancel) {
      this.props.onHandleCancel();
    }
    this._onUpdateTypeConfirm(TypeConfirm.Null);
  };

  private _onUpdateTypeConfirm = (type: TypeConfirm) => {
    if (this.props.OnUpdateConfirmType) {
      this.props.OnUpdateConfirmType(type);
    }
  };

  RenderContentByType = () => {
    if (
      (this.props.type &&
        [TypeConfirm.Review, TypeConfirm.ReviewSS].includes(this.props.type)) ||
      (this.props.type === TypeConfirm.Submit &&
        this.props.panelType === TypePanel.Edit)
    ) {
      return <Review type={this.props.type} />;
    }
    if (
      this.props.type &&
      ![
        TypeConfirm.Review,
        TypeConfirm.Null,
        TypeConfirm.Unavailable,
        TypeConfirm.ReviewSS,
      ].includes(this.props.type)
    ) {
      return this.props.children;
    }
  };

  render() {
    let { theme, content, isDisabled } = this.props;
    let defaultContent = RenderContentByConfirmType(this.props.type);
    let title = content ? content : defaultContent;
    let idContent = BuildRCAttribute(`cfm.msg.${this.props.rcName}`);
    let isReview =
      this.props.type &&
      ![
        TypeConfirm.Review,
        TypeConfirm.Null,
        TypeConfirm.Unavailable,
        TypeConfirm.ReviewSS,
      ].includes(this.props.type);
    return (
      <ConfirmWrapper className="confirm__wrapper" theme={theme}>
        <div className="confirm__content">
          <p
            className="confirm__title"
            {...idContent}
            style={{
              margin: `${isReview ? "48px  0 20px 0" : "1em 0"}`,
              paddingTop: `${!isReview ? "40px" : "0"}`,
              fontSize: "14px",
            }}
          >
            {title}
          </p>
          <div className="confirm__mainContent">
            {this.props.children
              ? this.props.children
              : this.RenderContentByType()}
          </div>
        </div>
        <div className="confirm__action">
          <Button
            darkMode={theme}
            text="Yes"
            type="Primary"
            rcName={`cfm.yes`}
            onClick={this._onHandleSubmit}
            disabled={isDisabled}
          />
          <Button
            onClick={this._onHandleCancel}
            darkMode={theme}
            text="No"
            rcName={`cfm.no`}
            disabled={isDisabled}
          />
        </div>
      </ConfirmWrapper>
    );
  }
}

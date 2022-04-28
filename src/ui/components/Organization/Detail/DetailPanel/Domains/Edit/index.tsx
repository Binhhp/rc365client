import * as React from "react";
import { IEditProps, IEditStates } from "./EditModel";
import { EditWrapper } from "./EditStyle";
import { PivotItem } from "aod-dependencies/Pivot";
import Pivot from "aod-dependencies/Pivot/CustomPivot";
import { EditDomainPivotItem } from "src/common/constants";
import GeneralTab from "src/ui/containers/Organization/Detail/Tab/Domain/DomainGeneralTabContainer";
import SyncTab from "src/ui/containers/Organization/Detail/Tab/Domain/DomainSyncTabContainer";
import { BuildRCAttribute } from "src/common/functions";

export default class EditDomain extends React.Component<
  IEditProps,
  IEditStates
> {
  constructor(props: IEditProps) {
    super(props);
    this.state = {
      crtTab: "0",
    };
  }

  private _mapCurrentTab = (str?: string) => {
    if (str !== "General") {
      return "1";
    }
    return "0";
  };

  RenderTabContent = () => {
    if (this.state.crtTab === "1") {
      return <SyncTab />;
    }
    return <GeneralTab />;
  };

  onChangeTab = (
    item?: PivotItem,
    ev?: React.MouseEvent<HTMLElement>
  ): void => {
    if (item) {
      let tab = this._mapCurrentTab(item.props.headerText);
      this.setState({ crtTab: tab });
    }
  };

  render() {
    let idName = BuildRCAttribute("edt.name");
    return (
      <EditWrapper className="EditWrapper">
        {this.props.domain && (
          <h4 {...idName} className="edit__organizationName">
            {this.props.domain.name}
          </h4>
        )}
        <Pivot
          styles={{
            itemContainer: {
              width: "100%",
              height: "100%",
            },
          }}
          rcName="edtDomain"
          onLinkClick={this.onChangeTab}
          darkMode={this.props.theme}
          selectedKey={this.state.crtTab}
        >
          {EditDomainPivotItem.map((item, index) => {
            return (
              <PivotItem
                key={index}
                headerText={item.text}
                itemIcon={item.iconName}
              >
                {this.RenderTabContent()}
              </PivotItem>
            );
          })}
        </Pivot>
      </EditWrapper>
    );
  }
}

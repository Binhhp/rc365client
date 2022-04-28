import * as React from "react";
import { LocationFieldWrapper, DropWrapper } from "./FieldStyle";
import { ILocationFieldProps, ILocationFieldState } from "./FieldModels";
import TextField from "aod-dependencies/TextField/CustomTextField";
import TreeView from "aod-dependencies/TreeView";
import { INodes } from "aod-dependencies/TreeView/FinalTreeInterface";
import { IconGeneralProps } from "src/common/style";

const toppingOptions = [
  {
    label: "Pepperoni",
    id: "pepperoni-id",
    childNodes: [
      {
        label: "Spicy",
        id: "spicy-id",
        childNodes: [],
      },
      {
        label: "Regular",
        id: "regular-id",
        childNodes: [],
      },
    ],
  },
  {
    label: "Chicken",
    id: "chicken-id",
    childNodes: [
      {
        label: "Buffalo",
        id: "buffalo-id",
        childNodes: [
          {
            label: "Mild",
            id: "mild-id",
            childNodes: [],
          },
          {
            label: "Hot",
            id: "hot-id",
            childNodes: [
              {
                label: "Jalapeño",
                id: "jalapeno-id",
                childNodes: [],
              },
              {
                label: "Cayenne",
                id: "cayenne-id",
                childNodes: [],
              },
            ],
          },
        ],
      },
      {
        label: "BBQ",
        id: "bbq-id",
        childNodes: [],
      },
    ],
  },
];

class LocationField extends React.Component<
  ILocationFieldProps,
  ILocationFieldState
> {
  private wrapperRef: React.RefObject<HTMLDivElement | any>;
  constructor(props: ILocationFieldProps) {
    super(props);
    this.state = {
      isFocus: false,
      valueInput: this.props.defaultVal ? this.props.defaultVal : "",
    };
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.onHandleClick);
  }
  componentWillUnmount() {
    document.removeEventListener("click", this.onHandleClick);
  }

  onHandleTreeSelected = (value: INodes[]) => {
    if (value.length > 0) {
      let stringVal = "";
      value.forEach((val) => {
        stringVal = `${val.label}${stringVal !== "" ? `, ${stringVal}` : ""}`;
      });
      setTimeout(() => this.onHandleSelectItemTree(stringVal), 0);
    } else {
      this.onHandleSelectItemTree("");
    }
  };

  onHandleSelectItemTree = (val: string) => {
    this.setState({
      valueInput: val,
    });
    if (this.props.onGetSeletedItemsTree) {
      this.props.onGetSeletedItemsTree(val);
    }
  };

  onHandleClick = (e: any) => {
    let { target } = e;
    if (!this.wrapperRef.current.contains(target)) {
      this.state.isFocus &&
        this.setState({
          isFocus: false,
        });
    } else {
      !this.state.isFocus &&
        this.setState({
          isFocus: true,
        });
    }
  };

  render() {
    return (
      <LocationFieldWrapper
        className="LocationFieldWrapper"
        ref={this.wrapperRef}
        theme={this.props.theme}
      >
        <TextField
          darkMode={this.props.theme}
          iconProps={IconGeneralProps.chevronDownIcon}
          className="LocationField"
          onClick={() => this.setState({ isFocus: true })}
          value={this.state.valueInput}
          rcName={this.props.rcName}
          disabled={this.state.isFocus}
          defaultValue={this.props.defaultVal}
          {...this.props.textFieldProps}
        />
        <DropWrapper
          className="DropWrapper"
          theme={{ darkMode: this.props.theme, isFocus: this.state.isFocus }}
        >
          <TreeView
            childNodes={toppingOptions}
            darkMode={this.props.theme}
            onGetChecked={this.onHandleTreeSelected}
            rcName={this.props.rcName}
          />
        </DropWrapper>
      </LocationFieldWrapper>
    );
  }
}

export default LocationField;

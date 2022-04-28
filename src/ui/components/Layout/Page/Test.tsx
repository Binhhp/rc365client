import parse from "html-react-parser";
import * as React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { LoadingSpinner } from "src/common/ui/Loading";
import { store } from "src/index";
import ListOrganization from "src/ui/containers/Organization/List/ListOrganizationContainer";
import styled from "styled-components";
import HOCTest from "./HOCTest";

interface ITestProps {}

interface ITestState {
  isLoading: boolean;
  htmlDiv: string;
}

export const TestHTMLDemandWrapper = styled.div`
  width: 100%;
  height: 100%;
  #orgWrapper {
    width: 100%;
    height: 100%;
  }
`;

class Test extends React.Component<ITestProps, ITestState> {
  constructor(props: ITestProps) {
    super(props);
    this.state = {
      isLoading: false,
      htmlDiv: "",
    };
  }

  componentDidMount() {
    this.RenderHTMLReceiveFromApi();
  }

  componentDidUpdate(prevProps: ITestProps, prevState: ITestState) {
    if (this.state.htmlDiv.trim() !== "" && !this.state.isLoading) {
      this.RenderOrgListToReciveHTML();
    }
  }

  RenderHTMLReceiveFromApi = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({
        isLoading: false,
        htmlDiv: `<div id="orgWrapper"></div>`,
      });
    }, 2000);
  };

  RenderOrgListToReciveHTML = () => {
    let element = document.getElementById("orgWrapper");
    if (element && this.state.htmlDiv.trim() !== "") {
      ReactDOM.render(
        <HOCTest>
          <ListOrganization />
        </HOCTest>,
        element
      );
    }
  };

  render() {
    return (
      <TestHTMLDemandWrapper className="test-html-demand">
        <ReduxProvider store={store}>
          {this.state.isLoading ? (
            <LoadingSpinner />
          ) : (
            parse(this.state.htmlDiv)
          )}
        </ReduxProvider>
      </TestHTMLDemandWrapper>
    );
  }
}

export default Test;

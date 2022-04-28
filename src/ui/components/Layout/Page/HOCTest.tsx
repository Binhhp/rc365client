import * as React from "react";
import { store } from "src/index";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

class HOCTest extends React.Component {
  render() {
    return (
      <Router>
        <ReduxProvider store={store}>{this.props.children}</ReduxProvider>
      </Router>
    );
  }
}

export default HOCTest;

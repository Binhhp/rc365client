import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import appReducers from "src/ui/reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter as Router } from "react-router-dom";
import { initializeIcons } from "aod-dependencies/@uifabric/icons";
import { GUID } from "./common/functions/BuildFuntions";

const middlewares = [thunk];

export const store = createStore(
  appReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);

window.__clientId__ = GUID.NewGuild();
initializeIcons();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// "aod-dependencies": "file:dist",
// "build": "react-scripts build"
// "build": "babel ./src/Dependencies/ --out-dir lib --extensions '.ts,.tsx,.js' && tsc --project tsconfig.types.json"
// "include": ["src/Dependencies/**/*"]
// npx babel ./src/Dependencies --out-dir lib --extensions ".ts,.tsx,.js"
// set PORT=3001 &&

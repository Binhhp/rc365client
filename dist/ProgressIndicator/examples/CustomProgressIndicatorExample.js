"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));
var dom = _react.createElement;

require("./App.css");

var _CustomProgressIndicator = _interopRequireDefault(
  require("aod-dependencies/ProgressIndicator/CustomProgressIndicator")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// <ProgressIndicatorImport>
// </ProgressIndicatorImport>
const intervalDelay = 100;
const intervalIncrement = 0.01;

function App() {
  const [percentComplete, setPercentComplete] = _react.default.useState(0);

  _react.default.useEffect(() => {
    const id = setInterval(() => {
      setPercentComplete((intervalIncrement + percentComplete) % 1);
    }, intervalDelay);
    return () => {
      clearInterval(id);
    };
  }); // <ProgressIndicatorExample>

  return dom(
    "div",
    {
      className: "App",
    },
    dom(_CustomProgressIndicator.default, {
      label: "Example title",
      description: "Example description",
      title: "Example", // <ProgressIndicatorDarkMode>
      darkMode: "dark", // </ProgressIndicatorDarkMode>
      percentComplete: percentComplete,
    })
  );
} //</ProgressIndicatorExample>

var _default = App;
exports.default = _default;

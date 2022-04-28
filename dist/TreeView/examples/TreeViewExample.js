"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _TreeView = _interopRequireDefault(require("aod-dependencies/TreeView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// <TreeViewImport>
function App() {
  // <TreeViewgetData>
  const getTreeView = async value => {
    console.log(value);
  }; // </TreeViewgetData>


  const toppingOptions = [{
    label: "Pepperoni",
    id: "pepperoni-id",
    childNodes: [{
      label: "Spicy",
      id: "spicy-id",
      childNodes: []
    }, {
      label: "Regular",
      id: "regular-id",
      childNodes: []
    }]
  }, {
    label: "Chicken",
    id: "chicken-id",
    childNodes: [{
      label: "Buffalo",
      id: "buffalo-id",
      childNodes: [{
        label: "Mild",
        id: "mild-id",
        childNodes: []
      }, {
        label: "Hot",
        id: "hot-id",
        isChecked: true,
        childNodes: [{
          label: "Jalapeño",
          id: "jalapeno-id",
          childNodes: []
        }, {
          label: "Cayenne",
          id: "cayenne-id",
          childNodes: []
        }]
      }]
    }, {
      label: "BBQ",
      id: "bbq-id",
      childNodes: []
    }]
  }];
  const LanguagesTree = [{
    textKey: "Spicy",
    context: "Cay"
  }, {
    textKey: "Chicken",
    context: "Gà"
  }, {
    textKey: "Hot",
    context: "Nóng"
  }, {
    textKey: "BBQ",
    context: "Thịt Nướng"
  }, {
    textKey: "Regular",
    context: "Truyền thống"
  }];
  return (// <TreeViewExample>
    dom("div", {
      className: "App"
    }, dom(_TreeView.default, {
      childNodes: toppingOptions // <TreeViewDarkMode>
      ,
      darkMode: "dark" // </TreeViewDarkMode>
      ,
      onGetChecked: getTreeView,
      multilingual: LanguagesTree
    })) // </TreeViewExample>

  );
}

var _default = App;
exports.default = _default;
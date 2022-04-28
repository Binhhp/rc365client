"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsListNavigatingFocusExample = void 0;

var _tslib = require("tslib");

var React = _interopRequireWildcard(require("react"));

var _DetailsList = require("office-ui-fabric-react/lib/DetailsList");

var _Link = require("office-ui-fabric-react/lib/Link");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DetailsListNavigatingFocusExample =
/** @class */
function (_super) {
  (0, _tslib.__extends)(DetailsListNavigatingFocusExample, _super);

  function DetailsListNavigatingFocusExample() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.state = {
      items: generateItems(''),
      key: 0
    };
    _this._columns = [{
      key: 'filepath',
      name: 'File path',
      onRender: function onRender(item) {
        return (
          /*#__PURE__*/
          // tslint:disable-next-line:jsx-no-lambda
          React.createElement(_Link.Link, {
            key: item,
            onClick: function onClick() {
              return _this._navigate(item);
            }
          }, item)
        );
      }
    }, {
      key: 'size',
      name: 'Size',
      onRender: function onRender(item) {
        return '4 KB';
      }
    }];

    _this._navigate = function (name) {
      _this.setState({
        items: generateItems(name + ' / '),
        initialFocusedIndex: 0,
        // Simulate navigation by updating the list's key, which causes it to re-render
        key: _this.state.key + 1
      });
    };

    return _this;
  }

  DetailsListNavigatingFocusExample.prototype.render = function () {
    // By default, when the list is re-rendered on navigation or some other event,
    // focus goes to the list container and the user has to tab back into the list body.
    // Setting initialFocusedIndex makes focus go directly to a particular item instead.
    return /*#__PURE__*/React.createElement(_DetailsList.DetailsList, {
      key: this.state.key,
      items: this.state.items,
      columns: this._columns,
      onItemInvoked: this._navigate,
      initialFocusedIndex: this.state.initialFocusedIndex,
      ariaLabelForSelectionColumn: "Toggle selection",
      ariaLabelForSelectAllCheckbox: "Toggle selection for all items",
      checkButtonAriaLabel: "Row checkbox"
    });
  };

  return DetailsListNavigatingFocusExample;
}(React.Component);

exports.DetailsListNavigatingFocusExample = DetailsListNavigatingFocusExample;

function generateItems(parent) {
  return Array.prototype.map.call('ABCDEFGHI', function (name) {
    return parent + 'Folder ' + name;
  });
}
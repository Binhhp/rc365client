"use strict";

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));
var dom = React.createElement;

var _CalenderInline = _interopRequireDefault(
  require("aod-dependencies/calendar-custom/CalenderInline")
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

// <ImportCS>
const data = [
  {
    date: "Mon Jul 06 2020 00:00:00 GMT+0700 (Indochina Time)",
    event: 2,
  },
  {
    date: "Tue Jun 16 2020 00:00:00 GMT+0700 (Indochina Time)",
    event: 1,
  },
  {
    date: "Thu Jul 16 2020 00:00:00 GMT+0700 (Indochina Time)",
    event: 1,
  },
  {
    date: "Wed Jul 22 2020 00:00:00 GMT+0700 (Indochina Time)",
    event: 3,
  },
];

class Breadcrumd extends React.Component {
  constructor() {
    super(...arguments);

    this.getDateRange = (val) => {
      console.log(val);
    };

    this.getSelectionMode = (pickType) => {
      console.log(pickType);
    };
  }

  // </getSelectMode>
  // <ExampleUsingCalendar>
  render() {
    return dom(_CalenderInline.default, {
      autoNavigateOnSelection: true,
      showGoToToday: false,
      highlightSelectedMonth: true,
      showMonthPickerAsOverlay: true,
      showWeekNumbers: false,
      showSixWeeksByDefault: false, // <DarkMode>
      darkMode: "dark", // </DarkMode>
      onSelectChanged: this.getDateRange, // <Event>
      userEvent: data, // </Event>
      // <ToggleSwitchMode>
      switchMode: true, // </ToggleSwitchMode>
      // onGetSelectMode={this.getSelectionMode}
    });
  }
} // </ExampleUsingCalendar>

var _default = Breadcrumd; //  // <Multilingual>
//  multilingual={Languages}
//  // </Multilingual>

exports.default = _default;

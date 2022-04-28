"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DetailsListCustomFooterPageProps = exports.DetailsListShimmerPageProps = exports.DetailsListNavigatingFocusPageProps = exports.DetailsListDragDropPageProps = exports.DetailsListAdvancedPageProps = exports.DetailsListCustomGroupHeadersPageProps = exports.DetailsListCustomRowsPageProps = exports.DetailsListCustomColumnsPageProps = exports.DetailsListLargeGroupedPageProps = exports.DetailsListSimpleGroupedPageProps = exports.DetailsListCompactPageProps = exports.DetailsListAnimationPageProps = exports.DetailsListBasicPageProps = exports.DetailsListPageProps = void 0;

var React = _interopRequireWildcard(require("react"));

var _DetailsListBasic = require("./examples/DetailsList.Basic.Example");

var _DetailsListAnimation = require("./examples/DetailsList.Animation.Example");

var _DetailsListCompact = require("./examples/DetailsList.Compact.Example");

var _DetailsListCustomColumns = require("./examples/DetailsList.CustomColumns.Example");

var _DetailsListCustomRows = require("./examples/DetailsList.CustomRows.Example");

var _DetailsListCustomGroupHeaders = require("./examples/DetailsList.CustomGroupHeaders.Example");

var _DetailsListAdvanced = require("./examples/DetailsList.Advanced.Example");

var _DetailsListGrouped = require("./examples/DetailsList.Grouped.Example");

var _DetailsListGroupedLarge = require("./examples/DetailsList.Grouped.Large.Example");

var _DetailsListDragDrop = require("./examples/DetailsList.DragDrop.Example");

var _DetailsListDocuments = require("./examples/DetailsList.Documents.Example");

var _DetailsListNavigatingFocus = require("./examples/DetailsList.NavigatingFocus.Example");

var _ShimmerApplication = require("../Shimmer/examples/Shimmer.Application.Example");

var _DetailsListCustomFooter = require("./examples/DetailsList.CustomFooter.Example");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DetailsListBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Basic.Example.tsx');

var DetailsListAnimationExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Animation.Example.tsx');

var DetailsListCompactExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Compact.Example.tsx');

var DetailsListCustomColumnsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomColumns.Example.tsx');

var DetailsListCustomRowsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomRows.Example.tsx');

var DetailsListCustomGroupHeadersExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomGroupHeaders.Example.tsx');

var DetailsListAdvancedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Advanced.Example.tsx');

var DetailsListGroupedExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Example.tsx');

var DetailsListGroupedLargeExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Grouped.Large.Example.tsx');

var DetailsListDragDropExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.DragDrop.Example.tsx');

var DetailsListDocumentsExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.Documents.Example.tsx');

var DetailsListNavigatingFocusExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.NavigatingFocus.Example.tsx');

var DetailsListShimmerExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Shimmer/examples/Shimmer.Application.Example.tsx');

var DetailsListCustomFooterExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/examples/DetailsList.CustomFooter.Example.tsx');

var DetailsListPageProps = {
  title: 'DetailsList',
  componentName: 'DetailsList',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/DetailsList',
  examples: [{
    title: 'DetailsList with 500 documents, sorting, filtering, marquee selection, justified columns',
    code: DetailsListDocumentsExampleCode,
    view: /*#__PURE__*/React.createElement(_DetailsListDocuments.DetailsListDocumentsExample, null)
  }],
  overview: require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListOverview.md'),
  bestPractices: '',
  dos: require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDos.md'),
  donts: require('!raw-loader!office-ui-fabric-react/src/components/DetailsList/docs/DetailsListDonts.md'),
  isHeaderVisible: true
};
exports.DetailsListPageProps = DetailsListPageProps;

function generateProps(example) {
  return {
    title: example.title,
    componentName: 'DetailsList',
    componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/DetailsList',
    examples: [example],
    isHeaderVisible: false,
    isFeedbackVisible: true
  };
}

var DetailsListBasicPageProps = generateProps({
  title: 'Simple DetailsList with filtering and marquee selection',
  code: DetailsListBasicExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListBasic.DetailsListBasicExample, null)
});
exports.DetailsListBasicPageProps = DetailsListBasicPageProps;
var DetailsListAnimationPageProps = generateProps({
  title: 'DetailsList with Row animation when cell content changed',
  code: DetailsListAnimationExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListAnimation.DetailsListAnimationExample, null)
});
exports.DetailsListAnimationPageProps = DetailsListAnimationPageProps;
var DetailsListCompactPageProps = generateProps({
  title: 'Compact DetailsList with filtering and marquee selection',
  code: DetailsListCompactExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListCompact.DetailsListCompactExample, null)
});
exports.DetailsListCompactPageProps = DetailsListCompactPageProps;
var DetailsListSimpleGroupedPageProps = generateProps({
  title: 'Simple grouped DetailsList',
  code: DetailsListGroupedExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListGrouped.DetailsListGroupedExample, null)
});
exports.DetailsListSimpleGroupedPageProps = DetailsListSimpleGroupedPageProps;
var DetailsListLargeGroupedPageProps = generateProps({
  title: 'Large grouped DetailsList',
  code: DetailsListGroupedLargeExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListGroupedLarge.DetailsListGroupedLargeExample, null)
});
exports.DetailsListLargeGroupedPageProps = DetailsListLargeGroupedPageProps;
var DetailsListCustomColumnsPageProps = generateProps({
  title: 'Rendering custom item columns with sorting',
  code: DetailsListCustomColumnsExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListCustomColumns.DetailsListCustomColumnsExample, null)
});
exports.DetailsListCustomColumnsPageProps = DetailsListCustomColumnsPageProps;
var DetailsListCustomRowsPageProps = generateProps({
  title: 'Rendering custom item rows',
  code: DetailsListCustomRowsExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListCustomRows.DetailsListCustomRowsExample, null)
});
exports.DetailsListCustomRowsPageProps = DetailsListCustomRowsPageProps;
var DetailsListCustomGroupHeadersPageProps = generateProps({
  title: 'Rendering custom group headers',
  code: DetailsListCustomGroupHeadersExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListCustomGroupHeaders.DetailsListCustomGroupHeadersExample, null)
});
exports.DetailsListCustomGroupHeadersPageProps = DetailsListCustomGroupHeadersPageProps;
var DetailsListAdvancedPageProps = generateProps({
  title: 'Advanced DetailsList of 5000 items with variable row heights',
  code: DetailsListAdvancedExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListAdvanced.DetailsListAdvancedExample, null)
});
exports.DetailsListAdvancedPageProps = DetailsListAdvancedPageProps;
var DetailsListDragDropPageProps = generateProps({
  title: 'DetailsList supporting drag and drop',
  code: DetailsListDragDropExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListDragDrop.DetailsListDragDropExample, null)
});
exports.DetailsListDragDropPageProps = DetailsListDragDropPageProps;
var DetailsListNavigatingFocusPageProps = generateProps({
  title: 'Navigating to new content while preserving keyboard focus',
  code: DetailsListNavigatingFocusExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListNavigatingFocus.DetailsListNavigatingFocusExample, null)
});
exports.DetailsListNavigatingFocusPageProps = DetailsListNavigatingFocusPageProps;
var DetailsListShimmerPageProps = generateProps({
  title: 'Shimmered DetailsList - usually shown while retrieving data',
  code: DetailsListShimmerExampleCode,
  view: /*#__PURE__*/React.createElement(_ShimmerApplication.ShimmerApplicationExample, null)
});
exports.DetailsListShimmerPageProps = DetailsListShimmerPageProps;
var DetailsListCustomFooterPageProps = generateProps({
  title: 'Rendering custom DetailsList footer',
  code: DetailsListCustomFooterExampleCode,
  view: /*#__PURE__*/React.createElement(_DetailsListCustomFooter.DetailsListCustomFooterExample, null)
});
exports.DetailsListCustomFooterPageProps = DetailsListCustomFooterPageProps;
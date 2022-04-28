"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getStyles = exports.getCellStyles = exports.HEADER_HEIGHT = void 0;

var _styling = require("../@uifabric/styling");

var _utilities = require("../@uifabric/utilities");

var _DetailsRow = require("./DetailsRow.styles");

var _GroupSpacer = require("../GroupedList/GroupSpacer");

// For every group level there is a GroupSpacer added. Importing this const to have the source value in one place.
var GlobalClassNames = {
  tooltipHost: "ms-TooltipHost",
  root: "ms-DetailsHeader",
  cell: "ms-DetailsHeader-cell",
  cellIsCheck: "ms-DetailsHeader-cellIsCheck",
  collapseButton: "ms-DetailsHeader-collapseButton",
  isCollapsed: "is-collapsed",
  isAllSelected: "is-allSelected",
  isSelectAllHidden: "is-selectAllHidden",
  isResizingColumn: "is-resizingColumn",
  cellSizer: "ms-DetailsHeader-cellSizer",
  isResizing: "is-resizing",
  dropHintCircleStyle: "ms-DetailsHeader-dropHintCircleStyle",
  dropHintCaretStyle: "ms-DetailsHeader-dropHintCaretStyle",
  dropHintLineStyle: "ms-DetailsHeader-dropHintLineStyle",
  cellTitle: "ms-DetailsHeader-cellTitle",
  cellName: "ms-DetailsHeader-cellName",
  filterChevron: "ms-DetailsHeader-filterChevron",
  gripperBarVertical: "ms-DetailsColumn-gripperBarVertical",
  checkTooltip: "ms-DetailsHeader-checkTooltip",
  check: "ms-DetailsHeader-check",
};
var HEADER_HEIGHT = 42;
exports.HEADER_HEIGHT = HEADER_HEIGHT;

var getCellStyles = function getCellStyles(props) {
  var theme = props.theme,
    _a = props.cellStyleProps,
    cellStyleProps = _a === void 0 ? _DetailsRow.DEFAULT_CELL_STYLE_PROPS : _a;
  var semanticColors = theme.semanticColors;
  var classNames = (0, _styling.getGlobalClassNames)(GlobalClassNames, theme);
  return [
    classNames.cell,
    (0, _styling.getFocusStyle)(theme),
    {
      color: semanticColors.bodyText,
      position: "relative",
      display: "inline-block",
      boxSizing: "border-box",
      padding:
        "0 " +
        cellStyleProps.cellRightPadding +
        "px 0 " +
        cellStyleProps.cellLeftPadding +
        "px",
      lineHeight: "inherit",
      margin: "0",
      height: HEADER_HEIGHT,
      verticalAlign: "top",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
      textAlign: "left",
    },
  ];
};

exports.getCellStyles = getCellStyles;

var getStyles = function getStyles(props) {
  var _a, _b, _c, _d;

  var theme = props.theme,
    className = props.className,
    isAllSelected = props.isAllSelected,
    isResizingColumn = props.isResizingColumn,
    isSizing = props.isSizing,
    isAllCollapsed = props.isAllCollapsed,
    _e = props.cellStyleProps,
    cellStyleProps = _e === void 0 ? _DetailsRow.DEFAULT_CELL_STYLE_PROPS : _e;
  var semanticColors = theme.semanticColors,
    palette = theme.palette,
    fonts = theme.fonts;
  var classNames = (0, _styling.getGlobalClassNames)(GlobalClassNames, theme);
  var colors = {
    iconForegroundColor: semanticColors.bodySubtext,
    headerForegroundColor: semanticColors.bodyText,
    headerBackgroundColor: semanticColors.bodyBackground,
    dropdownChevronForegroundColor: palette.neutralTertiary,
    resizerColor: palette.neutralTertiaryAlt,
  };
  var cellSizerFadeInStyles = {
    opacity: 1,
    transition: "opacity 0.3s linear",
  };
  var cellStyles = getCellStyles(props);
  return {
    root: [
      classNames.root,
      fonts.small,
      {
        display: "inline-block",
        background: colors.headerBackgroundColor,
        position: "relative",
        minWidth: "100%",
        verticalAlign: "top",
        height: HEADER_HEIGHT,
        lineHeight: HEADER_HEIGHT,
        whiteSpace: "nowrap",
        boxSizing: "content-box",
        paddingBottom: "1px",
        paddingTop: "16px",
        borderBottom: "1px solid " + semanticColors.bodyDivider,
        cursor: "default",
        userSelect: "none",
        selectors:
          ((_a = {}),
          (_a["&:hover ." + classNames.check] = {
            opacity: 1,
          }),
          (_a["& ." + classNames.tooltipHost + " ." + classNames.checkTooltip] =
            {
              display: "block",
            }),
          _a),
      },
      isAllSelected && classNames.isAllSelected,
      isResizingColumn && classNames.isResizingColumn,
      className,
    ],
    check: [
      classNames.check,
      {
        height: HEADER_HEIGHT,
      },
      {
        selectors:
          ((_b = {}),
          (_b["." + _utilities.IsFocusVisibleClassName + " &:focus"] = {
            opacity: 1,
          }),
          _b),
      },
    ],
    cellWrapperPadded: {
      paddingRight:
        cellStyleProps.cellExtraRightPadding + cellStyleProps.cellRightPadding,
    },
    cellIsCheck: [
      cellStyles,
      classNames.cellIsCheck,
      {
        position: "relative",
        padding: 0,
        margin: 0,
        display: "inline-flex",
        alignItems: "center",
        border: "none",
      },
      isAllSelected && {
        opacity: 1,
      },
    ],
    cellIsGroupExpander: [
      cellStyles,
      {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: fonts.small.fontSize,
        padding: 0,
        border: "none",
        width: _GroupSpacer.SPACER_WIDTH,
        color: palette.neutralSecondary,
        selectors: {
          ":hover": {
            backgroundColor: palette.neutralLighter,
          },
          ":active": {
            backgroundColor: palette.neutralLight,
          },
        },
      },
    ],
    cellIsActionable: {
      selectors: {
        ":hover": {
          color: semanticColors.bodyText,
          background: semanticColors.listHeaderBackgroundHovered,
        },
        ":active": {
          background: semanticColors.listHeaderBackgroundPressed,
        },
      },
    },
    cellIsEmpty: {
      textOverflow: "clip",
    },
    cellSizer: [
      classNames.cellSizer,
      (0, _styling.focusClear)(),
      {
        display: "inline-block",
        position: "relative",
        cursor: "ew-resize",
        bottom: 0,
        top: 0,
        overflow: "hidden",
        height: "inherit",
        background: "transparent",
        zIndex: 1,
        width: 5,
        selectors:
          ((_c = {
            ":after": {
              content: '""',
              position: "absolute",
              top: 0,
              bottom: 0,
              width: 1,
              background: colors.resizerColor,
              opacity: 0,
              left: "50%",
            },
            ":focus:after": cellSizerFadeInStyles,
            ":hover:after": cellSizerFadeInStyles,
          }),
          (_c["&." + classNames.isResizing + ":after"] = [
            cellSizerFadeInStyles,
            {
              boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.4)",
            },
          ]),
          _c),
      },
    ],
    cellIsResizing: classNames.isResizing,
    cellSizerStart: {
      margin: "0 -3px",
    },
    cellSizerEnd: {
      margin: 0,
      marginLeft: -3,
    },
    collapseButton: [
      classNames.collapseButton,
      {
        transformOrigin: "50% 50%",
        transition: "transform .1s linear",
      },
      // isAllCollapsed ? [classNames.isCollapsed, {
      //   transform: "rotate(0deg)"
      // }] : {
      //   transform: (0, _utilities.getRTL)(theme) ? "rotate(90deg)" : "rotate(-90deg)"
      // }
    ],
    checkTooltip: classNames.checkTooltip,
    sizingOverlay: isSizing && {
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      cursor: "ew-resize",
      background: "rgba(255, 255, 255, 0)",
      selectors:
        ((_d = {}),
        (_d[_styling.HighContrastSelector] = {
          background: "transparent",
          MsHighContrastAdjust: "none",
        }),
        _d),
    },
    accessibleLabel: _styling.hiddenContentStyle,
    dropHintCircleStyle: [
      classNames.dropHintCircleStyle,
      {
        display: "inline-block",
        visibility: "hidden",
        position: "absolute",
        bottom: 0,
        height: 9,
        width: 9,
        borderRadius: "50%",
        marginLeft: -5,
        top: 34,
        overflow: "visible",
        zIndex: 10,
        border: "1px solid " + palette.themePrimary,
        background: palette.white,
      },
    ],
    dropHintCaretStyle: [
      classNames.dropHintCaretStyle,
      {
        display: "none",
        position: "absolute",
        top: -28,
        left: -6.5,
        fontSize: fonts.medium.fontSize,
        color: palette.themePrimary,
        overflow: "visible",
        zIndex: 10,
      },
    ],
    dropHintLineStyle: [
      classNames.dropHintLineStyle,
      {
        display: "none",
        position: "absolute",
        bottom: 0,
        top: 0,
        overflow: "hidden",
        height: 42,
        width: 1,
        background: palette.themePrimary,
        zIndex: 10,
      },
    ],
    dropHintStyle: {
      display: "inline-block",
      position: "absolute",
    },
  };
};

exports.getStyles = getStyles;

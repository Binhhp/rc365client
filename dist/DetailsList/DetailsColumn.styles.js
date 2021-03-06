"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStyles = void 0;

var _tslib = require("tslib");

var _styling = require("../@uifabric/styling");

var _DetailsRow = require("./DetailsRow.styles");

var _DetailsHeader = require("./DetailsHeader.styles");

var GlobalClassNames = {
  isActionable: "is-actionable",
  cellIsCheck: "ms-DetailsHeader-cellIsCheck",
  collapseButton: "ms-DetailsHeader-collapseButton",
  isCollapsed: "is-collapsed",
  isAllSelected: "is-allSelected",
  isSelectAllHidden: "is-selectAllHidden",
  isResizingColumn: "is-resizingColumn",
  isEmpty: "is-empty",
  isIconVisible: "is-icon-visible",
  cellSizer: "ms-DetailsHeader-cellSizer",
  isResizing: "is-resizing",
  dropHintCircleStyle: "ms-DetailsHeader-dropHintCircleStyle",
  dropHintLineStyle: "ms-DetailsHeader-dropHintLineStyle",
  cellTitle: "ms-DetailsHeader-cellTitle",
  cellName: "ms-DetailsHeader-cellName",
  filterChevron: "ms-DetailsHeader-filterChevron",
  gripperBarVerticalStyle: "ms-DetailsColumn-gripperBar",
  nearIcon: "ms-DetailsColumn-nearIcon"
};

var getStyles = function getStyles(props) {
  var _a;

  var theme = props.theme,
      headerClassName = props.headerClassName,
      iconClassName = props.iconClassName,
      isActionable = props.isActionable,
      isEmpty = props.isEmpty,
      isIconVisible = props.isIconVisible,
      isPadded = props.isPadded,
      isIconOnly = props.isIconOnly,
      _b = props.cellStyleProps,
      cellStyleProps = _b === void 0 ? _DetailsRow.DEFAULT_CELL_STYLE_PROPS : _b,
      transitionDurationDrag = props.transitionDurationDrag,
      transitionDurationDrop = props.transitionDurationDrop;
  var semanticColors = theme.semanticColors,
      palette = theme.palette,
      fonts = theme.fonts;
  var classNames = (0, _styling.getGlobalClassNames)(GlobalClassNames, theme);
  var colors = {
    iconForegroundColor: semanticColors.bodySubtext,
    headerForegroundColor: semanticColors.bodyText,
    headerBackgroundColor: semanticColors.bodyBackground,
    dropdownChevronForegroundColor: palette.neutralTertiary,
    resizerColor: palette.neutralTertiaryAlt
  };
  var nearIconStyle = {
    color: colors.iconForegroundColor,
    opacity: 1,
    paddingLeft: 8
  };
  var borderWhileDragging = {
    outline: "1px solid " + palette.themePrimary
  };
  var borderAfterDragOrDrop = {
    outlineColor: "transparent"
  };
  return {
    root: [(0, _DetailsHeader.getCellStyles)(props), fonts.small, isActionable && [classNames.isActionable, {
      selectors: {
        ":hover": {
          color: semanticColors.bodyText,
          background: semanticColors.listHeaderBackgroundHovered
        },
        ":active": {
          background: semanticColors.listHeaderBackgroundPressed
        }
      }
    }], isEmpty && [classNames.isEmpty, {
      textOverflow: "clip"
    }], isIconVisible && classNames.isIconVisible, isPadded && {
      paddingRight: cellStyleProps.cellExtraRightPadding + cellStyleProps.cellRightPadding
    }, {
      selectors: {
        ':hover i[data-icon-name="GripperBarVertical"]': {
          display: "block"
        }
      }
    }, headerClassName],
    gripperBarVerticalStyle: {
      display: "none",
      position: "absolute",
      textAlign: "left",
      color: palette.neutralTertiary,
      left: 1
    },
    nearIcon: [classNames.nearIcon, nearIconStyle],
    sortIcon: [nearIconStyle, {
      paddingLeft: 3,
      position: "relative",
      top: 1,
      color: "#666666"
    }],
    iconClassName: [{
      color: colors.iconForegroundColor,
      opacity: 1
    }, iconClassName],
    filterChevron: [classNames.filterChevron, {
      color: colors.dropdownChevronForegroundColor,
      paddingLeft: 6,
      verticalAlign: "middle",
      fontSize: fonts.small.fontSize
    }],
    cellTitle: [classNames.cellTitle, (0, _styling.getFocusStyle)(theme), (0, _tslib.__assign)({
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "stretch",
      boxSizing: "border-box",
      overflow: "hidden",
      padding: "0 " + cellStyleProps.cellRightPadding + "px 0 " + cellStyleProps.cellLeftPadding + "px"
    }, isIconOnly ? {
      alignContent: "flex-end",
      maxHeight: "100%",
      flexWrap: "wrap-reverse"
    } : {})],
    cellName: [classNames.cellName, {
      flex: "0 1 auto",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontWeight: _styling.FontWeights.semibold,
      fontSize: fonts.medium.fontSize
    }, isIconOnly && {
      selectors: (_a = {}, _a["." + classNames.nearIcon] = {
        paddingLeft: 0
      }, _a)
    }],
    cellTooltip: {
      display: "block",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    accessibleLabel: _styling.hiddenContentStyle,
    borderWhileDragging: borderWhileDragging,
    noBorderWhileDragging: [borderAfterDragOrDrop, {
      transition: "outline " + transitionDurationDrag + "ms ease"
    }],
    borderAfterDropping: borderWhileDragging,
    noBorderAfterDropping: [borderAfterDragOrDrop, {
      transition: "outline  " + transitionDurationDrop + "ms ease"
    }]
  };
};

exports.getStyles = getStyles;
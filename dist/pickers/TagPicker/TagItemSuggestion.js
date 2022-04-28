import * as React from "react";
import { classNamesFunction, styled } from "../../@uifabric/utilities";
import { getStyles } from "./TagItemSuggestion.styles";
import { Persona, PersonaSize, PersonaInitialsColor } from "../../Persona";
import { Customizer } from "../../@uifabric/utilities";
import { darkTheme, lightTheme } from "../../@uifabric/DefaultTheme";

var getClassNames = classNamesFunction();
/**
 * {@docCategory TagPicker}
 */
export var TagItemSuggestionBase = function (props) {
  var styles = props.styles,
    { data } = props.data,
    rcName = props.propsFromBase.rcName,
    children = props.children;
  let { propsFromBase } = props;
  const currentTheme =
    propsFromBase.darkMode === "dark" ? darkTheme : lightTheme;
  var classNames = getClassNames(styles, {
    theme: currentTheme,
  });

  return propsFromBase.type === "users"
    ? React.createElement(
        "div",
        {
          style: {
            padding: "8px 0",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            paddingRight: "10px",
            textAlign: "end",
          },
        },
        React.createElement(
          Customizer,
          { ...currentTheme },
          React.createElement(Persona, {
            className: classNames.suggestionTextOverflow,
            size: PersonaSize.size32,
            text: data.name,
            initialsColor: PersonaInitialsColor.darkBlue,
            showSecondaryText: true,
            secondaryText: data.email,
            styles: {
              secondaryText: {
                color:
                  propsFromBase.darkMode === "dark" ? "#f4f4f4" : "#605e5c",
              },
              primaryText: {
                color:
                  propsFromBase.darkMode === "dark" ? "#ffffff" : "#212121",
                selectors: {
                  ":hover": {
                    color:
                      propsFromBase.darkMode === "dark" ? "#ffffff" : "#212121",
                  },
                },
              },
            },
          })
        ),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column" } },
          React.createElement(
            "span",
            { style: { fontSize: "14px" } },
            data.department
          ),
          React.createElement(
            "span",
            { style: { fontSize: "12px" } },
            data.jobTitle
          )
        )
      )
    : React.createElement(
        "div",
        {
          className: classNames.suggestionTextOverflow,
          "data-rc-id": rcName
            ? `sp.Opt.${String(children)}.${rcName}`
            : undefined,
        },
        " ",
        children,
        " "
      );
};
export var TagItemSuggestion = styled(
  TagItemSuggestionBase,
  getStyles,
  undefined,
  { scope: "TagItemSuggestion" }
);
//# sourceMappingURL=TagItemSuggestion.js.map

// import * as React from 'react';
// import { classNamesFunction, styled } from '../../@uifabric/utilities';
// import { getStyles } from './TagItemSuggestion.styles';
// var getClassNames = classNamesFunction();
// /**
//  * {@docCategory TagPicker}
//  */
// export var TagItemSuggestionBase = function (props) {
//     var styles = props.styles, theme = props.theme, children = props.children;
//     var classNames = getClassNames(styles, {
//         theme: theme,
//     });
//     return React.createElement("div", { className: classNames.suggestionTextOverflow },
//         " ",
//         children,
//         " ");
// };
// export var TagItemSuggestion = styled(TagItemSuggestionBase, getStyles, undefined, { scope: 'TagItemSuggestion' });
// //# sourceMappingURL=TagItemSuggestion.js.map

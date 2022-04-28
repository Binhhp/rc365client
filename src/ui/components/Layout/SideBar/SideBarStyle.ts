import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const BarWrapper = styled.div`
  min-height: 44px;
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background3, theme.darkMode)};
  display: flex;
  align-items: center;
  border-bottom: 1px solid
    ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme.darkMode)};
  .ms-CommandBar,
  .ms-CommandBar-primaryCommand {
    background-color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(
        ThemeColor.Background3,
        theme.darkMode
      )} !important;
  }
`;

export const CollapseButton = styled.div`
  padding-left: 5px;
  .ms-Button--icon {
    &:hover {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(
          ThemeColor.BorderColor,
          theme.darkMode
        )};
    }
    &:active {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(
          ThemeColor.Background2,
          theme.darkMode
        )};
    }
    .ms-Button-icon {
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Primary, theme.darkMode)};
    }
  }
`;

export const LeftMenuWrapper = styled.div`
  width: ${({ theme }) => theme.width};
  height: 100%;
  box-sizing: border-box;
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background3, theme.darkMode)};
  border-right: none !important;
  .is-pc {
    width: 100%;
    height: 100%;
    border-right: 1px solid
      ${({ theme }) =>
        BuildFunction.buildColorByTheme(
          ThemeColor.BorderColor,
          theme.darkMode
        )};
  }
  .ms-FocusZone {
    width: 100%;
    nav {
      width: 100%;
      .ms-Nav-chevronButton {
        border: 0;
        font-weight: 600;
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(
            ThemeColor.Background4,
            theme.darkMode
          )};
        background-color: transparent;
        &:after {
          border-color: ${({ theme }) =>
            BuildFunction.buildColorByTheme(
              ThemeColor.Primary,
              theme.darkMode
            )};
        }
        .ms-Nav-chevron {
          color: ${({ theme }) =>
            BuildFunction.buildColorByTheme(
              ThemeColor.Primary,
              theme.darkMode
            )};
          font-weight: bold;
        }
      }
      .ms-Nav-groupContent {
        margin-bottom: 0;
      }
      .ms-Nav-navItems .ms-Nav-navItem {
        .ms-Nav-compositeLink {
          &:hover {
            a {
              background-color: ${({ theme }) =>
                BuildFunction.buildColorByTheme(
                  ThemeColor.BackgroundBlackWhite,
                  theme.darkMode
                )};
            }
          }
          a {
            color: ${({ theme }) =>
              BuildFunction.buildColorByTheme(
                ThemeColor.TextNormal,
                theme.darkMode
              )};
          }
        }
        .is-selected {
          a {
            background-color: ${({ theme }) =>
              BuildFunction.buildColorByTheme(
                ThemeColor.BorderColor,
                theme.darkMode
              )};
            &:after {
              border-color: ${({ theme }) =>
                BuildFunction.buildColorByTheme(
                  ThemeColor.Primary,
                  theme.darkMode
                )};
            }
          }
        }
      }
    }
  }

  #sideBar__layer {
    position: absolute;
    left: 5px;
    background-color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Background3, theme.darkMode)};
    width: fit-content;
    overflow-y: scroll;
    max-height: 100%;
    height: ${({ theme }) => `${theme.layerHeight}px`};
    z-index: 999;
  }

  .is-pc {
    display: block;
  }
  .is-mobile {
    display: none;
  }

  @media screen and (max-width: 850px) {
    border-right: ${({ theme }) =>
      !theme.isCollapsed
        ? `1px solid ${BuildFunction.buildColorByTheme(
            ThemeColor.BorderColor,
            theme.darkMode
          )}`
        : "none"};
    .is-pc {
      display: none;
    }
    .is-mobile {
      display: block;
    }
  }
`;

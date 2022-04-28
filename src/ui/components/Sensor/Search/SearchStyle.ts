import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const SearchWrapper = styled.div`
  .form__hr {
    &:before {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme.theme)};
    }
    div:first-child {
      background: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Background, theme.theme)};
      font-size: 15px;
      font-weight: 600;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    background-color: transparent;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.theme === "dark" ? "#c8c8c8" : "#c8c6c4"};
    border-radius: 10px;
    background-clip: content-box;
    border: solid 6px transparent;
    &:hover {
      background: #98a3a6;
      background-clip: content-box;
      border: solid 6px transparent;
    }
  }
  .ms-Stack {
    margin-bottom: 20px;
    .country__stack {
      display: flex;
      flex-direction: column;
      .country__stackLabel {
        padding: 5px 0;
        font-weight: 600;
      }
      .ms-BasePicker .ms-FocusZone .ms-SelectionZone {
        .ms-BasePicker-text {
          min-width: 0px;
        }
      }
    }
    .ms-StackItem {
      width: 100%;
      .ms-TextField {
        .ms-TextField-wrapper {
          .ms-TextField-fieldGroup {
            border-color: ${({ theme }) =>
              BuildFunction.buildColorByTheme(
                ThemeColor.BorderColor,
                theme.theme
              )};
            input::placeholder {
              color: ${({ theme }) =>
                BuildFunction.buildColorByTheme(
                  ThemeColor.TextDisabled,
                  theme.theme
                )};
              opacity: 0.5;
            }
          }
        }
        .ms-TextField-errorMessage {
          position: absolute;
        }
      }
      .ms-Dropdown-container .ms-Dropdown {
        &:hover {
          .ms-Dropdown-title {
            border-color: ${({ theme }) =>
              BuildFunction.buildColorByTheme(
                ThemeColor.BorderColor,
                theme.theme
              )};
          }
        }
      }
      .input-wrapper {
        &:after {
          border-color: ${({ theme }) =>
            BuildFunction.buildColorByTheme(
              ThemeColor.BorderColor,
              theme.theme
            )};
        }
      }
    }
  }
`;

export const SearchBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 5px 0;
  margin-bottom: 15px;
  position: relative;
  .border__err {
    border-color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Error, theme)} !important;
  }
  .item_searchLabel {
    padding: 5px 0;
    font-weight: 600;
    .isRequired {
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Error, theme)};
    }
  }
  .d-none {
    display: none;
  }
  .error__msg {
    animation-name: css-0, css-13;
    animation-duration: 0.367s;
    animation-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
    animation-fill-mode: both;
    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
      -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Error, theme)} !important;
    position: absolute;
    bottom: -10px;
    left: 0;
    font-size: 12px;
    font-weight: 400;
  }
`;

export const SearchContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .Member__action {
    display: flex;
    padding-bottom: 10px;
    .action__btn {
      margin-right: 5px;
    }
    .is-disabled {
      .ms-Button-flexContainer {
        .ms-Button-icon {
          color: ${({ theme }) =>
            BuildFunction.buildColorByTheme(
              ThemeColor.TextDisabled,
              theme
            )} !important;
        }
        .ms-Button-textContainer {
          color: ${({ theme }) =>
            BuildFunction.buildColorByTheme(
              ThemeColor.TextDisabled,
              theme
            )} !important;
        }
      }
    }
  }
  .customList-wrapper {
    border: none;
  }
`;

export const FooterPanelWrapper = styled.div`
  padding: 16px 24px;
  width: 100%;
  height: auto;
  max-height: 65px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid
    ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme.theme)};
  .ms-Button--default {
    margin-right: 8px;
  }
  .footer__actionBtn {
    display: flex;
  }
`;

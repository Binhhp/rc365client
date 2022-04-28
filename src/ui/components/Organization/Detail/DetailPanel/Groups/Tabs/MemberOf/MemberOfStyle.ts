import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

const handleType = (theme: string): string[] => {
  // [borderColor]
  if (theme === "dark") {
    return ["#ffffff"];
  }
  return ["#a6a6a6"];
};

export const MemberWrapper = styled.div`
  .form__hr {
    &:before {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
    }
    div:first-child {
      background: ${({ theme }) => handleType(theme)[0]};
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
              BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
            input::placeholder {
              color: ${({ theme }) =>
                theme.theme === "dark" ? "#a19f9d" : "gray"};
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
              BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
          }
        }
      }
      .input-wrapper {
        &:after {
          border-color: ${({ theme }) =>
            BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
        }
      }
    }
  }
`;

export const MemberContentWrapper = styled.div`
  position: relative;
  padding: 10px 22px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .Member__action {
    display: flex;
    padding-bottom: 10px;
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
      BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
  .ms-Button--default {
    margin-right: 8px;
  }
  .footer__actionBtn {
    display: flex;
  }
`;

export const GroupSearchWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  padding-botton: 15px;
  .search__label {
    padding: 5px 0;
    font-weight: 600;
  }
`;

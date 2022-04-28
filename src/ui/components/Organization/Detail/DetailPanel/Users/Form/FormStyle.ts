import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  i {
    padding-right: 10px;
    cursor: pointer;
  }
`;

export const FormWrapper = styled.div`
  .span__btn {
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme.theme)};
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    .span__ico {
      padding: 0 5px;
    }
  }
  .ConfirmWrapper-Edit {
  }
  .confirm__wrapper {
    padding: 0;
  }
  .form__hr {
    &:before {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme.theme)};
    }
    div:first-child {
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
    margin-bottom: 15px;
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

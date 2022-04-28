import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

const onHandleBorderSpinbutton = (capacity: number, theme: string) => {
  if (theme === "dark" && capacity) {
    return "#F1707B";
  }
  if (theme !== "dark" && capacity) {
    return "#A80000";
  }
  if (theme === "dark") {
    return "#fff";
  }
  return "#a6a6a6";
};

export const FormInputWrapper = styled.div`
  padding: 10px 0;
  height: 100%;
  width: 100%;
  .form__hr {
    &:before {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.BorderColor2, theme)};
    }
    div:first-child {
      font-size: 15px;
      font-weight: 600;
    }
  }
  .OC__according {
    width: fit-content;
    margin-top: 5px;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    .OC__icon {
      padding-right: 5px;
      cursor: pointer;
      font-size: 12px;
    }
  }
  .OC__title {
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    font-size: 15px;
    font-weight: 500;
  }
`;

export const InputWrapper = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  .stackItem__location {
    width: 100%;
  }
  .form__spinBtn .input-wrapper {
    &:after {
      border-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
    }
  }
  .ms-Stack {
    margin-bottom: 10px;
    .stack__required {
      width: 100%;
    }
    .SpinButtonWrapper {
      position: relative;
    }
    .input-wrapper:after {
      border-color: ${({ theme }) =>
        onHandleBorderSpinbutton(theme.capacity, theme.darkMode)} !important;
    }
    .error__span {
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Error, theme.darkMode)};
      position: absolute;
      font-size: 12px;
    }
  }
  .ms-TextField {
    .ms-TextField-errorMessage {
      position: absolute;
      padding-top: 0;
    }
    .ms-TextField-wrapper {
      position: relative;
    }
  }
`;

export const OrderConfiguarationWrapper = styled.div`
  .OC__according {
    padding: 5px;
    margin: 5px 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    width: fit-content;
    .OC__icon {
      padding-right: 8px;
      transition: linear 0.1s;
    }
  }
  .ms-Stack {
    margin-bottom: 12px;
  }
`;

export const OrderInputWrapper = styled.div`
  padding: 0 10px;
  .form__spinBtn .input-wrapper {
    &:after {
      border: none;
    }
  }
  .ms-Stack .ms-StackItem {
    width: 100%;
    .group__input {
      display: flex;
      align-items: center;
      border: ${({ theme }) =>
        theme === "dark" ? "1px solid #ffffff" : "1px solid #a6a6a6"};
      .ms-Dropdown-container {
        margin: 0;
        width: 100%;
      }
      .TextFieldWrapper-comp
        .ms-TextField
        .ms-TextField-wrapper
        .ms-TextField-fieldGroup,
      .ms-Dropdown-container .ms-Dropdown .ms-Dropdown-title {
        border: none;
      }
      .CustomSpinButton .form__spinBtn .input-wrapper {
        &:after {
          border: none;
        }
      }
      .ms-DatePicker {
        width: 55%;
      }
      .DropdownWrapper {
        width: 35%;
      }
      .ms-TextField-field {
        border: none;
      }
      .group__compartment {
        width: 10%;
        cursor: default;
        height: 32px;
        display: flex;
        align-items: center;
        padding: 0 10px;
        background-color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.Background, theme)};
      }
      .CustomDropdown
        .ms-Dropdown-container
        .ms-Dropdown
        .ms-Dropdown-titleIsPlaceHolder {
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
        opacity: 0.7;
      }
    }
  }

  @media screen and (max-width: 850px) {
    .stack__groupInput {
      flex-wrap: wrap;
      .ms-StackItem {
        margin: 0;
      }
    }
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  i {
    padding-right: 10px;
    cursor: pointer;
  }
`;

export const RenderDeadlineGroupWrapper = styled.div`
  &::-webkit-scrollbar {
    background-color: transparent;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4"};
    border-radius: 10px;
    background-clip: content-box;
    border: solid 6px transparent;
    &:hover {
      background: #98a3a6;
      background-clip: content-box;
      border: solid 6px transparent;
    }
  }
`;

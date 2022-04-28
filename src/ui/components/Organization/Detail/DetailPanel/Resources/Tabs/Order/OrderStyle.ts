import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const OrderTabWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
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
  .group__input {
    display: flex;
    align-items: center;
    border: ${({ theme }) =>
      theme === "dark" ? "1px solid #ffffff" : "1px solid #212121"};
    .TextFieldWrapper-comp {
      width: 65%;
    }
    .CustomDropdown {
      width: 35%;
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

    .group__compartment {
      cursor: default;
      height: 32px;
      display: flex;
      align-items: center;
      padding: 0 10px;
    }

    .ms-DatePicker .TextFieldWrapper-comp {
      width: 100%;
      .ms-TextField-wrapper .ms-TextField-fieldGroup {
        input::placeholder {
          color: ${({ theme }) => (theme === "dark" ? "#d0d0d0" : "#605e5c")};
        }
      }
    }

    .CustomDropdown
      .ms-Dropdown-container
      .ms-Dropdown
      .ms-Dropdown-titleIsPlaceHolder {
      color: ${({ theme }) => (theme === "dark" ? "#d0d0d0" : "#605e5c")};
    }
  }
`;

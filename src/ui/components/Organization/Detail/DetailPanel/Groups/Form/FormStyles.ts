import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const FormWrapper = styled.div`
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
  .ms-Stack {
    margin-bottom: 10px;
    .ms-StackItem {
      width: 100%;
      .ms-TextField .ms-TextField-wrapper .ms-TextField-fieldGroup {
        border-color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
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

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  i {
    padding-right: 10px;
    cursor: pointer;
  }
`;

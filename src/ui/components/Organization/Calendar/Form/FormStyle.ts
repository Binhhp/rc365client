import { BuildFunction } from "src/common/functions";
import { ThemeColor } from "src/common/style/ThemeColor";
import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
  .infomation__stack {
    width: 100%;
    height: 100%;
    .flexColumn {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;
      .ms-TextField {
        margin-bottom: 0 !important;
      }
      .ms-Dropdown .ms-Dropdown-title {
        border-color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.TextDisabled, theme)};
      }
      .ms-TextField-fieldGroup {
        i {
          color: ${({ theme }) =>
            BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
        }
      }
    }
    .ms-StackItem {
      max-width: calc(50% - 7px);
      .lbl {
        font-weight: 600;
        padding: 5px 0;
      }
      .blk__dateTimeTest {
        display: flex;
        border: 1px solid;
        border-color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.TextDisabled, theme)};
        .ms-TextField-fieldGroup,
        .ms-Dropdown-title,
        .ms-TextField-field {
          border: none !important;
        }
        .ms-Dropdown-container > div {
          padding: 0;
        }
        &::-webkit-scrollbar {
          background-color: transparent;
          cursor: pointer;
        }
        &::-webkit-scrollbar-thumb {
          background: ${({ theme }) =>
            theme === "dark" ? "#c8c8c8" : "#c8c6c4"};
          border-radius: 10px;
          background-clip: content-box;
          border: solid 6px transparent;
          &:hover {
            background: #98a3a6;
            background-clip: content-box;
            border: solid 6px transparent;
          }
        }
      }
      .blk__dateTime {
        display: flex;
        align-items: flex-end;
        border: 1px solid;
        border-color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
        width: 100%;
        margin-bottom: 15px;
        .ms-TextField-field {
          border: none;
        }
        .ms-DatePicker {
          width: 100%;
        }
        .DropdownWrapper {
          max-width: 30%;
          .ms-Dropdown-container {
            width: 100%;
          }
        }
      }
    }
    .infomation__block {
      margin-left: 14px;
    }
  }
  .m-b-10 {
    margin-bottom: 15px;
  }
  .act__timeZone {
    padding: 5px 0;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    width: fit-content;
    .OC__icon {
      padding: 0 5px;
    }
  }
`;

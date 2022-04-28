import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const CreateNewGroupWrapper = styled.div`
  padding: 40px 20px 0 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  .btn__actionGr {
    display: flex;
    .search-save__btn {
      margin-right: 8px;
    }
  }
`;

export const InfomationWrapper = styled.div`
  margin-bottom: 25px;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
  h4 {
    margin: 10px 0;
    font-weight: 600;
  }
  span {
    font-weight: 400;
  }
`;

export const FormWrapper = styled.div`
  .form__hr {
    &:before {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Background3, theme)};
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

export const FormItem = styled.div`
  .btnAdd-group {
    display: flex;
    margin-top: 10px;
    div:first-child {
      margin-left: auto;
    }
  }
`;

export const FormList = styled.div`
  overflow-y: auto;
  margin-bottom: 15px;
  &::-webkit-scrollbar {
    background-color: transparent;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme === "dark" ? "#c8c8c8" : "#c8c6c4")};
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

export const SearchingWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  .item_searchTitle {
    margin-top: 20px;
    margin-bottom: 12px;
  }
  .item_searchLabel {
    margin-bottom: 5px;
  }
  .ms-SearchBox {
    margin-bottom: 10px;
  }
  .searchItems__list {
    height: 100%;
    width: 100%;
    padding: 10px 0;
    .item__actionGr {
      .ms-Persona .ms-Persona-coin .ms-Persona-imageArea .ms-Persona-initials {
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
      }
    }
  }
  .search__infomation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search__action {
      display: flex;
      .search__listType {
        margin-right: 10px;
      }
    }
  }
`;

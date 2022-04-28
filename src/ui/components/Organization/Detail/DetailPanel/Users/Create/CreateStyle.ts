import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const CreateNewUsersWrapper = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  .exist__message {
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Error, theme)};
    margin: 5px;
  }
`;

export const InfomationWrapper = styled.div`
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
  padding: 30px 0;
  h4 {
    margin: 10px 0;
    font-weight: 600;
  }
  .btn__actionGr {
    display: flex;
    .search-save__btn {
      margin-right: 8px;
    }
  }
`;

export const FormListWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 0 5px;
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

export const FormItem = styled.div`
  .btnAdd-user {
    display: flex;
    margin: 10px 0;
    div:first-child {
      margin-left: auto;
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
        color: #ffffff;
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

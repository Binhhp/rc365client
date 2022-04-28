import styled from "styled-components";

export const CreateResourceWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  .content__wrapper {
    padding: 30px 0;
    h4 {
      margin: 10px 0;
    }
  }
  .btn__actionGr {
    display: flex;
    .search-save__btn {
      margin-right: 8px;
    }
  }
`;

export const FormListWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  opacity: ${({ theme }) => (theme.isLoadingRegister ? "0.5" : "1")};
  pointer-events: ${({ theme }) => (theme.isLoadingRegister ? "none" : "auto")};
  .btnAdd-resource {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    div:first-child {
      margin-left: auto;
    }
  }
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

import styled from "styled-components";

const onHandleTheme = (theme: {
  darkMode: string;
  isHaveTyping: boolean;
}): string[] => {
  // [backgroundColor]
  if (theme.darkMode === "dark") {
    return ["#212121"];
  }
  return ["#eaeaea"];
};
// width: ${({ theme }) => (theme.isHaveTyping ? "300px" : "32px")};

export const ButtonWrapper = styled.div`
  width: ${({ theme }) => (theme.isHaveTyping ? "300px" : "32px")};
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => (theme.isHaveTyping ? "0" : "25px")};
  background: ${({ theme }) => onHandleTheme(theme)[0]};
  cursor: pointer;
  transition: width 0.3s;
  .search__icon {
    transform: rotate(270deg);
    padding: ${({ theme }) => (theme.isHaveTyping ? "0 10px" : "0")};
  }
  .search__remove {
    padding: 0 5px;
    cursor: pointer;
    display: ${({ theme }) => (theme.isHaveTyping ? "block" : "none")};
  }
  .search__loading {
    padding: ${({ theme }) => (theme.isHaveTyping ? "0 10px" : "0")};
  }
  .TextFieldWrapper-comp {
    width: ${({ theme }) => (theme.isHaveTyping ? "100%" : "0")};
    transition: width 0.3s;
    .ms-TextField {
      width: ${({ theme }) => (theme.isHaveTyping ? "100%" : "0")};
      padding: 0;
      .ms-TextField-wrapper .ms-TextField-fieldGroup {
        border: none;
        background-color: ${({ theme }) =>
          theme.isHaveTyping
            ? onHandleTheme(theme)[0]
            : "transparent"} !important;
        input {
          border: transparent;
          background: transparent;
        }
      }
    }
  }
  &:hover {
    width: 300px !important;
    border-radius: 0;
    cursor: default;
    .search__remove {
      display: block;
    }
    .search__icon {
      padding: 0 10px;
    }
    .TextFieldWrapper-comp {
      width: 100%;
      .ms-TextField {
        width: 100%;
        .ms-TextField-wrapper .ms-TextField-fieldGroup {
          background-color: ${({ theme }) =>
            onHandleTheme(theme)[0]} !important;
        }
      }
    }
  }

  @media screen and (max-width: 850px) {
    .search__icon {
      transform: rotate(270deg);
      padding: ${({ theme }) => (theme.isHaveTyping ? "0 6px" : "0")};
    }
    .search__loading {
      padding: ${({ theme }) => (theme.isHaveTyping ? "0 6px" : "0")};
    }
    &:hover {
      width: 100% !important;
      transition: none;
    }
    .TextFieldWrapper-comp {
      transition: none;
    }
  }
`;

export const SearchButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  .loading-search {
    margin-right: 5px;
  }
`;

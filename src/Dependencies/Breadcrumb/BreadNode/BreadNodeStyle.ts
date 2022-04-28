import styled from "styled-components";

const onHandleTheme = (theme: string) => {
  if (theme === "dark") {
    return ["#ffffff"];
  }
  return ["#323130"];
};

export const NodeWrapper = styled.div`
  .node__item {
    display: flex;
    align-items: center;
    .note__main {
      display: flex;
      align-items: center;
      .ms-Dropdown {
        &:after {
          border-color: transparent;
        }
        .ms-Dropdown-caretDownWrapper {
          display: none;
        }
      }
      .selectDrop .ms-Dropdown-title {
        border: none;
        background-color: transparent;
      }
    }
    .node__icon {
      color: ${({ theme }) => onHandleTheme(theme)[0]};
      // padding-right: 12px;
    }
    .ms-Button {
      background-color: transparent;
      padding: 0 10px;
      &:hover {
        background-color: transparent;
      }
    }
  }
`;

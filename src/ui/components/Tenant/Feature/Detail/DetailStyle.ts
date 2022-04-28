import styled from "styled-components";

const handleTheme = (theme: string): string[] => {
  // [textDisabled,backgroundColor,textColor]
  if (theme === "dark") {
    return ["#A19F9D", "#333333", "#fff"];
  }
  return ["#A6A6A6", "#f8f8f8", "#212121"];
};

export const DetailFeatureWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .infomation__wrapper {
    .DropdownWrapper {
      max-width: 300px;
    }
  }
`;

export const FeatureWithLoggingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  /* display: flex;
  flex-direction: column; */
  overflow-y: scroll;
  &::-webkit-scrollbar {
    background-color: transparent;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme === "dark" ? "#c8c8c8" : "#c8c6c4")};
    border-radius: 10px;
    background-clip: content-box;
    border: solid 7px transparent;
    &:hover {
      background: #98a3a6;
      background-clip: content-box;
      border: solid 7px transparent;
    }
  }
`;

export const EditorWithLoggingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const PivotWrapper = styled.div`
  height: 100%;
  width: 100%;
  /* display: flex;
  flex-direction: column; */
  overflow: hidden;
  .tab-wrapper .ms-Pivot .ms-Button--action {
    padding: 5px 10px;
    font-size: 15px;
    &:hover {
      background-color: ${({ theme }) =>
        theme === "dark" ? "#121212" : "#f4f4f4"};
    }
  }
  .tabContent {
    div:not([class]) {
      height: 100%;
    }
  }
`;

export const ActionButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .action__title {
    font-size: 18px;
    color: ${({ theme }) => handleTheme(theme)[2]};
    font-weight: 600;
  }
  .action__btnGr {
    display: flex;
  }
  .is-disabled {
    .ms-Button-flexContainer {
      .ms-Button-icon {
        color: ${({ theme }) => handleTheme(theme)[0]} !important;
        font-size: 14px;
      }
      .ms-Button-textContainer {
        color: ${({ theme }) => handleTheme(theme)[0]} !important;
        font-size: 12px;
      }
    }
  }

  .ms-Button--commandBar .ms-Button-flexContainer .ms-Button-icon {
    font-size: 14px;
  }
  .ms-Button--commandBar .ms-Button-flexContainer .ms-Button-textContainer {
    font-size: 13px;
  }

  @media screen and (max-width: 850px) {
    .ms-Button--commandBar {
      padding: 5px 0;
      .ms-Button-flexContainer .ms-Button-textContainer .ms-Button-label {
        font-size: inherit;
      }
    }
  }
`;

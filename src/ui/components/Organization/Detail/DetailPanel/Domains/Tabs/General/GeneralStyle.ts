import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const GeneralWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
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
  .general__form {
    padding: 20px;
    .TextFieldWrapper-comp {
      height: auto !important;
    }
  }
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

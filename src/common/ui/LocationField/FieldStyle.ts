import { ThemeEnums } from "src/entity/enums";
import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const LocationFieldWrapper = styled.div`
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background, theme)};
  position: relative;
  .LocationField {
    &:active {
      .ms-TextField-fieldGroup {
        border-color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(ThemeColor.Gray, theme)};
      }
    }
    .ms-TextField-fieldGroup {
      border-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Gray, theme)};
    }
  }
`;

export const DropWrapper = styled.div`
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background, theme.darkMode)};
  padding: 15px;
  position: absolute;
  width: 100%;
  border: ${({ theme }) =>
    theme.darkMode === ThemeEnums.Dark
      ? "1px solid #656565"
      : "1px solid #d4d4d4"};
  box-shadow: rgb(0 0 0 / 25%) 0px 4px 4px;
  max-height: 300px;
  overflow: auto;
  z-index: 99;
  display: ${({ theme }) => (theme.isFocus ? "block" : "none")};
  &::-webkit-scrollbar {
    background-color: transparent;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.darkMode === ThemeEnums.Dark ? "#c8c8c8" : "#c8c6c4"};
    border-radius: 10px;
    background-clip: content-box;
    border: solid 6px transparent;
    &:hover {
      background: #98a3a6;
      background-clip: content-box;
      border: solid 6px transparent;
    }
  }

  @media screen and (max-width: 850px) {
    padding: 5px;
    width: 120%;
    max-height: 250%;
    &::-webkit-scrollbar {
      width: 15px;
      height: 15px;
    }
    &::-webkit-scrollbar-thumb {
      border: solid 4px transparent;
      &:hover {
        background: #98a3a6;
        background-clip: content-box;
        border: solid 4px transparent;
      }
    }
  }
`;

export const ValidateJsonField = styled.div`
  width: 100%;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Error, theme.darkMode)};
  justify-content: end;
  display: flex;
  font-size: 14px;
  padding-bottom: 10px;
`;

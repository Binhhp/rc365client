import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const CreateNewWrapper = styled.div`
  width: 100%;
  height: 98%;
  padding-top: 40px;
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

export const ActionWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 20px 0;
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

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 92%;
  padding: 0 20px;
`;

export const InputItemWrapper = styled.div`
  margin-bottom: 25px;
  .inputItem__label {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-weight: 600;
    }
    i {
      cursor: pointer;
      font-size: 12px;
      &:hover {
        font-weight: bold;
      }
    }
  }
  .btnAdd-group {
    display: flex;
    margin-top: 10px;
    div:first-child {
      margin-left: auto;
    }
  }
`;

import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

// border-left: 1px solid
//     ${({ theme }) => BuildFunction.buildColorByTheme(ThemeColor.Gray, theme)};

export const ListOrganizationsWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background3, theme)};
  display: flex;
  flex-direction: column;
  .page-title {
    font-size: 21px;
    margin-bottom: 15px;
    margin-top: 0;
  }

  @media screen and (max-width: 850px) {
    border-left: 0;
  }
`;

export const MainListOrganizations = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background, theme)};
  padding: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
  .ms-Button--default {
    margin: 0 15px;
  }
`;

export const OrganizationsList = styled.div`
  width: 100%;
  height: auto;
  max-height: 100%;
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  .ms-Stack .ms-Stack-inner {
    .ms-StackItem {
      width: 100%;
    }
  }
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

export const EmptyContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    max-width: 120px;
    max-height: 120px;
  }
  .emptyConent-btnCreate {
    cursor: pointer;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
  }
`;

export const ConfirmWrapper = styled.div`
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background4, theme)};
  padding: 15px;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-bottom: 25px;
  .ms-Stack {
    .ms-StackItem {
      width: 100%;
      &:not(:first-child) {
        margin-left: 15px;
      }
    }
  }
  .item__name {
    margin: 0;
    word-break: break-word;
  }
  .item__contract {
    margin: 5px 5px;
  }
  .item__location {
    display: flex;
    flex-direction: column;
    justify-content: center;
    word-break: break-all;
    p {
      margin: 0 5px;
    }
  }
  .item__listContract {
    margin: 5px 0;
    li {
      word-break: break-word;
    }
  }
`;

import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const SyncTabWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 22px;
  overflow-y: auto;
`;
export const ContentWrapper = styled.div`
  padding: 30px 0;
  .content__title,
  .content__detail {
    margin-bottom: 8px;
    margin-top: 0;
  }
  .content__title {
    font-weight: 600;
  }
  .content__btnGr {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .content__btn {
      min-width: 115px;
    }
    .ml{
      margin-left: 5px;
    }
  }
`;
export const ActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .actions__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 200px;
    height: 40px;
    background-color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Background3, theme)};
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    margin-right: 10px;
    width: 47%;
    cursor: pointer;
    &:hover {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
    }
    &:active {
      background-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.LightColor, theme)};
    }
    i {
      margin-right: 12px;
    }
  }
  @media screen and (max-width: 850px) {
    flex-direction: column;
    .actions__btn {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`;

import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const SyncTabWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 22px 0 22px;
  display: flex;
  flex-direction: column;
`;
export const ContentWrapper = styled.div`
  padding: 30px 0 30px 30px;
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
      margin: 5px;
      min-width: 115px;
    }
  }
`;
export const ActionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  max-height: 40px;
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

import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export enum BreadcrumbType {
  Organizations = "organizations",
}

export const PageWrapper = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background3, theme)};
  height: 100%;
`;

export const OrganizationNameWrapper = styled.div`
  display: flex;
  align-items: center;
  // justify-content: space-between;
  height: auto;
  min-height: 44px;
  border-bottom: ${({ theme }) =>
    theme === "dark" ? "1px solid #000000" : "1px solid #eaeaea"};
  padding: 5px 10px 0 10px;
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background3, theme)};
  .label-btn {
    font-size: 15px;
  }
`;

export const MainPageWrapper = styled.div`
  height: 100%;
  padding: 20px;
  @media screen and (max-width: 850px) {
    padding: 0;
  }
`;

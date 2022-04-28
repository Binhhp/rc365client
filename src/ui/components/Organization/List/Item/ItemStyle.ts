import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const OrganizationCardWrapper = styled.div`
  max-width: 50%;
  width: 100%;
  .cardContent {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Background, theme)};
    border-left: 10px solid
      ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)} !important;
    margin: 20px;
    padding: 20px 30px;
    border: 1px solid
      ${({ theme }) => (theme === "dark" ? "#232323" : "#ececec")};
    position: relative;
    .card__domain {
      opacity: 0.8;
      font-style: italic;
      font-size: 13px;
      word-break: break-all;
    }
    .remove-Btn {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      opacity: 0.3;
      transition: opacity 0.1s 0.2s;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    max-width: 100%;
    padding: 5px;
    margin: 10px 0;
    height: auto;
  }
  @media screen and (max-width: 850px) {
    margin: 10px 0;
    .cardContent {
      padding: 0 20px;
      margin: 0 20px;
    }
  }
`;

export const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px 0 10px 0;
  height: 100%;
  width: 100%;
  @media screen and (max-width: 850px) {
    margin: 10px 0;
  }
`;

export const TagWrapperParent = styled.div`
  margin: 0 -5px;
`;

export const OrganizationNameWrapper = styled.div`
  display: flex;
  align-items: center;
  .card__name {
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    font-size: 30px;
    font-weight: 600;
    text-decoration: none;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
    width: fit-content;
    cursor: pointer;
  }
  .companyName__edit {
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    margin: 10px;
    cursor: pointer;
  }
  .TextFieldWrapper-comp {
    width: 50%;
  }
  @media screen and (max-width: 850px) {
    .card__name {
      font-size: 21px;
      padding-left: 5px;
    }
    .TextFieldWrapper-comp {
      width: 100%;
    }
  }
`;

import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const FeatureWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 90%;
  margin: 0 auto;
  padding: 20px 0;
  .renderListWrapper {
    .ms-DetailsRow-cell {
      cursor: default;
    }
    .column__action {
      &:hover {
        font-weight: 600;
        color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(
            ThemeColor.Primary,
            theme
          )} !important;
      }
    }
    .is-disabled {
      opacity: 0.6;
    }
  }
  .CommandBarButtonWrapper {
    height: fit-content;
  }
  .text-ellipsis-3 {
    display: -webkit-box !important;
    -webkit-line-clamp: 3 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
  .is-disabledList {
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
  }
  @media screen and (max-width: 850px) {
    padding: 0;
  }
`;

export const EditContextFormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10vh;
  .edt__formt {
    padding: 0 20px;
  }
  .edt__footer {
    display: flex;
    min-height: 60px;
    padding: 0 20px;
    border-top: 1px solid;
    border-color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
    align-items: center;
    .update__btn {
      margin-right: 10px;
    }
  }
`;

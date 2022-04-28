import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const TenantWrapper = styled.div`
  padding: 15px 30px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.Background2, theme)};
  @media screen and (max-width: 850px) {
    padding: 10px 15px;
  }
`;

export const ActionButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .action__blk {
    display: flex;
    align-items: center;
    .is-disabled {
      .ms-Button-flexContainer {
        .ms-Button-icon {
          color: ${({ theme }) =>
            BuildFunction.buildColorByTheme(
              ThemeColor.TextDisabled,
              theme
            )} !important;
          font-size: 14px;
        }
        .ms-Button-textContainer {
          color: ${({ theme }) =>
            BuildFunction.buildColorByTheme(
              ThemeColor.TextDisabled,
              theme
            )} !important;
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
  }
  .tenant__info {
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    .tenant__number {
      margin-left: 10px;
    }
  }

  @media screen and (max-width: 850px) {
    .action__blk .ms-Button--commandBar {
      padding: 5px 0;
      .ms-Button-flexContainer .ms-Button-textContainer .ms-Button-label {
        font-size: inherit;
      }
    }
  }
`;

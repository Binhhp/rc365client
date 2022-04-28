import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const AppointmentListWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  }
  .text-ellipsis-3 {
    display: -webkit-box !important;
    -webkit-line-clamp: 3 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
`;

export const ConfirmContentWrapper = styled.div`
  padding: 15px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.15);
  .cfm__content {
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid;
    border-color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.TextDisabled, theme)};
    .cfm__subject {
      font-size: 18px;
      font-weigh: 500;
    }
    .cfm__rsInfo {
      font-size: 12px;
      opacity: 0.8;
    }
  }
  .cfm__times {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cfn__ico {
      font-size: 40px;
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    }
    .cfm__time__blk {
      display: flex;
      flex-direction: column;
      .cfm__title {
        font-weight: 500;
      }
    }
  }
`;

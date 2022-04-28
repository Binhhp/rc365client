import { BuildFunction } from "src/common/functions";
import { ThemeColor } from "src/common/style/ThemeColor";
import styled from "styled-components";

export const SynchronizedCalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 60px 30px 0 30px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  border-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
  .infomation {
    padding-bottom: 6px;
    h3 {
      margin: 0;
    }
    span {
      font-size: 13px;
      font-style: italic;
      opacity: 0.8;
    }
  }
  .status {
    display: flex;
    align-items: center;
    .ico__status {
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
      padding: 5px;
    }
    .ico__status,
    span {
      font-size: 18px;
    }
  }
`;

export const LastSyncWrapper = styled.div`
  .title {
    font-weight: 600;
  }
  .info {
    margin-bottom: 0;
    padding-left: 15px;
  }
  .action__gr {
    display: flex;
    align-items: center;
    padding: 30px 0;
    .btn__action {
      margin-right: 15px;
    }
  }
`;

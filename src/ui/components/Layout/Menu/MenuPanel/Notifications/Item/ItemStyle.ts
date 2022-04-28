import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

const handleType = (theme: string): string[] => {
  // [background-color,box-shadow-opacity,color,color-description-error,action-btn]
  if (theme === "dark") {
    return ["#414141", "0.3", "#ffffff", "#c4c4c4", "#69afe5"];
  }
  return ["#f8f8f8", "0.15", "#212121", "#696969", "#106ebe"];
};

const handleColorIcon = (theme: {
  darkMode: string;
  type: string;
}): string[] => {
  let { darkMode, type } = theme;
  if (darkMode === "dark") {
    const iconColorDark: any = {
      message: ["#69AFE5"],
      error: ["#F1707B"],
      success: ["#92C353"],
    };
    return iconColorDark[type] || [];
  }
  const iconColor: any = {
    message: ["#0078D4"],
    error: ["#A80000"],
    success: ["#107C10"],
  };
  return iconColor[type] || [];
};

export const ItemWrapper = styled.div`
  background-color: ${({ theme }) => handleType(theme)[0]};
  box-shadow: 0px 1px 6px rgba(0, 0, 0, ${({ theme }) => handleType(theme)[1]});
  width: 100%;
  height: auto;
  min-height: 60px;
  margin-bottom: 25px;
  cursor: default;
  padding: 25px;
  position: relative;
  .item__description {
    font-size: 12px;
  }
  .removeBtn {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    font-size: 12px;
  }
`;

export const NotificationHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header__title {
    display: flex;
    align-items: center;
    padding-right: 5px;
    i {
      padding-right: 10px;
      font-size: 16px;
      color: ${({ theme }) => handleColorIcon(theme)[0]};
    }
    h3 {
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 600;
      margin: 0;
    }
  }
  .header__time {
    font-size: 10px;
    font-weight: 400;
  }
`;
export const ActionWrapper = styled.div`
  display: flex;
  padding-top: 12px;
  .action__btn {
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    padding-right: 10px;
    cursor: pointer;
  }
`;

export const ListError = styled.div`
  ul {
    height: auto;
    max-height: 80px;
    overflow-y: auto;
    margin: 5px 0;
    padding-left: 30px;
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
  }
`;

export const ErrorDetail = styled.div`
  .error__item-title {
    cursor: pointer;
    font-size: 14px;
    margin: 0;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
  .error__item-detail {
    font-size: 12px;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Gray, theme)};
  }
`;

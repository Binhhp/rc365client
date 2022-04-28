import { TypeView } from "src/entity/enums/TypeEnums";
import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

const onHandleThemeGalleryBtn = (theme: string): string[] => {
  // [bgColor,bgColorHover]
  if (theme === "dark") {
    return ["#505050", "#1d1d1d"];
  }
  return ["#888888", "#696969"];
};

export const GalleryTabWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 10px;
`;

export const SearchGroupWrapper = styled.div`
  padding: 0 22px;
  .searchGr__action {
    display: flex;
    justify-content: space-between;
    .search__gr {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 75%;
      margin-bottom: 10px;
      .SearchBoxWrapper {
        width: 100%;
        max-width: 400px;
        margin-left: 5px;
      }
    }
    .search__btnGr {
      margin-bottom: 10px;
      display: flex;
      .ms-Button {
        margin: 0 5px;
      }
    }

    @media screen and (max-width: 850px) {
      justify-content: center;
      flex-wrap: wrap;
      .search__gr {
        width: 100%;
      }
    }
  }
  .searchGr__result {
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      background-color: transparent;
      cursor: pointer;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) =>
        theme.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4"};
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

export const GalleryListWrapper = styled.div`
  margin: 10px 0;
  padding-right: 10px;
  padding-left: 22px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  .GalleryItemWrapper {
    width: ${({ theme }) =>
      theme.typeView === TypeView.Medium ? "30%" : "100%"};
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme.darkMode)};
    font-weight: 500;
  }
  &::-webkit-scrollbar {
    background-color: transparent;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4"};
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

export const GalleryItemWrapper = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
  height: auto;
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(
      ThemeColor.BackgroundBlackWhite,
      theme.darkMode
    )};
  border: ${({ theme }) =>
    theme.isSelected
      ? `2px solid ${BuildFunction.buildColorByTheme(
          ThemeColor.Primary,
          theme.darkMode
        )}`
      : `2px solid ${BuildFunction.buildColorByTheme(
          ThemeColor.Background2,
          theme.darkMode
        )}`};
  &:hover {
    .gallery__img {
      opacity: 0.4;
    }
    .gallery__removeBtn {
      display: block;
    }
  }
  .gallery__imgWrapper {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(
        ThemeColor.BackgroundBlackWhite,
        theme.darkMode
      )};
    .gallery__img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: linear 0.2s;
    }
  }
  .gallery__removeBtn {
    position: absolute;
    display: none;
    top: 50%;
    left: 50%;
    transition: linear 0.2s;
    transform: translate(-50%, -50%);
    padding: ${({ theme }) =>
      !theme.gridView || theme.gridView === TypeView.Large ? "20px" : "10px"};
    background-color: ${({ theme }) =>
      onHandleThemeGalleryBtn(theme.darkMode)[0]};
    border-radius: 50%;
    &:hover {
      background-color: ${({ theme }) =>
        onHandleThemeGalleryBtn(theme.darkMode)[1]};
    }
    .gallery__btn {
      font-size: ${({ theme }) =>
        !theme.gridView || theme.gridView === TypeView.Large ? "40px" : "20px"};
      color: white;
    }
  }
`;

export const EmptyWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h4 {
    cursor: default;
  }
`;

export const FooterPanelWrapper = styled.div`
  padding: 16px 24px;
  width: 100%;
  height: auto;
  max-height: 65px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid
    ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme.darkMode)};
  .ms-Button--default {
    margin-right: 8px;
  }
  .footer__actionBtn {
    display: flex;
  }
`;

export const MainContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ItemUploadedWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #4c4c4c;
  border-radius: 10px;
  cursor: default;
  margin: 0 5px;
  height: 50px;
  &:hover {
    background-color: #212121;
    .uploaded__btn {
      pointer-events: auto;
      color: #4c4c4c;
    }
  }
  .uploaded__img {
    height: auto;
    width: 50px;
    object-fit: cover;
  }
  .uploaded__img,
  .uploaded__name {
    margin-right: 5px;
  }
  .uploaded__name {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .uploaded__btn {
    color: #212121;
    font-size: 16px;
    cursor: pointer;
    pointer-events: none;
  }
`;

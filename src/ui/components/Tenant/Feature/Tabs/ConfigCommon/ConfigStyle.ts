import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const ConfigCommonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .working__item {
    opacity: 0.9;
    padding: 5px 0;
    .wi__name {
      font-size: 13px;
      font-weight: 500;
    }
  }
  .panelWrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: 40px;
    .blk__error {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 10px 20px;
      h3 {
        font-weight: 500;
      }
    }
    .form__footer {
      margin-top: auto;
      display: flex;
      padding: 15px 20px;
      justify-content: space-between;
      border-top: 1px solid;
      border-color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(
          ThemeColor.BorderColor,
          theme.darkMode
        )};
      .footer__left {
        display: flex;
        .m-r-15 {
          margin-right: 5px;
        }
      }
    }
    .confirm__content {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      .confirm__mainContent {
        padding: 40px 5px 0 5px;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        h4 {
          padding: 15px;
          margin: 0;
        }
        .confirm__list {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          padding: 0 15px;
          h5 {
            margin: 0;
          }
          .list__wrapper {
            width: 100%;
            height: 100%;
            max-height: 50%;
            overflow-y: scroll;
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
        }
      }
      .confirm__footer {
        display: flex;
        padding: 15px 20px;
        border-top: 1px solid;
        border-color: ${({ theme }) =>
          BuildFunction.buildColorByTheme(
            ThemeColor.BorderColor,
            theme.darkMode
          )};
        .m-r-15 {
          margin-right: 5px;
        }
      }
    }
    .configuration__form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      .form__content {
        padding: 0 25px;
      }
    }
    .form__storage {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;
      .infomation__text {
        margin: 0;
        padding: 0 20px;
        width: 100%;
        font-size: 13px;
        font-style: italic;
      }
      .form__title {
        padding: 0 20px;
        margin: 8px 0 0 0;
      }
      .StorageTemplateWrapper {
        width: 100%;
        padding: 0 15px;
        overflow: hidden;
        .DropdownWrapper {
          margin: 0 5px;
          padding-bottom: 10px;
        }
        .txt__group {
          overflow-y: scroll;
          .storage__form {
            padding: 5px;
            h4 {
              margin: 0;
            }
            .TextFieldWrapper-comp {
              max-width: 50%;
              padding: 0 10px;
              margin: 0;
            }
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
        }
      }
    }
    .select__wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 0 15px 0 15px;
      .select__title {
        margin: 5px 5px;
      }
      .select__content {
        display: flex;
        width: 100%;
        justify-content: space-around;
        margin: 0 -5px;
        .is-disable-blk {
          opacity: 0.6;
          cursor: default !important;
        }
        .select__blk {
          background: ${({ theme }) =>
            BuildFunction.buildColorByTheme(
              ThemeColor.BackgroundBlackWhite,
              theme.darkMode
            )} !important;
          max-width: 50%;
          width: 100%;
          margin: 5px 10px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px solid
            ${({ theme }) =>
              BuildFunction.buildColorByTheme(
                ThemeColor.DarkColor,
                theme.darkMode
              )};
          box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
          h4 {
            font-size: 16px;
            margin-top: 0;
          }
          i {
            font-size: 60px;
            padding: 0 0 15px 0;
            color: ${({ theme }) =>
              BuildFunction.buildColorByTheme(
                ThemeColor.Primary,
                theme.darkMode
              )};
          }
        }
      }
    }
  }
  .logging__form {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 20px 0 20px;
    h4 {
      margin: 8px 0;
    }
    .storage__inputs {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .TextFieldWrapper-comp {
        max-width: 50%;
        padding: 5px 10px;
        width: 100%;
      }
    }
  }
`;

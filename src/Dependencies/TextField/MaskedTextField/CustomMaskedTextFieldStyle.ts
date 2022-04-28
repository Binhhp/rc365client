import { ITextFieldProps } from "..";
import styled from "styled-components";

export interface ICustomMaskedTextFieldProps extends ITextFieldProps {
  darkMode?: string;
  rcName?: string;
  isDisableFocusToLeftUnfilled?: boolean;
}

export const MaskedTextFieldWrapper = styled.div`
  .ms-TextField {
    .ms-TextField-wrapper {
      .ms-Label {
        color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#ffffff" : "#323130"};
        &:after {
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#F1707B" : "#A80000"};
        }
      }
      .ms-TextField-fieldGroup {
        &:after {
          display: none;
        }
        .ms-TextField-prefix {
          background: ${({ theme }) => theme.darkMode === "dark" && "#212121"};
          color: ${({ theme }) => theme.darkMode === "dark" && "#bababa"};
        }
        textarea {
          cursor: auto;
          &::-webkit-scrollbar {
            background-color: ${({ theme }) =>
              theme.darkMode === "dark" ? "#3c3c3c" : "#ffffff"};
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
          &::-webkit-scrollbar-button,
          &::-webkit-scrollbar-corner {
            background: transparent;
          }
          &::-webkit-scrollbar-button:horizontal:increment {
            background-image: url(https://dl.dropboxusercontent.com/u/55165267/icon2.png);
          }
          &::-webkit-scrollbar-button:end:increment {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAAi0lEQVQokWNgGAUkAUYY48SJE9n////nIaiBkfGzhYXFNAYGBgYWJHFHRkbGYCIsXMPAwDCNgYGBgQkmwsLCEvn////1BDRufffuXQyGsxkYGBjOnDnD+vv375WMjIyBODQGe3l5/cSqGY8BGBqxasZiAFaNODXDDPjz508MCwvLEhMTk9+41A1BAADmHz3RwatzCgAAAABJRU5ErkJggg==);
            background-repeat: no-repeat;
            background-position: center;
          }
          &::-webkit-scrollbar-button:start:decrement {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAAZ0lEQVQoke2MsQnDMBQF77k03kcgApkgK3g0F4HM4M7gRmgity+VGiMh9cmV/787+D3UeqSUnpLettcY4zks55wfwA4swCXpFUI4uvJNLFQDGhCbAQ2K1cBUrrY/HRFgtr11Nn9afAFsJydbydDm5gAAAABJRU5ErkJggg==);
            background-repeat: no-repeat;
            background-position: center;
          }
        }

        &::placeholder {
          color: red;
        }
      }
    }
    .ms-TextField-errorMessage {
      color: ${({ theme }) =>
        theme.errorMessage && theme.darkMode === "dark"
          ? "rgb(241, 112, 123) !important"
          : "rgb(164, 38, 44) !important"};
      padding-top: 0;
    }
  }
  .is-disabled {
    .ms-TextField-wrapper {
      .ms-Label {
        color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#797775" : "#A6A6A6"};
      }
      .ms-TextField-fieldGroup {
        border-color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#212121" : "#F4F4F4"};
        .ms-TextField-prefix {
          background-color: ${({ theme }) =>
            theme.darkMode === "dark" && "#212121"};
          span {
            color: ${({ theme }) => theme.darkMode === "dark" && "#eaeaea"};
            opacity: ${({ theme }) => theme.darkMode === "dark" && "0.5"};
          }
        }
        input,
        textarea {
          background-color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#212121" : "#F4F4F4"};
        }
        input[type="text"],
        textarea[type="text"] {
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#eaeaea" : "#A6A6A6"};
        }
        input::placeholder {
          color: ${({ theme }) =>
            theme.darkMode === "dark"
              ? "#c4c4c4 !important"
              : "#212121 !important"};
          opacity: 0.7;
        }
        i {
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#eaeaea" : "#A6A6A6"};
          opacity: ${({ theme }) => theme.darkMode === "dark" && "0.5"};
        }
      }
    }
  }
`;

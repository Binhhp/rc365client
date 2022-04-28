import styled from "styled-components";

export const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  font-family: Segoe UI;
  position: relative;
  border: ${({ theme }) =>
    theme.darkMode === "dark" ? "1px solid #000000" : "1px solid #edebe9"};
  img {
    width: 18px;
    height: 18px;
    padding-right: 17px;
  }
  .ms-DetailsHeader-cellName {
    font-weight: normal;
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    justify-items: center;
    height: 100%;
  }
  .ms-DetailsHeader {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding-top: 0;
    background-color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#1d1d1d" : "#f9f9f9"};
    .btn-closeFilter {
      i {
        padding-left: 0;
      }
      &:hover {
        background: ${({ theme }) =>
          theme.darkMode === "dark" ? "#000000" : "#f4f4f4"};
        i {
          color: #c11818;
        }
      }
    }
    .ms-DetailsHeader-cell {
      cursor: pointer;
      height: 100%;
      &:active {
        background-color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#000000" : "#F4F4F4"};
      }
      .ms-DetailsHeader-collapseButton {
        color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#ffffff" : "#333333"};
      }
      .ms-DetailsHeader-checkTooltip .ms-DetailsHeader-check {
        .ms-Check {
          .ms-Icon {
            color: ${({ theme }) => theme.darkMode === "dark" && "#ffffff"};
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"};
          }
        }
        .is-checked {
          .ms-Icon {
            color: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"} !important;
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "rgb(105, 175, 229)"} !important;
          }
        }
      }
      .settingCol-filter {
        font-size: 12px !important;
      }
      &:hover {
        background: ${({ theme }) =>
          theme.darkMode === "dark" ? "#000000" : "#F4F4F4"};
      }
      .ms-DetailsHeader-cellTitle {
        height: 30px;
        align-items: center;
        color: ${({ theme }) =>
          theme.darkMode === "dark" ? "#ffffff" : "#333333"};
        i {
          font-size: 10px;
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#D5D5D5" : "#666666"};
        }
      }
    }
    .ms-DetailsHeader-cellSizer:last-of-type {
      display: none;
    }
  }
  .ms-DetailsRow {
    cursor: pointer;
    width: 100%;
    .ms-DetailsRow-cell {
      white-space: nowrap;
      .ms-DetailsRow-check {
        .ms-Check {
          .ms-Icon {
            color: ${({ theme }) => theme.darkMode === "dark" && "#ffffff"};
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"};
          }
        }
        .is-checked {
          .ms-Icon {
            color: ${({ theme }) =>
              theme.darkMode === "dark" && "#212121"} !important;
          }
          &::before {
            background: ${({ theme }) =>
              theme.darkMode === "dark" && "rgb(105, 175, 229)"} !important;
          }
        }
      }
    }
    .ms-DetailsRow-cellCheck {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .column-icon {
      padding-left: 8px;
    }
    .name-col {
      color: ${({ theme }) =>
        theme.darkMode === "dark" ? "#ffffff" : "#212121"};
    }
    &:hover {
      background: ${({ theme }) =>
        theme.darkMode === "dark" ? "#000000" : "#F4F4F4"} !important;
      color: ${({ theme }) => theme.darkMode === "dark" && "#ffffff"};
    }
  }
  .is-selected {
    background: ${({ theme }) =>
      theme.darkMode === "dark" ? "#454545" : "#ffffff"};
    span,
    i {
      color: ${({ theme }) =>
        theme.darkMode === "dark" && "#ffffff"} !important;
    }
  }
  .ms-Check {
    cursor: pointer;
  }
  .ms-ScrollablePane--contentContainer {
    .ms-DetailsList {
      overflow-x: hidden;
      .ms-DetailsList-contentWrapper {
        .ms-FocusZone {
          color: ${({ theme }) =>
            theme.darkMode === "dark" ? "#ffffff" : "#323130"};
          .ms-List-surface {
            .ms-List-page:nth-last-child(2) {
              .ms-GroupHeader {
                border-bottom: 0;
              }
            }
          }
          .ms-GroupHeader {
            background-color: ${({ theme }) =>
              theme.darkMode === "dark" ? "#212121" : "#ffffff"};
            border-bottom: ${({ theme }) =>
              theme.darkMode === "dark"
                ? "1px solid #000000"
                : "1px solid #edebe9"};
            cursor: pointer;
            &:hover {
              background-color: ${({ theme }) =>
                theme.darkMode === "dark" ? "#000000" : "#f4f4f4"};
            }
            .ms-GroupHeader-expand {
              cursor: pointer;
              &:hover {
                background-color: ${({ theme }) =>
                  theme.darkMode === "dark" ? "#000000" : "#F4F4F4"};
              }
              i {
                color: ${({ theme }) =>
                  theme.darkMode === "dark" ? "#ffffff" : "#323130"};
              }
            }
            .ms-GroupHeader-check {
              .ms-Check {
                .ms-Icon {
                  color: ${({ theme }) =>
                    theme.darkMode === "dark" && "#ffffff"};
                }
                &::before {
                  background: ${({ theme }) =>
                    theme.darkMode === "dark" && "#212121"};
                }
              }
              .is-checked {
                .ms-Icon {
                  color: ${({ theme }) =>
                    theme.darkMode === "dark" && "#212121"} !important;
                }
                &::before {
                  background: ${({ theme }) =>
                    theme.darkMode === "dark" &&
                    "rgb(105, 175, 229)"} !important;
                }
              }
            }
          }
        }
        .ms-DetailsRow {
          background: ${({ theme }) =>
            theme.darkMode === "dark" ? "#393838" : "#ffffff"} !important;
          &:hover {
            background: ${({ theme }) =>
              theme.darkMode === "dark" ? "#000" : "#f4f4f4"} !important;
          }
        }
      }
    }
  }

  .ms-ScrollablePane--contentContainer::-webkit-scrollbar {
    background-color: ${({ theme }) =>
      theme.darkMode === "dark" ? "#3c3c3c" : "#ffffff"};
    cursor: pointer;
  }
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.darkMode === "dark" ? "#c8c8c8" : "#c8c6c4"};
    border-radius: 10px;
    background-clip: content-box;
    border: solid 6px transparent;
    &:hover {
      background: #98a3a6;
      background-clip: content-box;
      border: solid 7px transparent;
    }
  }
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button,
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-corner {
    background: transparent;
  }
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:horizontal:increment {
    background-image: url(https://dl.dropboxusercontent.com/u/55165267/icon2.png);
  }
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:end:increment {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAAi0lEQVQokWNgGAUkAUYY48SJE9n////nIaiBkfGzhYXFNAYGBgYWJHFHRkbGYCIsXMPAwDCNgYGBgQkmwsLCEvn////1BDRufffuXQyGsxkYGBjOnDnD+vv375WMjIyBODQGe3l5/cSqGY8BGBqxasZiAFaNODXDDPjz508MCwvLEhMTk9+41A1BAADmHz3RwatzCgAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
    background-position: center;
  }
  .ms-ScrollablePane--contentContainer::-webkit-scrollbar-button:start:decrement {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABmJLR0QA/wD/AP+gvaeTAAAAZ0lEQVQoke2MsQnDMBQF77k03kcgApkgK3g0F4HM4M7gRmgity+VGiMh9cmV/787+D3UeqSUnpLettcY4zks55wfwA4swCXpFUI4uvJNLFQDGhCbAQ2K1cBUrrY/HRFgtr11Nn9afAFsJydbydDm5gAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
    background-position: center;
  }
  .ms-Shimmer-shimmerWrapper {
    border-color: ${({ theme }) => theme.darkMode === "dark" && "#323130"};
    background: ${({ theme }) => theme.darkMode === "dark" && "#323130"};
  }
  .ms-ShimmerGap-root {
    background-color: ${({ theme }) => theme.darkMode === "dark" && "#212121"};
  }
  .ms-ShimmerLine-topLeftCorner,
  .ms-ShimmerLine-topRightCorner,
  .ms-ShimmerLine-bottomRightCorner,
  .ms-ShimmerLine-bottomLeftCorner {
    fill: ${({ theme }) => theme.darkMode === "dark" && "#323130"};
  }
  .ms-Shimmer-shimmerGradient {
    background: ${({ theme }) => theme.darkMode === "dark" && "#373737"};
  }
  .ms-ShimmerLine-root {
    border-color: ${({ theme }) => theme.darkMode === "dark" && "#212121"};
  }
`;

export const MenuFilterWrapper = styled.div`
  padding: 5px 0 5px 10px;
  .ms-Checkbox {
    .ms-Checkbox-label {
      .ms-Checkbox-text {
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333333")};
      }
    }
  }
  .is-checked {
    .ms-Checkbox-label {
      .ms-Checkbox-checkbox {
        background-color: ${({ theme }) => theme === "dark" && "#69afe5"};
        border-color: ${({ theme }) => theme === "dark" && "#69afe5"};
        i {
          color: ${({ theme }) => theme === "dark" && "#333333"};
        }
      }
    }
    &:hover {
      .ms-Checkbox-label {
        .ms-Checkbox-checkbox {
          background-color: ${({ theme }) => theme === "dark" && "#b3d6fc"};
          border-color: ${({ theme }) => theme === "dark" && "#b3d6fc"};
        }
      }
    }
  }
`;

import styled from "styled-components";

const handleType = (theme: string): string[] => {
  // [background-color,color,icon-color]
  if (theme === "dark") {
    return ["#3c3c3c", "#ffffff"];
  }
  return ["#ffffff", "#0078d4"];
};

export const LayoutWrapper = styled.div`
  height: auto;
  min-height: 48px;
  width: 100%;
  background-color: #0078d4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: #ffffff;
    font-weight: 700;
    font-size: 16px;
    &:hover,
    &:active,
    &:focus {
      color: #ffffff;
      text-decoration: none;
    }
    &:active:hover {
      color: #ffffff;
      text-decoration: none;
    }
  }
  @media screen and (max-width: 850px) {
    .is-pc {
      display: none;
    }
    .is-mobile {
      display: flex;
    }
  }
  @media screen and (min-width: 600px) {
    .is-pc {
      display: flex;
    }
    .is-mobile {
      display: none;
    }
  }
`;

export const HeaderTittle = styled.div`
  .ms-Link {
    color: #ffffff;
    font-weight: 700;
    font-size: 16px;
    &:hover,
    &:active,
    &:focus {
      color: #ffffff;
      text-decoration: none;
    }
    &:active:hover {
      color: #ffffff;
      text-decoration: none;
    }
  }
  @media screen and (max-width: 850px) {
    font-size: 14px;
    white-space: nowrap;
  }
`;

export const HeaderName = styled.div`
  color: #ffffff;
  font-weight: 500;
  font-size: 18px;
  @media screen and (max-width: 850px) {
    font-size: 12px;
    white-space: nowrap;
  }
`;

export const BtnWrapper = styled.div`
  padding-right: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  .ms-TooltipHost {
    height: 100%;
    position: relative;
  }
  .ms-Button--icon {
    height: 48px;
    width: 48px;
    border-radius: 0;
    color: #ffffff;
    i {
      font-size: 20px;
    }
    &:hover {
      background-color: #106ebe;
    }
    &:active {
      color: ${({ theme }) => handleType(theme)[1]};
      background-color: ${({ theme }) => handleType(theme)[0]};
    }
    &:active:hover {
      background-color: #005a9e;
      color: #ffffff;
    }
  }
  .selected {
    background-color: ${({ theme }) => handleType(theme)[0]};
    color: ${({ theme }) => handleType(theme)[1]};
    &:hover {
      color: #ffffff;
    }
    .ms-Persona .ms-Persona-coin .ms-Persona-imageArea {
      .ms-Persona-presence {
        border-color: ${({ theme }) => handleType(theme)[0]};
      }
    }
  }
  .notification-count {
    position: absolute;
    left: 55%;
    bottom: 15%;
    color: white;
    font-size: 0.6125rem;
    background-color: red;
    height: 16px;
    border-radius: 50%;
    min-width: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const UserButtonWrapper = styled.div`
  width: 48px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #106ebe;
    cursor: pointer;
    .ms-Persona .ms-Persona-coin .ms-Persona-imageArea {
      .ms-Persona-presence {
        border-color: #106ebe;
      }
    }
  }
  &:active {
    color: ${({ theme }) => handleType(theme)[1]};
    background-color: ${({ theme }) => handleType(theme)[0]};
    .ms-Persona .ms-Persona-coin .ms-Persona-imageArea {
      .ms-Persona-presence {
        border-color: ${({ theme }) => handleType(theme)[0]};
      }
    }
  }
  &:active:hover {
    background-color: #005a9e;
    color: #ffffff;
  }

  .ms-Persona .ms-Persona-coin .ms-Persona-imageArea {
    .ms-Persona-presence {
      border-color: #0078d4;
    }
    .ms-Persona-initials {
      font-weight: normal;
    }
  }
`;

export const BtnMobile = styled.div`
  padding-right: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  .ms-TooltipHost {
    height: 100%;
  }
  .ms-Button--icon {
    height: 48px;
    width: 48px;
    border-radius: 0;
    color: #ffffff;
    .ms-Button-menuIcon {
      display: none;
    }
    i {
      font-size: 16px;
    }
    &:hover {
      background-color: #106ebe;
    }
    &:active {
      color: ${({ theme }) => handleType(theme)[1]};
      background-color: ${({ theme }) => handleType(theme)[0]};
    }
    &:active:hover {
      background-color: #005a9e;
      color: #ffffff;
    }
  }
  @media screen and (max-width: 850px) {
    .ms-Button--icon {
      height: 100%;
    }
  }
`;

export const ContentWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0 5px 25px;
  @media screen and (max-width: 850px) {
    flex-direction: column;
    justify-content: center;
    align-items: normal;
  }
`;

export const HeaderContain = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  margin-bottom: auto;
`;

// export const MainPagesWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   height: 100%;
// `;

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .ms-Callout-main {
    &::-webkit-scrollbar {
      background-color: transparent;
      cursor: pointer;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => (theme === "dark" ? "#c8c8c8" : "#c8c6c4")};
      border-radius: 10px;
      background-clip: content-box;
      border: solid 7px transparent;
      &:hover {
        background: #98a3a6;
        background-clip: content-box;
        border: solid 7px transparent;
      }
    }
  }
  @media screen and (max-width: 850px) {
    .ms-Stack .left__bar {
      position: absolute;
      top: 0;
      left: 0;
    }
    .main__content {
      padding-left: 40px;
    }
  }
`;

export const LoadingNotification = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  background-color: rgb(255, 255, 255, 0);
`;

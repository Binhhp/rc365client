import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding-top: 40px;
  .edit__organizationName {
    margin: 10px 22px;
    font-weight: 600;
  }
`;

export const MainContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  .tabContent {
    div:not([class]) {
      height: 100%;
    }
  }
  .tab-wrapper {
    margin: 0 22px;
  }
`;

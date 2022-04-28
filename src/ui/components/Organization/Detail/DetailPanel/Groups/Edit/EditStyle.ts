import styled from "styled-components";

export const EditWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  .edit__organizationName {
    margin: 10px 22px;
    font-weight: 600;
  }
`;

export const MainWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
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

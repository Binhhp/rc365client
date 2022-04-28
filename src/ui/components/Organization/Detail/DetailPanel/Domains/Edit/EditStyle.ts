import styled from "styled-components";

export const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-top: 40px;
  .edit__organizationName,
  .tab-wrapper {
    padding: 0 20px;
  }
  .tabContent {
    div:first-child {
      height: 100%;
    }
  }
`;

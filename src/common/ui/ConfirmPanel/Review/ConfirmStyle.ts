import styled from "styled-components";

export const ConfirmWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  .confirm__title {
    margin-bottom: 20px;
    white-space: break-spaces;
  }
`;

export const ConfirmItemsWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 2px;
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
`;

export const ConfirmCloseWrapper = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  .confirm__action {
    margin: 6px 0;
    display: flex;
    .ms-Button--default {
      margin-right: 10px;
    }
  }
`;

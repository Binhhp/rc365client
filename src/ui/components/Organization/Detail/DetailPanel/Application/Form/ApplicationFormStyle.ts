import styled from "styled-components";

export const FormWrapper = styled.div`
  padding: 20px 5px;
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  overflow-y: auto;
  .ms-Stack {
    width: 100%;
    height: 100%;
    flex-wrap: nowrap;
    .ms-StackItem {
      width: 100%;
    }
  }
  .application__form {
    padding-left: 15px;
    margin: 0 auto;
    width: 90%;
    display: flex;
    flex-direction: column;
    .ms-TextField {
      margin-bottom: 15px;
    }
    .ms-Stack {
      .ms-StackItem {
        margin-bottom: 15px;
        .input-wrapper {
          width: 50%;
          border: 1px solid;
          &:after {
            border: none;
          }
        }
      }
    }
    .application__submitGr {
      display: flex;
      justify-content: flex-end;
      margin: 10px 0;
    }
  }

  @media screen and (max-width: 850px) {
    .application__form {
      width: 100%;
      padding-left: 0;
      .application__submitGr {
        justify-content: center;
      }
    }
    .ms-Stack {
      flex-wrap: wrap;
      padding: 0 10px;
      .application__statusGr {
        margin: 0;
        height: 100%;
      }
    }
    .synch__actionBtn {
      flex-direction: column;
      .actions__btn {
        padding: 5px 10px;
        height: auto !important;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  }
`;

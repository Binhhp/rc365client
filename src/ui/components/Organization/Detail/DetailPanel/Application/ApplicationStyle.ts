import { FullSize } from "src/common/style/Styles";
import styled from "styled-components";

export const ApplicationWrapper = styled(FullSize)`
  .ms-Stack {
    height: 100%;
    width: 100%;
    flex-flow: wrap;
    .Application__Form {
      max-width: 40%;
      width: 100%;
    }
    .Application__List {
      max-width: 60%;
      width: 100%;
    }
  }
  @media screen and (max-width: 850px) {
    overflow-y: scroll;
    .ms-Stack {
      .Application__Form,
      .Application__List {
        max-width: 100%;
      }
      .Application__List .ListWrapper {
        min-height: 500px;
        padding: 0;
        .synch__actionBtn {
          .actions__btn {
            width: 100%;
            margin: 5px 0;
          }
        }
      }
    }
  }
`;

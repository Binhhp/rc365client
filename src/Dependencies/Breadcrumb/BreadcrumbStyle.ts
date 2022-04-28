import styled from "styled-components";

export const BreadcrumbWrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  .note__root{
    button{
      cursor: default;
    }
    span.ms-Button-label{
      cursor: pointer;
      &:hover{
        color: #0078d4;
      }
    }
  }
  .note__child{
    cursor: default;
    span.ms-Button-label{
      cursor: default;
    }
  }
`;

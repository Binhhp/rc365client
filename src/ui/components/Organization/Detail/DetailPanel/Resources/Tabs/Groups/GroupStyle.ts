import styled from "styled-components";

export const GroupTabWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 22px;
  display: flex;
  flex-direction: column;
  .customList-wrapper {
    border: none;
  }
  .group__action {
    padding: 0px 20px;
    display: flex;
    .save__btn {
      margin-right: 15px;
      button {
        width: 100%;
      }
    }
    .group__actionDisplay {
      display: flex;
    }
  }
`;

export const GroupSearchWrapper = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  .search__label {
    padding: 5px 0;
    font-weight: 600;
  }
`;

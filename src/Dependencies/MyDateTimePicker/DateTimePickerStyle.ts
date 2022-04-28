import styled from "styled-components";

export const DateTimePickerWrapper = styled.div`
  .ms-TextField-fieldGroup i {
    color: ${({ theme }) => (theme === "dark" ? "#fff" : "#a6a6a6")};
  }
`;

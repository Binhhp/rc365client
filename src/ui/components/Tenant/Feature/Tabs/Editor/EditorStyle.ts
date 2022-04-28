import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const EditorWrapper = styled.div`
  width: 100%;
  height: 100%;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme.darkMode)};
  padding: ${({ theme }) => (!theme.withLogging ? "20px" : "30px 60px")};
  display: flex;
  flex-direction: column;
  textarea {
    width: 100%;
    height: 100%;
    word-break: break-all;
  }
  .TextFieldWrapper-comp,
  .editor__field,
  .ms-TextField-wrapper,
  .ms-TextField-fieldGroup {
    height: 100%;
  }
  .editor__title {
    margin-top: 0;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme.darkMode)};
  }
  .err__message {
    min-height: 23px;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Error, theme.darkMode)};
    display: flex;
    justify-content: flex-end;
    font-weight: 500;
  }
  @media screen and (max-width: 850px) {
    padding: 0;
  }
`;

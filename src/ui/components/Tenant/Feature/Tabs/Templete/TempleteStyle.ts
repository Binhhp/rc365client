import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const TempleteWrapper = styled.div`
  width: 100%;
  height: auto;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
  padding: 0 30px;

  .form__field,
  .form__checkbox {
    margin: 10px 0;
  }
  .form__checkbox {
    padding: 0 10px;
  }
  .form__block {
    display: flex;
    flex-wrap: wrap;
    h3 {
      width: 100%;
    }
    .form__item {
      min-width: 50%;
      padding: 5px 20px;
      p {
        width: 100%;
        margin: 5px;
        padding: 0 10px;
      }
      .TextFieldWrapper-comp {
        max-width: 100%;
        width: 100%;
        padding: 0 15px;
      }
      .SpinButtonWrapper {
        padding: 0 15px;
        .input-wrapper {
          border-color: ${({ theme }) =>
            theme === "dark" ? "#fff" : "#a6a6a6"};
          &:after {
            border-color: ${({ theme }) =>
              theme === "dark" ? "#fff" : "#a6a6a6"};
          }
        }
      }
    }
  }
  @media screen and (max-width: 850px) {
    padding: 0;
    .form__block .form__item {
      padding: 5px 0;
      width: 100%;
    }
  }
`;

export const InvalidWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  .invalid__btn {
    font-weight: 600;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    cursor: pointer;
  }
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  .invalid__btn {
    font-weight: 600;
    color: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Primary, theme)};
    cursor: pointer;
  }
`;

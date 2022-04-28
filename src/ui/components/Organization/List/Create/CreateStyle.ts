import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const CreateOrganizationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const FormWrapper = styled.div`
  padding: 50px 20px;
  .TextFieldWrapper-comp {
    margin-bottom: 25px;
  }
`;

export const FooterWrapper = styled.div`
  padding: 16px 24px;
  width: 100%;
  height: auto;
  max-height: 65px;
  display: flex;
  border-top: 1px solid
    ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.BorderColor, theme)};
  .ms-Button--default {
    margin-right: 8px;
  }
`;

import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const StorageTemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 60px);
  height: auto;
  padding: 15px 30px;
  margin-top: 8px;
  .ms-Callout {
    width: auto !important;
    min-width: 150px;
}
  .DropdownWrapper {
    max-width: 45%;
    margin: 10px;
  }
  .txt__group {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .TextFieldWrapper-comp {
      width: 100%;
      max-width: 45%;
      margin: 10px;
    }
    .storage__form{
      width: 100%;
      display: flex;
      flex-direction: column;
      color: ${({ theme }) =>
        BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
      .storage__inputs{
        display: flex;
    width: 100%;
    flex-wrap: wrap;
      }
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

export const ContextDefault = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .group_btn_storage{
    width: auto;
    > button{
      margin-left: 6px;
    }
  }
  .btn_storage{
    cursor: pointer;
    padding: 0;
    border: none;
    min-width: min-content;
    &:hover {
      background-color: white;
    }
  }
`

export const LoadingWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`
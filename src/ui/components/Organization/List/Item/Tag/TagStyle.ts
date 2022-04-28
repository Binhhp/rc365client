import styled from "styled-components";
import { BuildFunction } from "src/common/functions/BuildFuntions";
import { ThemeColor } from "src/common/style/ThemeColor";

export const TagItemWrapper = styled.div`
  margin: 5px;
  padding: 8px;
  border-radius: 25px;
  background: ${({ theme }) => (theme === "dark" ? "#484848" : "#eaeaea")};
  display: flex;
  align-items: center;
  color: ${({ theme }) =>
    BuildFunction.buildColorByTheme(ThemeColor.TextNormal, theme)};
  .item__icon,
  .item__number {
    padding: 0 5px;
  }
  &:hover {
    background: ${({ theme }) =>
      BuildFunction.buildColorByTheme(ThemeColor.Background3, theme)};
    cursor: pointer;
  }
`;

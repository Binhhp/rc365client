import styled from "styled-components";
import { IProgressIndicatorProps } from "./ProgressIndicator.types";

// <ProgressIndicatorProps>
export interface ICustomProgressProps extends IProgressIndicatorProps {
  darkMode?: string;
}
// </ProgressIndicatorProps>

export const ProgressWrapper = styled.div`
  width: 100%;
  height: 100%;
  .ms-ProgressIndicator {
    .ms-ProgressIndicator-itemName {
      color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#212121")};
    }
    .ms-ProgressIndicator-itemDescription {
      color: ${({ theme }) => (theme === "dark" ? "#eaeaea" : "#605e5c")};
    }
    .ms-ProgressIndicator-itemProgress {
      .ms-ProgressIndicator-progressTrack {
        background-color: ${({ theme }) =>
          theme === "dark" ? "#005A9E" : "#edebe9"};
      }
      .ms-ProgressIndicator-progressBar {
        background: ${({ theme }) =>
          theme === "dark" ? "#69afe5" : "#005A9E"};
      }
    }
  }
`;

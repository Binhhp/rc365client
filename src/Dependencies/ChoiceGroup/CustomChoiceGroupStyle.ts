import styled from "styled-components";
import { IChoiceGroupProps } from "./ChoiceGroup.types";

// <ChoiceGroupProps>
export interface ICustomChoiceGroupProps extends IChoiceGroupProps {
  darkMode?: string;
}
// </ChoiceGroupProps>

export const ChoiceGroupWrapper = styled.div`
  .ms-ChoiceFieldGroup {
    .ms-ChoiceFieldGroup-flexContainer {
      .ms-ChoiceField {
        color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#323130")};
        .is-disabled {
          pointer-events: none;
          &::before,
          &::after {
            border-color: ${({ theme }) =>
              theme === "dark" ? "#c8c8c8" : "#c8c6c4"} !important;
          }
        }
        .is-disabled {
          &:not(.ms-ChoiceField-input) {
            opacity: ${({ theme }) => theme === "dark" && "0.5"};
          }
        }
      }
      .is-checked {
        &:hover {
          .ms-ChoiceFieldLabel {
            color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#323130")};
          }
        }
        &:hover::before,
        &:hover::after {
          border-color: ${({ theme }) =>
            theme === "dark" ? "#b3d6fc" : "#0e7aaa"} !important;
        }
        &::after {
          border-color: ${({ theme }) =>
            theme === "dark" ? "#69afe5" : "#1196d1"};
        }
        &::before {
          background-color: ${({ theme }) =>
            theme === "dark" ? "#333333" : "#ffffff"};
          border-color: ${({ theme }) =>
            theme === "dark" ? "#69afe5" : "#1196d1"} !important;
        }
        &:hover::after {
          background-color: ${({ theme }) =>
            theme === "dark" ? "#f4f4f4" : "#605e5c"};
        }
      }
      .ms-ChoiceField-field {
        &:hover {
          .ms-ChoiceFieldLabel {
            color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#323130")};
          }
        }
        &::before {
          background-color: ${({ theme }) =>
            theme === "dark" ? "#333333" : "#ffffff"};
          border-color: ${({ theme }) =>
            theme === "dark" ? "#f4f4f4" : "#323130"};
        }
        &:hover::after {
          background-color: ${({ theme }) =>
            theme === "dark" ? "#f4f4f4" : "#605e5c"};
        }
      }
    }
  }
`;

// .field-53 {
//   &::before {
//     background-color: ${({ theme }) =>
//       theme === "dark" ? "#333333" : "#ffffff"};
//     border-color: ${({ theme }) =>
//       theme === "dark" ? "#c8c8c8" : "#c8c6c4"};
//   }
//   &:hover::after {
//     background-color: ${({ theme }) =>
//       theme === "dark" ? "#c8c8c8" : "#c8c6c4"};
//   }
// }

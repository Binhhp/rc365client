import { NewErrorType } from "../constants/ErrorTypes";
import { ValidateFunctions } from "./ValidFunction";

export interface IRenderErrorMessageField {
  key: string;
  base: any;
  errors: ErrorFieldItem[];
  maxLength?: number;
  minLength?: number;
  existArray?: any[];
}

export interface IValidateStringAndReturnErrors {
  key: string;
  str: string;
  types: NewErrorType[];
  errors: ErrorFieldItem[];
  maxLength?: number;
  minLength?: number;
  existArray?: any[];
}

export interface ErrorFieldItem {
  key: string;
  error: NewErrorType;
}

export const convertCamelToNormalCase = (str: string): string => {
  let text = str.replace(/([A-Z])/g, " $1");
  let result = text.charAt(0).toUpperCase() + text.slice(1);
  return result;
};

export class FieldValidateFunctions {
  public static RenderErrorMessageField = (
    obj: IRenderErrorMessageField
  ): string => {
    let { key, base, errors, maxLength, minLength, existArray } = obj;
    try {
      let tenantData = Object.entries(base);
      let item = tenantData.find(
        (t) =>
          (t[0].indexOf("_") !== -1 && t[0].split("_")[1] === key) ||
          t[0] === key
      );
      if (item) {
        let value = item[1];
        let name = item[0];
        if (name.indexOf("_") !== -1) {
          name = item[0].split("_")[1];
        }
        if (
          errors.some(
            (e) =>
              (e.key === key ||
                (e.key.indexOf("_") !== -1 && e.key.split("_")[1] === key)) &&
              e.error === NewErrorType.Empty
          ) &&
          typeof value === "string" &&
          value.trim() === ""
        ) {
          return `Enter ${convertCamelToNormalCase(name)}.`;
        }
        if (
          errors.some(
            (e) =>
              (e.key === key ||
                (e.key.indexOf("_") !== -1 && e.key.split("_")[1] === key)) &&
              e.error === NewErrorType.Length
          ) &&
          value !== "" &&
          typeof value === "string" &&
          ValidateFunctions.isInvalidStringLength(value, maxLength, minLength)
        ) {
          if ((minLength && value.length < minLength) || value.length <= 0) {
            return `Minimum character is ${minLength ? minLength : "1"}.`;
          }
          return `Maximum character is ${maxLength ? maxLength : "256"}.`;
        }
        if (
          errors.some(
            (e) =>
              (e.key === key ||
                (e.key.indexOf("_") !== -1 && e.key.split("_")[1] === key)) &&
              e.error === NewErrorType.Select
          ) &&
          typeof value === "string" &&
          value.trim() === ""
        ) {
          return `Select ${convertCamelToNormalCase(name)}.`;
        }
        if (
          errors.some(
            (e) =>
              (e.key === key ||
                (e.key.indexOf("_") !== -1 && e.key.split("_")[1] === key)) &&
              e.error === NewErrorType.Exist
          ) &&
          typeof value === "string" &&
          existArray &&
          ValidateFunctions.onValidateEmailAlreadyExist(value, existArray) &&
          value !== ""
        ) {
          return `${convertCamelToNormalCase(name)} already exists.`;
        }
        if (
          errors.some(
            (e) =>
              (e.key === key ||
                (e.key.indexOf("_") !== -1 && e.key.split("_")[1] === key)) &&
              e.error === NewErrorType.Email
          ) &&
          typeof value === "string" &&
          !ValidateFunctions.onValidateIsEmail(value) &&
          value !== ""
        ) {
          return `Invalid email name.`;
        }
        if (
          errors.some(
            (e) =>
              (e.key === key ||
                (e.key.indexOf("_") !== -1 && e.key.split("_")[1] === key)) &&
              e.error === NewErrorType.Max
          ) &&
          typeof value === "string" &&
          obj.maxLength &&
          !isNaN(Number(value)) &&
          Number(value) > obj.maxLength
        ) {
          return `Invalid email name.`;
        }
        if (
          errors.some(
            (e) =>
              (e.key === key ||
                (e.key.indexOf("_") !== -1 && e.key.split("_")[1] === key)) &&
              e.error === NewErrorType.Domain
          ) &&
          typeof value === "string" &&
          value.trim() !== "" &&
          !ValidateFunctions.onVerifyDomain(value)
        ) {
          return `Invalid domain.`;
        }
      }
      return "";
    } catch {
      return "Something went wrong.";
    }
  };
  public static ValidateStringAndReturnErrors = (
    obj: IValidateStringAndReturnErrors
  ) => {
    let { key, str, types, errors, existArray } = obj;
    let crtErrors = [...errors];
    // [CASE EMPTY VALUE TEXT FIELD]
    if (types.some((t) => t === NewErrorType.Empty) && str?.trim() === "") {
      let item: ErrorFieldItem = {
        key,
        error: NewErrorType.Empty,
      };
      crtErrors = crtErrors.filter((e) => e.key !== key);
      crtErrors.push(item);
      return crtErrors;
    }
    if (types.some((t) => t === NewErrorType.Empty) && str?.trim() !== "") {
      crtErrors = crtErrors.filter((e) => e.key !== key);
    }

    // [CASE MAX && MIN LENGTH TEXT FIELD]
    if (
      types.some((t) => t === NewErrorType.Length) &&
      str.trim() !== "" &&
      ValidateFunctions.isInvalidStringLength(str, obj.maxLength, obj.minLength)
    ) {
      let item: ErrorFieldItem = {
        key,
        error: NewErrorType.Length,
      };
      crtErrors = crtErrors.filter((e) => e.key !== key);
      crtErrors.push(item);
      return crtErrors;
    }
    if (
      types.some((t) => t === NewErrorType.Length) &&
      str.trim() !== "" &&
      !ValidateFunctions.isInvalidStringLength(
        str,
        obj.maxLength,
        obj.minLength
      )
    ) {
      crtErrors = crtErrors.filter((e) => e.key !== key);
    }

    // [CASE SELECT DROPDOWN]
    if (types.some((t) => t === NewErrorType.Select) && str.trim() === "") {
      let item: ErrorFieldItem = {
        key,
        error: NewErrorType.Select,
      };
      crtErrors = crtErrors.filter((e) => e.key !== key);
      crtErrors.push(item);
      return crtErrors;
    }
    if (types.some((t) => t === NewErrorType.Select) && str.trim() !== "") {
      crtErrors = crtErrors.filter((e) => e.key !== key);
    }

    // [CASE VALIDATE EMAIL]
    if (
      types.some((t) => t === NewErrorType.Email) &&
      !ValidateFunctions.onValidateIsEmail(str)
    ) {
      let item: ErrorFieldItem = {
        key,
        error: NewErrorType.Email,
      };
      crtErrors = crtErrors.filter((e) => e.key !== key);
      crtErrors.push(item);
      return crtErrors;
    }
    if (
      types.some((t) => t === NewErrorType.Email) &&
      ValidateFunctions.onValidateIsEmail(str)
    ) {
      crtErrors = crtErrors.filter((e) => e.key !== key);
    }

    // [CASE EMAIL ALREADY EXIST]
    if (
      types.some((t) => t === NewErrorType.Exist) &&
      str.trim() !== "" &&
      existArray &&
      ValidateFunctions.onValidateEmailAlreadyExist(str, existArray)
    ) {
      let item: ErrorFieldItem = {
        key,
        error: NewErrorType.Exist,
      };
      crtErrors = crtErrors.filter((e) => e.key !== key);
      crtErrors.push(item);
      return crtErrors;
    }
    if (
      types.some((t) => t === NewErrorType.Exist) &&
      str.trim() !== "" &&
      existArray &&
      !ValidateFunctions.onValidateEmailAlreadyExist(str, existArray)
    ) {
      crtErrors = crtErrors.filter((e) => e.key !== key);
    }

    // [CASE MAX VALUE]
    if (
      types.some((t) => t === NewErrorType.Max) &&
      str.trim() !== "" &&
      !isNaN(Number(str)) &&
      obj.maxLength &&
      Number(str) > obj.maxLength
    ) {
      let item: ErrorFieldItem = {
        key,
        error: NewErrorType.Max,
      };
      crtErrors = crtErrors.filter((e) => e.key !== key);
      crtErrors.push(item);
      return crtErrors;
    }
    if (
      types.some((t) => t === NewErrorType.Max) &&
      str.trim() !== "" &&
      !isNaN(Number(str)) &&
      obj.maxLength &&
      Number(str) <= obj.maxLength
    ) {
      crtErrors = crtErrors.filter((e) => e.key !== key);
    }

    // [CASE VALIDATE IS DOMAIN]
    if (
      types.some((t) => t === NewErrorType.Domain) &&
      str.trim() !== "" &&
      !ValidateFunctions.onVerifyDomain(str)
    ) {
      let item: ErrorFieldItem = {
        key,
        error: NewErrorType.Domain,
      };
      crtErrors = crtErrors.filter((e) => e.key !== key);
      crtErrors.push(item);
      return crtErrors;
    }
    if (
      types.some((t) => t === NewErrorType.Domain) &&
      str.trim() !== "" &&
      ValidateFunctions.onVerifyDomain(str)
    ) {
      crtErrors = crtErrors.filter((e) => e.key !== key);
    }

    return crtErrors;
  };
}

export class ValidatorJsonFile {
  public isValid: boolean;
  public errorMessage: string;
  constructor() {
    this.isValid = false;
    this.errorMessage = "";
  }
  set(isValid: boolean, errorMessage: string): void {
    this.isValid = isValid;
    this.errorMessage = errorMessage;
  }
}
export class ValidatorJsonExpression {
  static check(value: string): boolean {
    try {
      if (value.trim() === "" || value === undefined) return true;
      const data = JSON.parse(value);
      if (data === null || data === undefined || data === "") return true;
    } catch {
      return true;
    }
    return false;
  }
  static checkIsHaveDBSameName(value: string, key: string): boolean {
    try {
      if (!value || value.trim() === "") return true;
      let data = JSON.parse(value);
      if (data && data.Databases && Array.isArray(data.Databases)) {
        let db = [...data.Databases];
        var valueArr = db.map(function (item) {
          return item[key];
        });
        var isDuplicate = valueArr.some(function (item, idx) {
          return valueArr.indexOf(item) !== idx;
        });
        return isDuplicate;
      }
    } catch {
      return false;
    }
    return false;
  }
}

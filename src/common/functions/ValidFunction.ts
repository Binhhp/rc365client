export class ValidateFunctions {
  public static removeVietnameseCharacters = (str: string): string => {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Combining Diacritical Marks
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // huyền, sắc, hỏi, ngã, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // mũ â (ê), mũ ă, mũ ơ (ư)
    // str = str.replace(
    //   /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    //   ""
    // );
    return str;
  };

  public static isInvalidStringLength = (
    str: string,
    max?: number,
    min?: number
  ) => {
    let minLength = typeof min === "number" && min > 0 ? min : 0;
    let maxLength = max && typeof min === "number" && max > min ? max : 256;
    if (str.trim().length > maxLength || str.trim().length < minLength) {
      return true;
    }
    return false;
  };

  public static onValidateIsEmail = (email: string) => {
    let nameSignRemoved = ValidateFunctions.removeVietnameseCharacters(email);
    if (
      email.trim() === "" ||
      email.startsWith(".") ||
      nameSignRemoved !== email ||
      (email.indexOf("@") !== -1 && email.split("@")[0].endsWith("."))
    ) {
      return false;
    }
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    // const re =
    //   /^(([^<>(){}\[\]\\!#$%&*|^+=`~.?,;:\s@"\u0374-\u03FF]+(\.[^<>()\[\]\\!#$%&*|^+=`~?,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
    return re.test(String(email.trim()).toLowerCase());
  };

  public static IsValidEmailName = (str: string) => {
    const re =
      /^(([^<>(){}\[\]\\!#$%&*|^+=`~?,;:\s@"]+(\.[^<>()\[\]\\!#$%&*|^+=`~?,;:\s@"]+)*)|(".+"))$/; //eslint-disable-line
    let nameSignRemoved = ValidateFunctions.removeVietnameseCharacters(str);
    if (str.endsWith(".") || str.startsWith(".") || nameSignRemoved !== str) {
      return false;
    }
    return re.test(str.trim());
  };

  public static onValidateEmailAlreadyExist = (
    email: string,
    dataArr: any[]
  ): boolean => {
    if (email.trim() === "") {
      return true;
    }
    let currentDataArr = [...dataArr];
    let count = currentDataArr.filter((data) => data.email === email).length;
    return count > 1;
  };

  public static onVerifyDomain = (domain: string): boolean => {
    //eslint-disable-next-line
    if (
      domain.length > 64 ||
      domain.trim() === "" ||
      domain.startsWith(".") ||
      domain.endsWith(".")
    ) {
      return false;
    }
    let re =
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/; //test with this line
    return re.test(domain);
  };

  public static onConvertTextToUnicode = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
}

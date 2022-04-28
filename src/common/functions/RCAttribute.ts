export const nameAttibute = "data-rc-id";

export interface IBuildRCAttribute {
  [nameAttibute]: string;
}

export interface ISettingUI {
  name: string;
  workingTab: string;
}

export enum UISettingKey {
  ORGANIZATION_LIST = "ORGANIZATION_LIST",
  SENSOR_LIST = "SENSOR_LIST",
}

export const BuildRCAttribute = (value: string): IBuildRCAttribute => {
  return { [nameAttibute]: value };
};

function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
  myEnum: T,
  enumValue: string
): keyof T | string {
  let keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : "";
}

export const onHandleLocalStorageForPivot = (name: string, workingTab: any) => {
  let settings = localStorage.getItem("UISettings");
  if (!settings) {
    let sample: ISettingUI = {
      name: getEnumKeyByEnumValue(UISettingKey, name),
      workingTab,
    };
    localStorage.setItem("UISettings", JSON.stringify([sample]));
  }
  if (settings) {
    let Obj = JSON.parse(settings);
    let newItem: ISettingUI = {
      name: getEnumKeyByEnumValue(UISettingKey, name),
      workingTab,
    };
    if (Array.isArray(Obj)) {
      let idxStorage = Obj.findIndex((o) => o.name === name);
      if (idxStorage === -1) {
        Obj.push(newItem);
      }
      if (idxStorage !== -1) {
        Obj.splice(idxStorage, 1, newItem);
      }
      localStorage.setItem("UISettings", JSON.stringify(Obj));
    }
  }
};

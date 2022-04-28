import { IDropdownOption } from "aod-dependencies/Dropdown";
import countryCity from "src/common/constants/country.json";
import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { ThemeEnums, TypeNotification } from "src/entity/enums";
import { NotificationItem } from "../classes/BaseNotificationItem";
import { DarkTheme, LightTheme, ThemeColor } from "../style/ThemeColor";
import { IContextualMenuItem } from "aod-dependencies/@uifabric/utilities/ContextualMenu";

export class BuildFunction {
  public static buildNation = (): IDropdownOption[] => {
    let nations: IDropdownOption[] = [];
    for (const keyCT in countryCity) {
      let ns: IDropdownOption = { key: keyCT, text: keyCT };
      nations.push(ns);
    }
    return nations;
  };

  public static buildCityByCountry = (nation: string) => {
    let citys: IDropdownOption[] = [];
    let obj = Object.entries(countryCity).find(([k, val]) => k === nation);
    if (Array.isArray(obj)) {
      citys = obj[1].map((c) => {
        let rs: IDropdownOption = { key: c, text: c };
        return rs;
      });
    }
    return citys;
  };

  public static buildNationForPicker = (): IContextualMenuItem[] => {
    let nations: IContextualMenuItem[] = [];
    for (const keyCT in countryCity) {
      let ns: IContextualMenuItem = { key: keyCT, name: keyCT };
      nations.push(ns);
    }
    return nations;
  };

  public static buildCityByCountryForPicker = (
    nation?: string
  ): IContextualMenuItem[] => {
    let citys: IContextualMenuItem[] = [];
    if (nation) {
      let obj = Object.entries(countryCity).find(([k, val]) => k === nation);
      if (Array.isArray(obj)) {
        citys = obj[1].map((c) => {
          let rs: IContextualMenuItem = { key: c, name: c };
          return rs;
        });
      }
    }
    return citys;
  };

  public static buildNodeForBreadcrumb = (props: {
    id: string;
    text: string;
    isSelected: boolean;
    parentId: number | string;
    url?: string;
    data?: any;
  }) => {
    let node = new INodes();
    node.id = props.id;
    node.text = props.text;
    node.isSelected = props.isSelected;
    node.parentId = props.parentId;
    node.url = props.url;
    node.data = props.data;
    return node;
  };
  public static RenderGuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };
  public static buildNotificationItem = (
    status: string,
    code: number,
    data?: any
  ): NotificationItem => {
    let item = new NotificationItem();
    let id = BuildFunction.RenderGuid();
    item.id = id;
    item.title = status;
    item.type = TypeNotification.Success;
    if (code !== 0) {
      item.type = TypeNotification.Error;
    }
    return item;
  };
  public static buildColorByTheme = (
    color: ThemeColor,
    theme?: ThemeEnums
  ): string => {
    if (theme === ThemeEnums.Dark) {
      return DarkTheme[color];
    }
    return LightTheme[color];
  };
}

export class GUID {
  static NewGuild(): string {  
    function _p8(s?: boolean): string {  
      var p = (Math.random().toString(16)+"000000000").substr(2,8);  
       return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;  
    }  
    return _p8() + _p8(true) + _p8(true) + _p8();  
  }  
}
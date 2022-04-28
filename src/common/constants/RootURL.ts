export enum ApiFromOData {
  //ODATA_API = "root/odata/",
  //CONNECTION_API = "root/",
  ODATA_API = "http://rc365test01.southeastasia.cloudapp.azure.com:11016/root/odata/",
  CONNECTION_API = "http://rc365test01.southeastasia.cloudapp.azure.com:11016/root/",
  // ODATA_API = "http://HoangBT.add-on-development.com:11016/root/odata/",
  // CONNECTION_API = "http://HoangBT.add-on-development.com:11016/root/",
  // ODATA_API = "http://MinhNP.add-on-development.com:11016/root/odata/",
  // CONNECTION_API = "http://MinhNP.add-on-development.com:11016/root/",
  // ODATA_API = "http://192.168.1.247:11016/root/odata/",
  // CONNECTION_API = "http://192.168.1.247:11016/root/",
  // ODATA_API = "http://hoangbt.add-on-development.com:11016/root/odata/",
  // CONNECTION_API = "http://hoangbt.add-on-development.com:11016/root/",
}

export const BuildURLWithTenantId = (
  url: ApiFromOData,
  useRoot?: boolean
): string => {
  let storage = localStorage.getItem("tenantId");
  if (storage && !useRoot) {
    let obj = JSON.parse(storage);
    return url.replace("root", obj.id);
  }
  return url;
};

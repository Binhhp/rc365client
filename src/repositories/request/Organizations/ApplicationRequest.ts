export class PostApplicationInfomationRequest {
  tenantId: string;
  aadApplication: ApplicationInfomation;
  ResourceLimit: number;
}

export class ApplicationInfomation {
  tenantId: string;
  appId: string;
  appSecret: string;
}

export class RegisterResourceRequest {
  SynchronizeResources: SynchronizeResourceInfomation[];
}

export class SynchronizeResourceInfomation {
  Id: string;
  Email: string;
  Name: string;
  Location: string;
  Phone: string;
  Capacity: number;
  // Department: string;
  // Company: string;
  // OrganizationId: string;
  DisplayName: string;
  Timezone: string;
  Description: string;
  ImageURLs: string[];
  Groups: any[];
}

export class UpdateResourceRequest {
  Resource: SynchronizeResourceInfomation;
}

export class UnregisterResourceRequest {
  ResourceIds: string[];
}

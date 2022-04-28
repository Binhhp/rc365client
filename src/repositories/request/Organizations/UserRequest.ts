export class RegisterUsersRequest {
  SynchronizeUsers: SynchronizeUsersRegister[];
}

export class SynchronizeUsersRegister {
  // WillConnect: boolean;
  UserInfo: SynchronizeUserInfomation;
}

export class SynchronizeUserInfomation {
  Email: string;
  Name: string;
  JobTitle: string;
  Department: string;
  DisplayName: string;
  Office: string;
  OfficePhone: string;
  FaxNumber: string;
  MobilePhone: string;
  StreetAddress: string;
  City: string;
  StateOrProvince: string;
  ZipOrPostalCode: string;
  CountryOrRegion: string;
}

export class UnRegisterUsersRequest {
  UnsynchronizeUsers: string[];
}

export class UpdateUserRequest {
  Guid: string;
  Email: string;
  Name: string;
  DisplayName: string;
  UserProfile: SynchronizeUserInfomation;
}

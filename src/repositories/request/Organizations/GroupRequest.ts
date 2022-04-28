export class RegisterGroupsRequest {
  SynchronizeGroups: SynchronizeGroupsRegister[];
}

export class SynchronizeGroupsRegister {
  Name: string;
  Email: string;
  Description: string;
}
export class UpdateGroupRequest {
  Name: string;
  Email: string;
  Guid: string;
  Description: string;
}
export class UnRegisterGroupsRequest {
  UnsynchronizeGroups: string[];
}

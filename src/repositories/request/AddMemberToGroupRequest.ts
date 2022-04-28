export class AddUserToGroupRequest {
  GroupId: string;
  UserIds: string[];
}

export class AddGroupToGroupRequest {
  GroupId: string;
  ChildGroupIds: string[];
}

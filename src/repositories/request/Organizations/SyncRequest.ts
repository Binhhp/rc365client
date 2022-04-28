export class SyncSelectedUsersRequest {
  SyncUserGuids: UsersInfomationSync[];
}

export class UsersInfomationSync {
  guid: string;
  email: string;
}

export class SyncSelectedUserRequest {
  UserAndResourceRequests: SynchUseraAndResource[];
}
export class StopSyncSelectedUserRequest {
  UserAndResourceRequests: SynchUseraAndResource[];
}

export class SynchUseraAndResource {
  Email: string;
  Type: string;
}

export class OrgSyncUserListResponse {
  loadSynchronizeUsers: OrgSyncUserResourceItem[];
}

export class OrgSyncUserResourceItem {
  email: string;
  guid: string;
  lastSynchronized: number;
  responseCode: number;
  type: string;
  status: string;
  synchronizedBy: string;
}
export class SyncUsersResponse {
  IsConnectedAAD: boolean;
  ResponseCode: number;
  Status: number;
  ConversationId: string;
  SubscribeUsersStepResponse: SubscribeUsersStepResponse;
  SynchronizeUsersStepResponse: SynchronizeUsersStepResponse;
}

export class SubscribeUsersStepResponse {
  IsSubscribed: boolean;
  ResponseCode: number;
  Status: number;
}

export class SynchronizeUsersStepResponse {
  PlanCount: number;
  SynchronizedUsers: SynchronizedUser[];
  ResponseCode: number;
  Status: number;
}

export class SynchronizedUser {
  Guid: string;
  Email: string;
}
export class StopSyncUsersResponse {
  Status: number;
  ResponseCode: number;
  ConversationId: string;
}
export class StopSyncAllResponse {
  Status: number;
  ResponseCode: number;
  ConversationId: string;
  IsUnsubcriblePushNotification: boolean;
}

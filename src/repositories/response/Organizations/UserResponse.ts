export class RegisterUserResponse {
  status: boolean;
  conversationId: string;
  workflowId?: string;
}
export class UnRegisterUserResponse {
  conversationId: string;
  workflowId: string;
}

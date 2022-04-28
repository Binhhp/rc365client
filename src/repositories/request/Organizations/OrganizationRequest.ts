export class CreateOrganizationRequest {
  Name: string;
  DomainName: string;
}

export class DeleteOrganizationRequest {
  ConversationId: string;
}

export class UpdateNameOrganizationRequest {
  name: string;
}

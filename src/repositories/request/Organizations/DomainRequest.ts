export class CreateDomainRequest {
  DomainNames: string[];
}

export class UpdateDomainRequest {
  Guid: string;
  Name: string;
}
export class DeleteDomainRequest {
  DomainIds: string[];
}

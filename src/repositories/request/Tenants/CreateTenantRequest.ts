export class CreateTenantRequest {
  Name: string;
  LicenceType: string;
  Owner?: OwnerRequest;
}

export class OwnerRequest {
  Name: string;
  Email: string;
  PhoneNumber: string;
}

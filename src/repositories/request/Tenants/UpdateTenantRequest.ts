import { OwnerRequest } from ".";

export class UpdateTenantRequest {
  Name: string;
  Owner: OwnerRequest;
  LicenceType: string;
}

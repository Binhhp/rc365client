export interface IAccountStates {
  workingTenant: IWorkingTenant | null;
}

export interface IWorkingTenant {
  name: string;
  id: string;
}

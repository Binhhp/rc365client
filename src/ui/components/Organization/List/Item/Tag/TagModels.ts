import { TypePage } from "src/entity/enums";

export interface IRenderTag {
  theme: string;
  data: { text: string; iconName: string; total: number; tab: TypePage };
  orgName: string;
  orgId: string;
  isWorkingOnCreate: boolean;
  onHandleRemoveOrganization: () => void;
}

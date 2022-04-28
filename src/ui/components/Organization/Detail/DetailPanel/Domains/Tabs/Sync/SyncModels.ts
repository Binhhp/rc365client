import { BaseDomain } from "src/common/classes/BaseDomain";
import { ThemeEnums } from "src/entity/enums";

export interface SyncTabProps {
  theme?: ThemeEnums;
  domain?: BaseDomain;
  OnSyncDomain?: (id: string) => void;
  OnStopSyncDomain?: (id: string) => void;
}

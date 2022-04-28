import { INodes } from "aod-dependencies/Breadcrumb/models/NodeProps";
import { BaseAppointment } from "src/common/classes/BaseAppointments";
import { BaseOrganization } from "src/common/classes/BaseOrganization";
import { ThemeEnums, TypeConfirm, TypePanel } from "src/entity/enums";

export interface ICreateProps {
  theme?: ThemeEnums;
  selectedAppointments?: BaseAppointment[];
  workingAppointment?: BaseAppointment;
  organizationInfomation?: BaseOrganization;
  confirmType?: TypeConfirm;
  isWorking?: boolean;
  isPanelPageOpen?: boolean;
  panelType?: TypePanel;
  signalRConversationId?: string;
  isHaveMessageSignalR?: boolean;
  OnUpdateVisiblePagePanel?: (val: boolean) => void;
  OnResetApplicationStore?: () => void;
  OnUpdateConfirmType?: (type: TypeConfirm) => void;
  OnUpdateBeardCrumb?: (nodes: INodes[]) => void;
  OnUpdateWorkingStatus?: (val: boolean) => void;
  OnUpdateWorkingAppointment?: (apm: BaseAppointment) => void;
}
export interface ICreateStates {
  appointment: BaseAppointment;
}

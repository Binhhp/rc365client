import {
  AddSensorToControllerRequest,
  RemoveSensorInControllerRequest,
} from "../request/Sensors/ActionSensorWithControllerRequest";
import {
  RegisterControllerRequest,
  RegisterSensorRequest,
  RegisterSensorTypeRequest,
} from "../request/Sensors/RegisterRequest";
import {
  UpdateControllerRequest,
  UpdateSensorRequest,
  UpdateSensorTypeRequest,
} from "../request/Sensors/UpdateRequest";
import { ConversationIdResponse } from "../response";
import { SensorTypeResponse } from "../response/Sensors/SensorTypeResponse";
import { SensorControllerResponse } from "../response/Sensors/SensorControllerResponse";

export interface ISensorRepository {
  GetSensorTypeList: () => Promise<SensorTypeResponse[]>;
  GetSensorControllerById: (id: string) => Promise<SensorControllerResponse[]>;
  PostRegisterSensor: (
    req: RegisterSensorRequest
  ) => Promise<ConversationIdResponse>;
  PostRegisterSensorController: (
    req: RegisterControllerRequest
  ) => Promise<ConversationIdResponse>;
  PostRegisterSensorType: (
    req: RegisterSensorTypeRequest
  ) => Promise<ConversationIdResponse>;
  PostUpdateSensor: (
    id: string,
    req: UpdateSensorRequest
  ) => Promise<ConversationIdResponse>;
  PostUpdateSensorController: (
    id: string,
    req: UpdateControllerRequest
  ) => Promise<ConversationIdResponse>;
  PostUpdateSensorType: (
    id: string,
    req: UpdateSensorTypeRequest
  ) => Promise<ConversationIdResponse>;
  PostUnregisterSensor: (id: string) => Promise<ConversationIdResponse>;
  PostUnregisterSensorController: (
    id: string
  ) => Promise<ConversationIdResponse>;
  PostUnregisterSensorType: (id: string) => Promise<ConversationIdResponse>;
  PostAddSensorsToController: (
    id: string,
    req: AddSensorToControllerRequest
  ) => Promise<ConversationIdResponse>;
  PostRemoveSensorsInController: (
    id: string,
    req: RemoveSensorInControllerRequest
  ) => Promise<ConversationIdResponse>;
}

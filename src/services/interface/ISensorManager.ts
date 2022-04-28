import {
  AddSensorToControllerRequest,
  RemoveSensorInControllerRequest,
} from "src/repositories/request/Sensors/ActionSensorWithControllerRequest";
import {
  RegisterControllerRequest,
  RegisterSensorRequest,
  RegisterSensorTypeRequest,
} from "src/repositories/request/Sensors/RegisterRequest";
import {
  UpdateControllerRequest,
  UpdateSensorRequest,
  UpdateSensorTypeRequest,
} from "src/repositories/request/Sensors/UpdateRequest";
import { ConversationIdResponse } from "src/repositories/response";
import { SensorTypeResponse } from "src/repositories/response/Sensors/SensorTypeResponse";
import { SensorControllerResponse } from "src/repositories/response/Sensors/SensorControllerResponse";

export interface ISensorManager {
  GetSensorTypeList: () => Promise<SensorTypeResponse[]>;
  GetSensorControllerById: (id: string) => Promise<SensorControllerResponse[]>;
  RegisterSensor: (
    req: RegisterSensorRequest
  ) => Promise<ConversationIdResponse>;
  RegisterSensorController: (
    req: RegisterControllerRequest
  ) => Promise<ConversationIdResponse>;
  RegisterSensorType: (
    req: RegisterSensorTypeRequest
  ) => Promise<ConversationIdResponse>;
  UpdateSensor: (
    id: string,
    req: UpdateSensorRequest
  ) => Promise<ConversationIdResponse>;
  UpdateSensorController: (
    id: string,
    req: UpdateControllerRequest
  ) => Promise<ConversationIdResponse>;
  UpdateSensorType: (
    id: string,
    req: UpdateSensorTypeRequest
  ) => Promise<ConversationIdResponse>;
  UnregisterSensor: (id: string) => Promise<ConversationIdResponse>;
  UnregisterSensorController: (id: string) => Promise<ConversationIdResponse>;
  UnregisterSensorType: (id: string) => Promise<ConversationIdResponse>;
  RemoveSensorInController: (
    id: string,
    req: RemoveSensorInControllerRequest
  ) => Promise<ConversationIdResponse>;
  AddSensorToController: (
    id: string,
    req: AddSensorToControllerRequest
  ) => Promise<ConversationIdResponse>;
}

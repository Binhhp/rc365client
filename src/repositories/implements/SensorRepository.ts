import {
  ApiFromOData,
  BuildURLWithTenantId,
} from "../../common/constants/RootURL";
import { ISensorRepository } from "../interface";
import { FetchDataFromServer } from "../../common/functions";
import {
  RegisterControllerRequest,
  RegisterSensorRequest,
  RegisterSensorTypeRequest,
} from "../request/Sensors/RegisterRequest";
import { axiosMethod } from "src/entity/enums";
import { ConversationIdResponse } from "../response";
import {
  UpdateControllerRequest,
  UpdateSensorRequest,
  UpdateSensorTypeRequest,
} from "../request/Sensors/UpdateRequest";
import {
  AddSensorToControllerRequest,
  RemoveSensorInControllerRequest,
} from "../request/Sensors/ActionSensorWithControllerRequest";
import { SensorTypeResponse } from "../response/Sensors/SensorTypeResponse";
import { SensorControllerResponse } from "../response/Sensors/SensorControllerResponse";

export class SensorRepository implements ISensorRepository {
  GetSensorTypeList = async (): Promise<SensorTypeResponse[]> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `SensorTypes`,
    });
    return response.value;
  };
  GetSensorControllerById = async (
    id: string
  ): Promise<SensorControllerResponse[]> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `SensorControllers('${id}')`,
    });
    return response;
  };

  PostRegisterSensor = async (
    req: RegisterSensorRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `Sensors`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostRegisterSensorController = async (
    req: RegisterControllerRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `SensorControllers`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostRegisterSensorType = async (
    req: RegisterSensorTypeRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `SensorTypes`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostUpdateSensor = async (
    id: string,
    req: UpdateSensorRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `Sensors('${id}')/UpdateSensor`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostUpdateSensorController = async (
    id: string,
    req: UpdateControllerRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `SensorControllers('${id}')/UpdateSensorController`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostUpdateSensorType = async (
    id: string,
    req: UpdateSensorTypeRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `SensorTypes('${id}')/UpdateSensorType`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostUnregisterSensor = async (
    id: string
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `Sensors('${id}')/RemoveSensor`,
      method: axiosMethod.POST,
    });
    return response;
  };
  PostUnregisterSensorController = async (
    id: string
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `SensorControllers('${id}')/RemoveSensorController`,
      method: axiosMethod.POST,
    });
    return response;
  };
  PostUnregisterSensorType = async (
    id: string
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `SensorTypes('${id}')/RemoveSensorTypes`,
      method: axiosMethod.POST,
    });
    return response;
  };
  PostAddSensorsToController = async (
    id: string,
    req: AddSensorToControllerRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `SensorTypes('${id}')/AddSensorsToController`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
  PostRemoveSensorsInController = async (
    id: string,
    req: RemoveSensorInControllerRequest
  ): Promise<ConversationIdResponse> => {
    let response = await FetchDataFromServer({
      type: BuildURLWithTenantId(ApiFromOData.ODATA_API),
      endpoint: `SensorTypes('${id}')/RemoveSensorsInController`,
      method: axiosMethod.POST,
      body: req,
    });
    return response;
  };
}

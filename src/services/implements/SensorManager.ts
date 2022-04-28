import { SensorRepository } from "src/repositories/implements/SensorRepository";
import { ISensorRepository } from "src/repositories/interface";
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
import { ISensorManager } from "../interface";
import { IDropdownOption } from "aod-dependencies/Dropdown";
import { SensorControllerResponse } from "src/repositories/response/Sensors/SensorControllerResponse";

export class SensorManager implements ISensorManager {
  private static _instance: SensorManager;
  private _sensorRepositories: ISensorRepository;
  private _sensorOpts: IDropdownOption[];
  constructor() {
    this._sensorRepositories = new SensorRepository();
    this._sensorOpts = [];
  }
  public static get Instance(): SensorManager {
    if (!this._instance) {
      this._instance = new SensorManager();
    }
    return this._instance;
  }
  public get sensorOpts(): IDropdownOption[] {
    return this._sensorOpts;
  }
  public set sensorOpts(sensorOpts: IDropdownOption[]) {
    this._sensorOpts = sensorOpts;
  }
  GetSensorTypeList = async (): Promise<SensorTypeResponse[]> => {
    let response = await this._sensorRepositories.GetSensorTypeList();
    if (response.length > 0) {
      let opts: IDropdownOption[] = response.map((i) => {
        let opt: IDropdownOption = {
          key: i.type,
          text: i.type,
        };
        return opt;
      });
      this._sensorOpts = opts;
    }
    return response;
  };
  GetSensorControllerById = async (
    id: string
  ): Promise<SensorControllerResponse[]> => {
    let response = await this._sensorRepositories.GetSensorControllerById(id);
    return response;
  };
  // GetSensorControllerByResourceId = async (
  //   id: string
  // ): Promise<ControllerDto> => {
  //   let response =
  //     await this._sensorRepositories.GetSensorControllerByResourceId(id);
  //   return response;
  // };
  RegisterSensor = async (
    req: RegisterSensorRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._sensorRepositories.PostRegisterSensor(req);
    return response;
  };
  RegisterSensorController = async (
    req: RegisterControllerRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._sensorRepositories.PostRegisterSensorController(
      req
    );
    return response;
  };
  RegisterSensorType = async (
    req: RegisterSensorTypeRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._sensorRepositories.PostRegisterSensorType(req);
    return response;
  };
  UpdateSensor = async (
    id: string,
    req: UpdateSensorRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._sensorRepositories.PostUpdateSensor(id, req);
    return response;
  };
  UpdateSensorController = async (
    id: string,
    req: UpdateControllerRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._sensorRepositories.PostUpdateSensorController(
      id,
      req
    );
    return response;
  };
  UpdateSensorType = async (
    id: string,
    req: UpdateSensorTypeRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._sensorRepositories.PostUpdateSensorType(id, req);
    return response;
  };
  UnregisterSensor = async (id: string): Promise<ConversationIdResponse> => {
    let response = await this._sensorRepositories.PostUnregisterSensor(id);
    return response;
  };
  UnregisterSensorController = async (
    id: string
  ): Promise<ConversationIdResponse> => {
    let response =
      await this._sensorRepositories.PostUnregisterSensorController(id);
    return response;
  };
  UnregisterSensorType = async (
    id: string
  ): Promise<ConversationIdResponse> => {
    let response = await this._sensorRepositories.PostUnregisterSensorType(id);
    return response;
  };
  AddSensorToController = async (
    id: string,
    req: AddSensorToControllerRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._sensorRepositories.PostAddSensorsToController(
      id,
      req
    );
    return response;
  };
  RemoveSensorInController = async (
    id: string,
    req: RemoveSensorInControllerRequest
  ): Promise<ConversationIdResponse> => {
    let response = await this._sensorRepositories.PostRemoveSensorsInController(
      id,
      req
    );
    return response;
  };
}

export class UpdateSensorRequest {
  SensorId: string;
  SensorType: string;
  SensorControllerId: string;
}

export class UpdateControllerRequest {
  ConfigDefaultReservationTime: string;
  ConfigDefaultSensorTimeFrame: string;
  ResourceId: string;
  ControllerStatus: boolean;
}

export class UpdateSensorTypeRequest {
  SensorType: string;
  PullUrl: string;
  PushUrl: string;
  PushUrlEndPoint: string;
}

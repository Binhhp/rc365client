export class RegisterSensorRequest {
  SensorId: string;
  SensorType: string;
  ResourceId: string;
}

export class RegisterControllerRequest {
  ConfigDefaultReservationTime: string;
  ConfigDefaultSensorTimeFrame: string;
  ResourceId: string;
  TimeZone: string;
}

export class RegisterSensorTypeRequest {
  SensorType: string;
  ApiKey: string;
  PullUrl: string;
  PushUrl: string;
  PushUrlEndPoint: string;
}

export class UpdateStorageConfigurationRequest {
  Configurations: ConfigurationStorageRequest[];
}

export class ConfigurationStorageRequest {
  ContextKey: string;
  Configuration: string;
}

export class InitContextConfigurationRequest {
  Context: string;
  StorageConfiguration: string;
  LoggingConfiguration: string;
}

export class IUpdateMultipleContextRequest {
  ContextKeys?: string[];
  Configurations: ItemInMultipleContextRequest[];
  InitConfiguration: string;
}

export class ItemInMultipleContextRequest {
  ContextKey: string;
  ConnectionString: string;
  Name: string;
}

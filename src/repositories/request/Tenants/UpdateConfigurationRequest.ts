export class UpdateConfigurationRequest {
  Configurations: ConfigurationRequest[];
}

export class ConfigurationRequest {
  ContextKey: string;
  FeatureKey: string;
  Version: string;
  IsEnabled: boolean;
  Configuration: string;
}

export class IUpdateMultipleFeatureRequest {
  Features: ItemInMultipleFeatureRequest[];
  Value: string;
}

export class ItemInMultipleFeatureRequest {
  ContextKey: string;
  FeatureKey: string;
}

export class GetContextConfigurationRequest {
  ContextKeys: string[];
}

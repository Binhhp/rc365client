export interface IContextDatabases {
  contextKey: string;
  name: string;
  connectionString: string;
}

export interface IContextDatabaseSignalRResponse {
  conversationId: string;
  status?: boolean;
  responseCode?: number;
  contextConfigurations: IContextDatabases[];
}

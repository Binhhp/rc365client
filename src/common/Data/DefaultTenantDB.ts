export const DefaultTenantDb =
  '{"Databases":[{"Name":"DefaultDB","Type":"","Configuration":{"ConnectionString":""}}]}';

export const ContextDatabases = [
  {
    contextKey: "database1",
    databaseName: "Name1",
    connectionString:
      '{"Databases":[{"Name":"OrganizationContext","Type":"SqlServer","Configuration":{"ConnectionString":"Server=.;Database=Organization;User Id=sa;Password=aod@123;"}}]}',
  },
  {
    contextKey: "database2",
    databaseName: "Name2",
    connectionString:
      '{"Databases":[{"Name":"AAD_CONNECTOR","Type":"SqlServer","Configuration":{"ConnectionString":"Server=.;Database=AAD_CONNECTOR;User Id=sa;Password=aod@123;"}}]}',
  },
  {
    contextKey: "database3",
    databaseName: "Name3",
    connectionString:
      '{"Databases":[{"Name":"BFF_OrganizationDbContext","Type":"SqlServer","Configuration":{"ConnectionString":"Server=.;Database=OrganizationManagementViews;User Id=sa;Password=aod@123;"}},{"Name":"BFF_TenantContext","Type":"SqlServer","Configuration":{"ConnectionString":"Server=.;Database=TenantManagementViews;User Id=sa;Password=aod@123;"}},{"Name":"BFF_SensorDbContext","Type":"SqlServer","Configuration":{"ConnectionString":"Server=.;Database=OrganizationContext;User Id=sa;Password=aod@123;"}}]}',
  },
];

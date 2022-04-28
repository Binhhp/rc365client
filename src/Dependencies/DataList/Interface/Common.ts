export enum OperatorFilterStringEnums {
  Equal = "eq",
  NotEqual = "ne",
  NotContain = "not",
  Contain = "contains",
  Null = "null",
}

export enum OperatorFilterNumberEnums {
  Equal = "eq",
  Less = "lt",
  Greater = "gt",
  LessOrEqual = "le",
  GreaterOrEqual = "ge",
  Null = "null",
}

export enum FilterType {
  Filter = "Filter",
  Sort = "Sort",
}

export enum OrderValue {
  asc = "asc",
  desc = "desc",
}

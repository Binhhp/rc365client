import { FilterType } from "./Common";

export interface IObjectFilter1 {}

export interface IFilterQuery {
  columnKey: string;
  key: string;
  value: any;
  operator: string;
  order: string;
  type: FilterType;
  childQuery?: string;
}

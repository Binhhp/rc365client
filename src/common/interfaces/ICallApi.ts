import { axiosMethod } from "src/entity/enums";
import { ApiFromOData } from "../constants";

export interface IQueryModel {
  type?: ApiFromOData | string;
  endpoint?: string;
  method?: axiosMethod;
  body?: any;
  url?: string;
}

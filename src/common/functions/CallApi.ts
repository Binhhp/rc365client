import axios, { AxiosTransformer } from "axios";
import { axiosMethod } from "src/entity/enums";
import { IQueryModel } from "../interfaces/ICallApi";
import { toastNotify } from "../ui/Toast";
import { ToastMessageProvider } from "./../ui/Toast/core/messages";

const dateTransformer = (data: any): any => {
  if (data instanceof Date) {
    // do your specific formatting here
    return new Date(
      Date.UTC(
        data.getFullYear(),
        data.getMonth(),
        data.getDate(),
        data.getHours(),
        data.getMinutes()
      )
    );
  }
  if (Array.isArray(data)) {
    return data.map(dateTransformer);
  }
  if (typeof data === "object" && data !== null) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, dateTransformer(value)])
    );
  }
  return data;
};

export const FetchDataFromServer = async (req: IQueryModel): Promise<any> => {
  const clientId = window.__clientId__;
  const axiosInstance = axios.create({
    headers: {
      ClientId: clientId,
    },
    transformRequest: [
      dateTransformer,
      ...(axios.defaults.transformRequest as AxiosTransformer[]),
    ],
  });
  const response = await axiosInstance({
    method: req.method || axiosMethod.GET,
    url: req.url ? req.url : `${req.type}${req.endpoint}`,
    data: req.body,
  });
  const result = response?.data;
  const message = ToastMessageProvider.Built(req.body);
  if (message && result?.workflowId && result?.conversationId) {
    toastNotify.promise({
      id: result?.conversationId,
      title: message.promise?.title,
      message: message.promise?.message,
      workflowId: result?.workflowId,
      conversationId: result?.conversationId,
      completed: {
        title: message.completed?.title,
        message: message.completed?.message,
      },
    });
  }
  return result;
};

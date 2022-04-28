import { Toast } from "react-hot-toast";
import { CSSProperties } from "styled-components";

// Toast Dto Default
export interface IDefaultToastDto {
  id?: string;
  title?: string;
  message?: string;
  icon?: any;
  type: ToastEnum.SUCCESS | ToastEnum.ERROR | ToastEnum.PROMISE;
}

export enum ToastEnum {
  SUCCESS = "success",
  ERROR = "error",
  PROMISE = "promise",
}
// Toast props for success and error
export interface IToast extends Omit<IDefaultToastDto, "type">, IWorkflow {}

interface IWorkflow {
  conversationId?: string;
  workflowId?: string;
}

interface IPromise extends Pick<IDefaultToastDto, "title" | "message"> {}
export interface IPromiseToast extends IDefaultToastDto, IWorkflow {
  hidden?: boolean;
  idUpdate?: string;
  completed?: IPromise;
}

export interface IToastManagerState extends IPromise, IWorkflow {
  idUpdate?: string;
}

// State manager in toast container
export interface IToastManager {
  promises: IToastManagerState[];
}
//Toast Container Props Component
export interface IToastPropsContainer {
  //Default properties false
  reverseOrder?: boolean;
  //Default position top-right
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  //Default 8
  gutter?: number;
  //Custom style content
  style?: CSSProperties;
  //Custom style tag parent
  styleContainer?: CSSProperties;
}

export interface IToastPropsContainerDOM extends IToastPropsContainer {
  toasts: Toast[]
}
// MessageBase
export interface IToastMessageBase {
  promise: IPromise;
  completed: IPromise;
}

class Message implements IPromise {
  title?: string;
  message?: string;
  constructor(title?: string, message?: string) {
    this.title = title;
    this.message = message;
  }
}
export class ToastMessageBase implements IToastMessageBase {
  promise: IPromise;
  completed: IPromise;
  constructor(promise?: IPromise, completed?: IPromise) {
    if (promise && completed) {
      this.promise = promise;
      this.completed = completed;
    }
  }
  Promise = (title: string, message: string): ToastMessageBase => {
    this.promise = new Message(title, message);
    return this;
  };
  Completed = (title: string, message: string): ToastMessageBase => {
    this.completed = new Message(title, message);
    return this;
  };
  Built = (): IToastMessageBase =>
    new ToastMessageBase(this.promise, this.completed) as IToastMessageBase;
}

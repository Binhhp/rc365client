import toast from "react-hot-toast";
import { IconLoading, IconSuccess3, IconError3 } from "./icons/IconToast";
import { IToast, IPromiseToast, IDefaultToastDto, ToastEnum } from "./ToastNotificationModel";
import React from "react";

const options = {
  duration: 4000
};

export const toastNotify = {
  success: (props: Partial<IToast>) => {
    const payload: IDefaultToastDto = { ...props, type: ToastEnum.SUCCESS };
    return toast.success(JSON.stringify(payload), {
      ...options,
      id: props.id,
      icon: props.icon || <IconSuccess3 />
    });
  },

  error: (props: Partial<IToast>) => {
    const payload: IDefaultToastDto = { ...props, type: ToastEnum.ERROR };
    return toast.error(JSON.stringify(payload), {
      ...options,
      id: props.id,
      icon: props.icon || <IconError3 />
    });
  },

  promise: (props: Partial<Omit<IPromiseToast, "type">>) => {
    const payload: IPromiseToast = { ...props, type: ToastEnum.PROMISE };
    return toast(JSON.stringify(payload), {
      ...options,
      id: props.id,
      icon: props.icon || <IconLoading />
    });
  }
};

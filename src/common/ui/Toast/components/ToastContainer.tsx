import { Toast, useToaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { IToastManager, IToastPropsContainer } from "../ToastNotificationModel";
import { useSelector } from "react-redux";
import { appReducers } from "src/ui/reducers";
import toastCore from "../core/toast"; 
import ToastContainerDom from "./ToastContainerDOM";

function ToastContainer(props: Partial<IToastPropsContainer>) {
    const { toasts } = useToaster();
    const appRedux = useSelector((state: appReducers) => state.AppReducer);
    const signalRGetData = useSelector((state:appReducers) => state.NotificationsReducer.signalRGetData);

    const [manager, setManager] = useState<IToastManager>({ promises: [] });
    const [toastProvider, setToastProvider] = useState<Toast[]>([]);

    useEffect(() => {
        const { 
            toastManager, toastProvider
        } = toastCore(appRedux, manager, toasts, signalRGetData);
        setToastProvider(toastProvider);
        return setManager({ ...toastManager });
    }, [JSON.stringify(toasts), appRedux.signalRConversationId, appRedux.signalRWorkflowId])

    return (
        toasts.length > 0  ? <ToastContainerDom toasts={toastProvider}  {...props} /> : <></>
    )
}
export default ToastContainer;
import { Toast } from "react-hot-toast";
import { ApplicationStoreModel } from "src/entity/model/ApplicationStoreModel";
import { IPromiseToast, IToastManager, IToastManagerState, ToastEnum } from "../ToastNotificationModel";
import { toastNotify } from "..";

//Handle show toast when complete workflow (signalR)
export default function toastCore(
    appRedux: ApplicationStoreModel,
    manager: IToastManager,
    toasts: Toast[],
    signalRGetData: string[]
): { toastManager: IToastManager, toastProvider: Toast[] } {
    let toastManager: IToastManager = manager || { promises: [] }, toastProvider: Toast[] = toasts;
    try {
        if(manager.promises.length > 0 && appRedux.signalRWorkflowId && appRedux.signalRConversationId) {
            const indexItem = manager.promises.findIndex(x => 
                x.conversationId === appRedux.signalRConversationId &&
                x.workflowId === appRedux.signalRWorkflowId);
            const promise = manager.promises[indexItem];
            if(indexItem > -1 && promise && toasts.some(x => x.id === promise.conversationId)){
                toastNotify.success({ 
                    ...promise,
                    id: promise.conversationId
                })
            }
            toastManager.promises.splice(indexItem, 1);
        }
        else if(toasts.length > 0) {
            let errorWorkflow: string[] = [];
            toasts.map(toast => {
                try{
                    const toastProps: any = toast.message && (JSON.parse(String(toast.message)));
                    if(toastProps?.type === ToastEnum.ERROR){
                        const promiseToast = toastProps as IPromiseToast;
                        const indexItem = manager.promises.findIndex(x => 
                            x.conversationId === promiseToast.conversationId ||
                            x.workflowId === promiseToast.workflowId);
                        if(indexItem > -1){
                            toastManager.promises.splice(indexItem, 1);
                            if(!promiseToast?.conversationId){
                                errorWorkflow.push(manager.promises[indexItem].conversationId || "");
                            }
                        }
                        if(promiseToast?.conversationId && signalRGetData.some(x => x === promiseToast.conversationId)){
                            errorWorkflow.push(promiseToast.conversationId || "");
                        }
                    }
                    if(toastProps?.type === ToastEnum.PROMISE){
                        const promiseToast = toastProps as IPromiseToast;
                        const checkExistPromiseManager = manager.promises.some(x => 
                                x.workflowId === promiseToast.workflowId && x.conversationId === promiseToast.conversationId);
                        if(promiseToast.conversationId && promiseToast.workflowId){
                            if(!checkExistPromiseManager){
                                let state: IToastManagerState = Object.assign({}, 
                                    JSON.parse(JSON.stringify(promiseToast, ["conversationId", "workflowId"])), 
                                    promiseToast?.completed);
                                toastManager.promises = [...manager.promises, state ];
                            }
                        }
                    }
                }
                catch { }
            });
            if(errorWorkflow.length > 0) toastProvider = toasts.filter(x => !errorWorkflow.includes(x.id));
        }
    }
    catch { }
    return { toastManager, toastProvider };
}
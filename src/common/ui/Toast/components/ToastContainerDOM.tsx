
import CustomToastNotification from "./CustomToastNotification";
import { ToastContainerWrapper } from "../ToastNotificationStyle";
import { useToaster } from "react-hot-toast";
import React from "react";
import { IPromiseToast, IToastPropsContainerDOM } from "../ToastNotificationModel";

function ToastContainerDom(props: IToastPropsContainerDOM){
    const { toasts, handlers } = useToaster();
    const { startPause, endPause, updateHeight } = handlers;

    const position = () => {
        const positionProp = props.position || "top-right";
        switch(positionProp){
            case "top-left": return { top: "60px", left: "15px" }
            case "top-right": return { top: "60px", right: "15px" }
            case "bottom-left": return { bottom: "20px", left: "15px" }
            case "bottom-right": return { bottom: "20px", right: "15px" }
        }
    }

    return (
        <ToastContainerWrapper
            style={{
                ...props.styleContainer,
                ...position()
            }}
            onMouseEnter={startPause}
            onMouseLeave={endPause}>
            {
                props.toasts.length > 0 
                ? props.toasts.map((toast, index) => {
                    const gutterToast = props.gutter ? props.gutter : 8;
                    const ref = (el: any) => {
                        if (el && !toast.height) {
                            const height = el.getBoundingClientRect().height;
                            updateHeight(toast.id, height);
                        }
                    };
                    const toastProps = JSON.parse(String(toast.message)) as IPromiseToast;
                    return (toast.visible && !toastProps.hidden
                        ? <div
                            key={toast.id}
                            ref={ref}
                            style={{
                                ...props.style,
                                backgroundColor: `#FFFFFF`,
                                // transition: "all 0.5s ease-out",
                                opacity: toast.visible ? 1 : 0,
                                transform: `translateY(${ gutterToast * index}px)`
                            }}>
                            <CustomToastNotification
                                key={toast.id}
                                id={toast.id}
                                title={toastProps.title}
                                message={toastProps.message}
                                icon={toast.icon}
                            />
                        </div>
                        : "")
                })
                : ""
            }
        </ToastContainerWrapper>
    )
}

export default ToastContainerDom;
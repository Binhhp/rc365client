import React from 'react';
import {
   NotificationCard,
   NotificationTitle,
   NotificationDescription,
   NotificationIconButton,
   NotificationTitleIcon,
   NotificationTitleText,
 } from "../ToastNotificationStyle";
 import toast from "react-hot-toast";
import { Icon } from 'aod-dependencies/@uifabric/icons';
import { IDefaultToastDto } from '../ToastNotificationModel';
function CustomToastNotification(props: Partial<Pick<IDefaultToastDto, "id" | "title" | "message" | "icon">>) {
   // handlers
   const handleDismiss = () => {
     toast.dismiss(props.id);
   };

   return (
      <NotificationCard>
         <NotificationTitle>
            {
               props.icon && <NotificationTitleIcon>{props.icon}</NotificationTitleIcon>
            }
            <NotificationTitleText>{props.title}</NotificationTitleText>
         </NotificationTitle>
         <NotificationDescription>{props.message}</NotificationDescription>
         <NotificationIconButton onClick={handleDismiss}>
            <Icon iconName='Cancel'></Icon>
         </NotificationIconButton>
      </NotificationCard>
   )
 };
 
 export default CustomToastNotification;
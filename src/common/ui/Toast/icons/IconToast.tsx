import { Icon } from 'office-ui-fabric-react';
import React from 'react';
import { IconToast, CheckMarkIcon, ErrorIcon } from '../ToastNotificationStyle';

export const IconSuccess3 = () => <IconToast><Icon iconName='SkypeCircleCheck' style={{color: '#4e9a06'}}/></IconToast>
export const IconSuccess2 = () => <CheckMarkIcon />
export const IconError2 = () => <ErrorIcon />
export const IconError3 = () => <IconToast><Icon iconName='StatusErrorFull' style={{color: '#D72828'}} /></IconToast>
export function IconLoading(){
   return (
      <svg viewBox="0 0 16 16" role="presentation" focusable="false" aria-hidden="true">
         <g>
            <g className="msportalfx-svg-loading-animated">
               <path d="M0 6h4v4H0zm6 0h4v4H6zm6 0h4v4h-4z" className="msportalfx-svg-loading-square msportalfx-svg-c07"></path>
            </g>
         </g>
      </svg>
   )
}

export function IconSuccess(){
   return (
      <IconToast>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="16"
            height="16"
            id="svg4397">
            <g id="layer1">
               <path
                  d="M 8,1 C 4.1340066,1 1,4.1340066 1,8 c 0,3.865993 3.1340066,7 7,7 3.865993,0 7,-3.134007 7,-7 C 15,4.1340066 11.865993,1 8,1 z m 3.3125,3.0625 1.5625,1.40625 -5.25,6.9375 -4.0625,-3.5 1.34375,-1.78125 2.375,2.0625 4.03125,-5.125 z"
                  className="icon-success"
                  id="path2922-6-6-0" />
            </g>
         </svg>
      </IconToast>
   )
}

export function IconError(){
   return (
      <IconToast>
         <svg 
         className="icon-error" 
         viewBox="0 0 32 32" 
         width="32" 
         xmlns="http://www.w3.org/2000/svg">
            <g>
               <g id="Error_1_">
                  <g id="Error">
                     <circle cx="16" cy="16" id="BG" r="16" style={{fill:`#D72828`}}/>
                     <path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" id="Exclamatory_x5F_Sign" style={{fill:`#E6E6E6`}}/>
                  </g>
               </g>
            </g>
         </svg>
      </IconToast>
   )
}
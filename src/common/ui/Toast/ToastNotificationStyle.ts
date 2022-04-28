import styled, { keyframes } from "styled-components";

export const NotificationCard = styled.div`
  position: relative;
  overflow: hidden;
  padding: 12px 5px 12px 12px;
  width: 325px;
  min-height: 66px;
  box-shadow: 0 25.6px 57.6px 0 rgb(0 0 0 / 22%), 0 4.8px 14.4px 0 rgb(0 0 0 / 18%);
`;
export const NotificationTitle = styled.div`
   display: flex;
   padding-bottom: 2px;
   max-width: calc(100% - 20px);
`;

const ProgressFlagAnimation = keyframes`
   0% {
        transform: scale(1);
        opacity: .3
    }

    36.1% {
        transform: scale(1.06);
        opacity: 1
    }

    50% {
        transform: scale(1.06);
        opacity: 1
    }

    86.1% {
        transform: scale(1);
        opacity: .3
    }
`;

export const NotificationTitleIcon = styled.div`
   margin-right: 7px;
   min-width: 16px;
   vertical-align: middle;
   .msportalfx-svg-loading-square {
      animation: ${ProgressFlagAnimation} 1.45s infinite ease-in-out;
      transform-origin: 50%;
      &:nth-child(1) {
        animation-delay: 0s
      }
      &:nth-child(2) {
        animation-delay: .2s
      }
      &:nth-child(3) {
        animation-delay: .4s
      }
   }
`;

export const NotificationTitleText = styled.h1`
   padding: 0;
   margin: 0;
   font-size: 14px;
   display: block;
   display: -webkit-box;
   line-height: 19px;
   max-height: 38px;
   overflow: hidden;
   text-overflow: ellipsis;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
   overflow-wrap: break-word;
   flex: 1 0 0;
   font-weight: 600;
`;

export const NotificationDescription = styled.div`
   font-size: 12px;
   line-height: normal;
   display: block;
   line-height: 17px;
   max-height: 144px;
   overflow: hidden;
   position: relative;
   padding-top: 5px;
   text-overflow: ellipsis;
   white-space: pre-wrap;
   width: 100%;
`;
export const NotificationIconButton = styled.div`
  background: transparent;
  border: none;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export const IconToast = styled.div`
   width: 16px;
   height: 16px;
   vertical-align: middle;
   .icon-success{
      color:#000000;
      fill:#4e9a06;
      fill-opacity:1;
      fill-rule:nonzero;
      stroke:none;
      stroke-width:0.84323651;
      marker:none;
      visibility:visible;
      display:inline;
      overflow:visible;
      enable-background:accumulate
   }
   .icon-error{
      width: 100%;
      overflow:visible;
      enable-background:new 0 0 32 32
   }
`

export const ToastContainerWrapper = styled.div`
   position: fixed;
   z-index: 99999999;
   width: max-content;
   height: max-content;
   color: #444;
`

const CircleAnimation = keyframes`
   from {
   transform: scale(0) rotate(45deg);
      opacity: 0;
   }
   to {
   transform: scale(1) rotate(45deg);
      opacity: 1;
   }`;

const CheckMarkAnimation = keyframes`
   0% {
      height: 0;
      width: 0;
      opacity: 0;
   }
   40% {
   height: 0;
      width: 6px;
      opacity: 1;
   }
   100% {
   opacity: 1;
   height: 10px;
   }`;

export interface CheckMarkTheme {
  primary?: string;
  secondary?: string;
}

export const CheckMarkIcon = styled('div')<CheckMarkTheme>`
  width: 16px;
  opacity: 0;
  height: 16px;
  padding: 1px;
  border-radius: 10px;
  background: ${(p) => p.primary || '#4e9a06'};
  position: relative;
  transform: rotate(45deg);
  animation: ${CircleAnimation} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${CheckMarkAnimation} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${(p) => p.secondary || '#fff'};
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    height: 4px;
    width: 5px;
  }
`;

const FirstLineAnimation = keyframes`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`;

const SecondLineAnimation = keyframes`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`;

export interface ErrorTheme {
  primary?: string;
  secondary?: string;
}

export const ErrorIcon = styled('div')<ErrorTheme>`
  width: 16px;
  opacity: 0;
  height: 16px;
  border-radius: 10px;
  background: ${(p) => p.primary || '#D72828'};
  position: relative;
  transform: rotate(45deg);
  animation: ${CircleAnimation} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after,
  &:before {
    content: '';
    animation: ${FirstLineAnimation} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    /* opacity: 0; */
    background: ${(p) => p.secondary || '#fff'};
    bottom: 7px;
    left: 3px;
    height: 1.5px;
    width: 10px;
  }
  &:before {
    animation: ${SecondLineAnimation} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`;
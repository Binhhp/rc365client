import * as React from "react";
import { ITooltipHostProps } from "./TooltipHost.types";
interface ICustomProps extends ITooltipHostProps {
    darkMode?: string;
}
declare class CustomTooltip extends React.Component<ICustomProps> {
    render(): JSX.Element;
}
export default CustomTooltip;

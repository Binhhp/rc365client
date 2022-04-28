import * as React from "react";
import { ICalendarInlineExampleProps } from "../CalenderStyle";
declare class Breadcrumd extends React.Component<ICalendarInlineExampleProps> {
    onGetDataCalendar: (val: Date | {
        date: Date;
    }[]) => void;
    render(): JSX.Element;
}
export default Breadcrumd;

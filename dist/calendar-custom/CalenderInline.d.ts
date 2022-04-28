import * as React from "react";
import { ICalendarInlineExampleProps, rangeDateExample } from "./CalenderStyle";
import { IDayInfo } from "./CalendarDay";
export interface ICalendarPropsFixed {
    onHighLight?: (day: IDayInfo, rangeDate: rangeDateExample) => string[];
    calendarData?: any;
    onGetSelectionDate?: (startDate: Date, endDate: Date) => void;
}
declare class CalendarInline extends React.Component<ICalendarInlineExampleProps, any> {
    constructor(props: ICalendarInlineExampleProps);
    componentDidMount(): void;
    onHighLightClass: (day: IDayInfo, rangeDate: rangeDateExample) => string[];
    onSelectDate: (date: Date, dateRangeArray?: Date[] | undefined) => Promise<void>;
    onSelectSingleDate: (date: Date, dateRangeArray?: Date[] | undefined) => Promise<void>;
    getMoreDate: (start: Date, end: Date) => {
        date: Date;
    }[];
    goPrevious: () => {
        goPreviousSelectedDate: Date;
    };
    goNext: () => {
        goNextSelectedDate: Date;
    };
    onDismiss: () => void;
    sentDate: () => void;
    onGetMode: () => Promise<void>;
    onHighLightSelectionRange: (startDate: Date, endDate: Date) => Promise<void>;
    render(): JSX.Element;
}
export default CalendarInline;
//# sourceMappingURL=CalenderInline.d.ts.map
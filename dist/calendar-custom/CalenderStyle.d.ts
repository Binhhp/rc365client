import { ICalendarStrings } from "./Calendar.types";
import { IDayInfo } from "./CalendarDay";
export declare enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
/**
 * The months
 * {@docCategory MonthOfYear}
 */
export declare enum MonthOfYear {
    January = 0,
    February = 1,
    March = 2,
    April = 3,
    May = 4,
    June = 5,
    July = 6,
    August = 7,
    September = 8,
    October = 9,
    November = 10,
    December = 11
}
/**
 * First week of the year settings types
 * {@docCategory FirstWeekOfYear}
 */
export declare enum FirstWeekOfYear {
    FirstDay = 0,
    FirstFullWeek = 1,
    FirstFourDayWeek = 2
}
/**
 * The supported date range types
 * {@docCategory DateRangeType}
 */
export declare enum DateRangeType {
    Day = 0,
    Week = 1,
    Month = 2,
    WorkWeek = 3
}
export declare const DAYS_IN_WEEK = 7;
export interface eventExamples {
    [index: number]: {
        date: Date | string;
        event: EventValue;
    };
}
declare enum EventValue {
    eventType1 = 1,
    eventType2 = 2,
    eventType3 = 3
}
export interface ICalendarInlineExampleProps {
    isMonthPickerVisible?: boolean;
    autoNavigateOnSelection: boolean;
    showGoToToday: boolean;
    highlightCurrentMonth?: boolean;
    highlightSelectedMonth?: boolean;
    isDayPickerVisible?: boolean;
    showMonthPickerAsOverlay?: boolean;
    showWeekNumbers?: boolean;
    minDate?: Date;
    maxDate?: Date;
    restrictedDates?: Date[];
    showSixWeeksByDefault?: boolean;
    workWeekDays?: DayOfWeek[];
    firstDayOfWeek?: DayOfWeek;
    darkMode?: string;
    selectedDate?: Date | string;
    onSelectChanged?: (val: Date | {
        date: Date;
    }[]) => void;
    onGetSelectMode?: (pickType: string) => void;
    multilingual?: ICalendarStrings;
    userEvent?: eventExamples;
    switchMode?: boolean;
    rcName?: string;
}
export interface rangeDateExample {
    pickType: string;
    rangeBetween: {
        date: Date;
    }[];
    selectedDate: Date | string;
    selectedDateRange: Date[];
    userEvent: {
        date: string | Date;
        event: number;
    }[];
}
export declare enum TypePick {
    single = "single",
    multiple = "multiple"
}
export interface ICalendarPropsFixed {
    onHighLight?: (day: IDayInfo, rangeDate: rangeDateExample) => string[];
    calendarData?: any;
}
export declare const CalenderDarkMode: import("styled-components").StyledComponent<"div", any, any, string | number | symbol>;
export declare const ToggleWrapper: import("styled-components").StyledComponent<"div", any, {}, never>;
export {};
//# sourceMappingURL=CalenderStyle.d.ts.map
import * as React from "react";
// <ImportCS>
import CalenderInline from "aod-dependencies/calendar-custom/CalenderInline";
// </ImportCS>
import { ICalendarInlineExampleProps } from "../CalenderStyle";

const data = [
  {
    date: "Mon Jul 06 2020 00:00:00 GMT+0700 (Indochina Time)",
    event: 2,
  },
  {
    date: "Tue Jun 16 2020 00:00:00 GMT+0700 (Indochina Time)",
    event: 1,
  },
  {
    date: "Thu Jul 16 2020 00:00:00 GMT+0700 (Indochina Time)",
    event: 1,
  },
  {
    date: "Wed Jul 22 2020 00:00:00 GMT+0700 (Indochina Time)",
    event: 3,
  },
];

class Breadcrumd extends React.Component<ICalendarInlineExampleProps> {
  // <getDate>
  getDateRange = (val: Date | { date: Date }[]): void => {
    console.log(val);
  };
  // </getDate>

  // <getSelectMode>
  getSelectionMode = (pickType: string): void => {
    console.log(pickType);
  };
  // </getSelectMode>

  // <ExampleUsingCalendar>
  render() {
    return (
      <CalenderInline
        autoNavigateOnSelection={true}
        showGoToToday={false}
        highlightSelectedMonth={true}
        showMonthPickerAsOverlay={true}
        showWeekNumbers={false}
        showSixWeeksByDefault={false}
        // <DarkMode>
        darkMode="dark"
        // </DarkMode>
        onSelectChanged={this.getDateRange}
        // <Event>
        userEvent={data}
        // </Event>
        // <ToggleSwitchMode>
        switchMode={true}
        // </ToggleSwitchMode>
        // onGetSelectMode={this.getSelectionMode}
      />
    );
  }
}
// </ExampleUsingCalendar>

export default Breadcrumd;

//  // <Multilingual>
//  multilingual={Languages}
//  // </Multilingual>

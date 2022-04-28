export class TimeFunction {
  public static onFormatDateTimeUTC = (time: string) => {
    return (new Date(time)).toLocaleString('en-US', {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  }

  public static onRenderTime = (CreatedAt: any) => {
    let createdAt = new Date(CreatedAt);
    let today = new Date();
    if (createdAt.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
      return TimeFunction.onConvertDateToTime(new Date(CreatedAt));
    }
    return TimeFunction.onFormatDate(new Date(CreatedAt));
  };

  public static onConvertDateToTime = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let newMinutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + newMinutes + " " + ampm;
    return strTime;
  };

  public static onConvertBetweenDateAndTicks = (
    data: Date | number,
    isOnlyDate?: boolean
  ): string | number => {
    const epochTicks = 621355968000000000;
    const ticksPerMillisecond = 10000;
    const maxDateMilliseconds = 8640000000000000;
    let dateWithTime: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };
    let onlyDate: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    // ticks to date
    if (typeof data === "number") {
      if (isNaN(data)) {
        return "";
      }
      const ticksSinceEpoch = data - epochTicks;
      const millisecondsSinceEpoch = ticksSinceEpoch / ticksPerMillisecond;
      if (millisecondsSinceEpoch > maxDateMilliseconds) {
        return "+WHOAWH-OA-ISTOO:FA:RA.WAYZ";
      }
      const date = new Date(millisecondsSinceEpoch);
      return date.toLocaleDateString(
        "en-US",
        isOnlyDate ? onlyDate : dateWithTime
      );
    }
    // date to ticks
    if (
      Object.prototype.toString.call(data) === "[object Date]" &&
      typeof data !== "string"
    ) {
      let ticks = data.getTime() * ticksPerMillisecond + epochTicks;
      return ticks;
    }
    return "";
  };

  public static onFormatDate = (date: Date) => {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("/");
  };

  public static GetClientTimeZone = (): string => {
    let offset = new Date().getTimezoneOffset(),
      o = Math.abs(offset);
    return (
      (offset < 0 ? "+" : "-") +
      ("00" + Math.floor(o / 60)).slice(-2) +
      ":" +
      ("00" + (o % 60)).slice(-2)
    );
  };
}

import moment from "moment";

export const dateMoment = {
  convertDate: (date: string, formatDateCurrent?: string, formatDateConvert?: string) => {
    return moment(date, formatDateCurrent ?? typeDate.yyyymmdd).format(formatDateConvert ?? typeDate.ddmmyyyy);
  },
  convertDateDetail: (date: string) => {
    return moment(date).format("LLLL"); //Thursday, December 21, 2023 5:19 PM
  },
  getDay: (date?: string) => {
    return moment(date).format(typeDate.dayNumber);
  },
  currentDate: () => {
    return moment().format(typeDate.mmddyyyy);
  },
};

export const convertTimeMessage = (date: string) => {
  const timeCurrent = moment().format();
  const date1 = moment(date);
  const date2 = moment(timeCurrent);
  const diffInMinutes = date2.diff(date1, "minutes");
  const diffInHour = date2.diff(date1, "hour");
  if (diffInMinutes < 60) {
    if (diffInMinutes <= 0) {
      return "1 m Ago";
    } else {
      return `${diffInMinutes} m Ago`;
    }
  } else if (diffInMinutes > 60 && diffInHour < 24) {
    return `${diffInHour} h Ago`;
  } else if (diffInHour > 24) {
    return dateMoment.convertDate(date);
  }
};

export const convertTimeSeenMessage = (dateSeenMessage: string, dateSentMessage: string) => {
  // const timeCurrent = moment().format();
  const date1 = moment(dateSeenMessage);
  const date2 = moment(dateSentMessage);
  const diffInMinutes = date2.diff(date1, "minutes");
  const diffInHour = date2.diff(date1, "hour");
  if (diffInMinutes < 60) {
    if (diffInMinutes <= 0) {
      return "1 m Ago";
    } else {
      return `${diffInMinutes} m Ago`;
    }
  } else if (diffInMinutes > 60) {
    return `${diffInHour} h Ago`;
  } else if (diffInHour > 24) {
    return dateMoment.convertDate(dateSeenMessage);
  }
};

export const checkDay = (dateCompareAgument: string) => {
  const currentDate = moment().format(typeDate.dayNumber);
  const dateCompare = dateMoment.convertDate(dateCompareAgument, "", typeDate.dayNumber);
  return currentDate === dateCompare;
};

export const typeDate = {
  ddmmyyyy: "DD-MM-YYYY",
  mmddyyyy: "MM-DD-YYYY",
  yyyymmdd: "YYYY-MM-DD",
  time: "hh:mm:ss",
  timehhmm: "hh:mm",
  detail: "LLLL",
  day: "dddd",
  month: "MMMM",
  dayNumber: "D",
  monthNumber: "M",
  yearNumber: "YYYY",
  yyyymmhhmmss: "YYYY-MM-DD hh:mm:ss",
  ddmmyyyyhhmmss: "DD-MM-YYYY hh:mm:ss",
};
export const DATE_FORMAT_CLIENT = "DD-MM-YYYY";
export const DATE_FORMAT_V2_START = "YYYY-MM-DD 00:00:00";
export const DATE_FORMAT_V2_END = "YYYY-MM-DD 23:59:59";

//moment(date).day() get ngày thứ mấy trong tuần number

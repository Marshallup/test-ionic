import { format } from "date-fns";

export function isValidDateFromStr(date: string) {
  try {
    return !!Date.parse(date);
  } catch (error) {
    return false;
  }
}

export function getFormatDate(date: string, dateFormat = "dd.MM.yyyy") {
  return isValidDateFromStr(date) ? format(new Date(date), dateFormat) : null;
}

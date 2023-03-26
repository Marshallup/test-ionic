import dayjs from "dayjs";

export function getFormatDate(date: string, format: string) {
  return date ? dayjs(date).format(format) : "";
}

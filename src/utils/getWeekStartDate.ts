import { formatDate } from "./formatdate";

export const getWeekStartDate = (date: Date) => {
  const day = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((day + 6) % 7));
  return formatDate(monday);
};

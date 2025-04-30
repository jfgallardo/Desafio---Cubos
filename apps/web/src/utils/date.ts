import dayjs from "dayjs";

export const formatDateRange = (
  startDate: string | Date,
  endDate: string | Date
): string[] => {
  const formattedStartDate = dayjs(startDate).startOf("day").toISOString();
  const formattedEndDate = dayjs(endDate).endOf("day").toISOString();
  return [formattedStartDate, formattedEndDate];
};

export const formatDate = (date: string | Date): string => {
  return dayjs(date).startOf("day").toISOString();
};

export const formatEndDate = (date: string | Date): string => {
  return dayjs(date).endOf("day").toISOString();
};

import { FormatDateOptions } from "../../types/core";

export const formatDate = (
  date: Date,
  formatOption: FormatDateOptions = "both"
): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${month} ${day} ${year}`;
  const formattedTime = `${hours}:${minutes}`;

  switch (formatOption) {
    case "date":
      return formattedDate;
    case "time":
      return formattedTime;
    case "both":
    default:
      return `${formattedDate},${formattedTime}`;
  }
};

export function parseDateString(dateString: string) {
  if (!dateString.includes("T")) {
    dateString += "T00:00";
  } else {
    const [datePart, timePart] = dateString.split("T");
    if (!timePart) {
      dateString = `${datePart}T00:00`;
    }
  }
  const dateObject = new Date(dateString);
  if (isNaN(dateObject.getTime())) {
    throw new Error("Invalid date format");
  }
  return dateObject;
}

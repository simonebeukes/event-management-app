// Months used for dropdowns and calendar headers
export const MONTHS = [
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

/* Returns the number of days in a given month.
 - year: full year (e.g. 2026)
 - monthIndex: 0-based month index (0 = January, 11 = December) */
export const getDaysInMonth = (year, monthIndex) => {
  // new Date(year, monthIndex + 1, 0) gives the last day of the target month
  return new Date(year, monthIndex + 1, 0).getDate();
};

/* Returns the day of the week of the first day of the given month.
 - year: full year
 - monthIndex: 0-based month index
 - result: 0 (Sunday) through 6 (Saturday) */
export const getFirstDayOfWeek = (year, monthIndex) => {
  return new Date(year, monthIndex, 1).getDay(); // 0 = Sunday
};

/* Formats a date as a string key in YYYY-MM-DD format.
 - Used as a reliable ID for comparing and grouping events by date. */
export const formatDateKey = (year, monthIndex, day) => {
  // monthIndex is 0-based, so add 1 and pad to 2 digits
  const m = String(monthIndex + 1).padStart(2, "0");
  // day is 1-based, pad to 2 digits
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
};

/* Returns the weekday name for a given date string.
 - dateString should be in a format parseable by Date (e.g. YYYY-MM-DD).*/
export const getWeekdayName = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleDateString(undefined, { weekday: "long" });
};

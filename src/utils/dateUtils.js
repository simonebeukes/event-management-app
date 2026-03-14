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

export const getDaysInMonth = (year, monthIndex) => {
  return new Date(year, monthIndex + 1, 0).getDate();
};

export const getFirstDayOfWeek = (year, monthIndex) => {
  return new Date(year, monthIndex, 1).getDay(); // 0 = Sunday
};

export const formatDateKey = (year, monthIndex, day) => {
  const m = String(monthIndex + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
};

export const getWeekdayName = (dateString) => {
  const d = new Date(dateString);
  return d.toLocaleDateString(undefined, { weekday: "long" });
};

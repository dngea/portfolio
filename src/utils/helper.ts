export function formatMonthYear(date: string, onlyYear?: boolean) {
  const [month, year] = date.split("/").map(Number);

  if (Number.isNaN(month) || Number.isNaN(year)) {
    return date;
  }

  const monthName = new Date(year, month - 1).toLocaleString("en-US", {
    month: "long",
  });

  if (onlyYear) return year;

  return `${monthName} ${year}`;
}

export function formatMonthYear(
  date: string | Date,
  onlyYear?: boolean,
): string {
  if (typeof date === "string") {
    const [month, year] = date.split("/").map(Number);

    if (Number.isNaN(month) || Number.isNaN(year)) {
      return date;
    }

    const monthName = new Date(year, month - 1).toLocaleString("en-US", {
      month: "long",
    });

    if (onlyYear) return String(year);

    return `${monthName} ${year}`;
  }

  const year = date.getFullYear();
  const month = date.toLocaleString("en-UK", { month: "long" });

  if (onlyYear) return String(year);

  return `${month} ${year}`;
}

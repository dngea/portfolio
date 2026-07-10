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

export function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^?&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

export function isYouTubeLink(url: string): boolean {
  return url.includes("youtube.com") || url.includes("youtu.be");
}

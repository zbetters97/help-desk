/* 8:00 PM */
export function formatTime(time) {
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  return formattedTime;
}

/* 01/01/2025 */
export function formatDateMDYShort(date) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return formattedDate;
}

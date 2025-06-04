/* 8:00 PM */
export function formatTime(time) {
  const formattedTime = new Date(`1970-01-01T${time}Z`).toLocaleTimeString(
    "en-US",
    { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" }
  );

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

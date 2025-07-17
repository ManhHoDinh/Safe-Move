export const formatDate = (date: Date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0"); // Ensures two digits for day
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Ensures two digits for month
  const year = d.getFullYear();

  const hours = String(d.getHours()).padStart(2, "0"); // Ensures two digits for hours (24-hour format)
  const minutes = String(d.getMinutes()).padStart(2, "0"); // Ensures two digits for minutes
  const seconds = String(d.getSeconds()).padStart(2, "0"); // Ensures two digits for seconds

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

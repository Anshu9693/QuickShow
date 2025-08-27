function isoTimeFormate(isoString) {
  const date = new Date(isoString); // auto-converts from UTC to local time

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12) || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${period}`;
}
export default isoTimeFormate;
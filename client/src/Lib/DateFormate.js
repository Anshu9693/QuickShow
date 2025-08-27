export const DateFormat = (date) => {
  return new Date(date).toLocaleString('en-US', {
    weekday: 'short',   // e.g. "Sat"
    month: 'long',      // e.g. "July"
    day: 'numeric',     // e.g. "12"
    hour: 'numeric',    // e.g. "5"
    minute: 'numeric'   // e.g. "45"
  });
};

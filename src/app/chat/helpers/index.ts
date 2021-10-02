/** Gets the time from date value
 * @param date The date object to extract time from
 */
export const getTime = (date: Date) => {
  date = new Date(date);
  return `${addLeadingZero(date.getHours())}:${addLeadingZero(
    date.getMinutes(),
  )}`;
};

/** Adds a leading zero to single digits */
const addLeadingZero = (num: number) => (num < 10 ? '0' + num : num);

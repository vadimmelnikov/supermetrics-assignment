const MONTH = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export const getDayName = (date: Date) => MONTH[date.getMonth()];

export function formatDate(date: Date) {
  const isoDate = new Date(date.toISOString().slice(0, -1));

  const day = padTo2Digits(isoDate.getDate());
  const month = getDayName(isoDate);
  const year = isoDate.getFullYear();
  const time = `${padTo2Digits(isoDate.getHours())}:${padTo2Digits(
    isoDate.getMinutes(),
  )}:${padTo2Digits(isoDate.getSeconds())}`;

  return `${month} ${day}, ${year} ${time}`;
}

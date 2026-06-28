import dayjs from 'dayjs';

export function formatDate(date: Date | string) {
  return dayjs(date).format('DD MMM YYYY • hh:mm A');
}

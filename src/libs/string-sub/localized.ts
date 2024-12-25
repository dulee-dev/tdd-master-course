import dayjs from 'dayjs';

export const localizeDate = (date: Date): string => {
  return dayjs(date).format('YYYY년 MM월 DD일'); // display
};

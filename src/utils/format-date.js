import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const MINUTES_PER_HOUR = 60;

export const formatReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');

export const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins/MINUTES_PER_HOUR);
  const minutes = mins % MINUTES_PER_HOUR;
  if (mins > MINUTES_PER_HOUR) {
    return hours + 'h ' + minutes + 'm';
  }

  return minutes + 'm';
};

export const getCommentDate = (date) => {
  return dayjs().to(dayjs(date));
};

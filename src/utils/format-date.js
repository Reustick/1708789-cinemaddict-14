import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const MINUTES_PER_HOUR = 60;

const formatReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');

const getTimeFromMins = (mins) => {
  const hours = Math.trunc(mins/MINUTES_PER_HOUR);
  const minutes = mins % MINUTES_PER_HOUR;
  if (mins > MINUTES_PER_HOUR) {
    return hours + 'h ' + minutes + 'm';
  }

  return minutes + 'm';
};

const getCommentDate = (date) => {
  return dayjs().to(dayjs(date));
};

export { formatReleaseDate, getTimeFromMins, getCommentDate };

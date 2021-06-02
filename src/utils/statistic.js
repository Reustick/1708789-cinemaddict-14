import dayjs from 'dayjs';
import { TimeRange } from '../const.js';

const WATCHED_TITLES = [
  {watched: 21, title: 'Movie Buff'},
  {watched: 11, title: 'Fan'},
  {watched: 1, title: 'Novice'},
  { watched: 0, title: '' },
];

export const countWatchedFilms = (films) => films
  .reduce((count, film) => film.isWatched ? count + 1 : count, 0);

export const getRankTitle = (value) => WATCHED_TITLES
  .find(({watched}) => watched <= value)
  .title;

export const filterWatchedFilmsInRange = ({films, range}) => {
  if (range === TimeRange.ALL_TIME) {
    return films.slice();
  }

  return films.filter((film) => {
    const now = new Date();

    return dayjs(film.watchingDate).isSame(now, range);
  });
};

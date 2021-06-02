import { FilterType } from '../const';
export const filterTypeToFilterFilms = {
  [FilterType.ALL_MOVIES]: (films) => films.slice(),
  [FilterType.WATHCLIST]: (films) => films.filter((film) => film.isWatchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
  [FilterType.STATISTICS]: (films) => films.slice(),
};

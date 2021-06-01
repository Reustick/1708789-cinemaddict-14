import { generateFilmCards } from './mock/card-for-film.js';
// import { generateFilter } from './mock/filter.js';
import { FILMS_COUNT } from './const.js';
import MovieListPresenter from './presenter/movie-list.js';

const films = new Array(FILMS_COUNT).fill().map(generateFilmCards);
// const filters = generateFilter(films);
const siteMainElement = document.querySelector('.main');

const movieListPresenter = new MovieListPresenter(siteMainElement);
movieListPresenter.init(films);

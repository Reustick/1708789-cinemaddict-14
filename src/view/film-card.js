import AbstractView from './abstract.js';
import { getTimeFromMins }  from '../utils/format-date.js';
import { truncateText }  from '../utils/common.js';
const MAX_DESCRIPTION_LENGTH = 140;

const GENRE_MAIN = 0;

const createControlButtonTemplate = (name, title, isActive = false) => {
  const activeClass = isActive ? 'film-card__controls-item--active' : '';
  return (
    `<button class="film-card__controls-item button film-card__controls-item--${name} ${activeClass}">
      ${title}
    </button>`
  );
};

const createFilmCard = (film) => {
  const {
    title,
    totalRating,
    date,
    runtime,
    genres,
    poster,
    description,
    comments,
    isWatchlist,
    isWatched,
    isFavorite,
  } = film;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${date.getFullYear()}</span>
        <span class="film-card__duration">${getTimeFromMins(runtime)}</span>
        <span class="film-card__genre">${genres[GENRE_MAIN]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${truncateText(description, MAX_DESCRIPTION_LENGTH)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <div class="film-card__controls">
        ${createControlButtonTemplate('add-to-watchlist', 'Add to watchlist', isWatchlist)}
        ${createControlButtonTemplate('mark-as-watched', 'Mark as watched', isWatched)}
        ${createControlButtonTemplate('favorite', 'Mark as favorite', isFavorite)}
      </div>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._filmClickHandler = this._filmClickHandler.bind(this);
    this._arrayElement = null;

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

  }
  getTemplate() {
    return createFilmCard(this._film);
  }

  _getArrayElement() {
    if (!this._arrayElement) {
      return this._arrayElement = this.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments');
    }
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _filmClickHandler(evt) {
    evt.preventDefault();
    this._callback.filmClick();
  }

  setFilmClickHandler(callback) {
    this._callback.filmClick = callback;
    for (const clickElement of this._getArrayElement()) {
      clickElement.addEventListener('click', this._filmClickHandler);
    }
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

}

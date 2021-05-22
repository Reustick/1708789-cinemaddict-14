import AbstractView from './abstract.js';
const createFilmCard = (film) => {
  const {poster,title, rating, releaseDate, duration, genre, description, comments} = film;
  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${releaseDate.getFullYear()}</span>
    <span class="film-card__duration">${duration.getHours()}h ${duration.getMinutes()}m</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="${poster}" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._filmClickHandler = this._filmClickHandler.bind(this);
  }
  getTemplate() {
    return createFilmCard(this._film);
  }

  _filmClickHandler(evt) {
    evt.preventDefault();
    this._callback.filmClick();
  }

  setFilmClickHandler(callback) {
    this._callback.filmClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._filmClickHandler);
  }
}

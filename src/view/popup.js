import { createButtonCloseTemplate, createTableTemplate, createControlsTemplate, createCommentListTemplate } from './popup/index.js';
import SmartView from './smart.js';

const createPopupTemplate = (film) => {
  const {
    comments,
  } = film;


  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          ${createButtonCloseTemplate()}
          ${createTableTemplate(film)}
          ${createControlsTemplate(film)}
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            ${createCommentListTemplate(film)}
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmPopup extends SmartView {
  constructor(data) {
    super();
    this._state = FilmPopup.parseFilmCardToState(data);

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._popupCloseButtonClickHandler = this._popupCloseButtonClickHandler.bind(this);

    this._emojiListChangeHandler = this._emojiListChangeHandler.bind(this);
    this._commentInputInputHandler = this._commentInputInputHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._state);
  }

  reset(data) {
    this.updateData(
      FilmPopup.parseFilmCardToState(data),
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  setWatchlistClickHandler(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.clickWatched = callback;
    this.getElement().querySelector('.film-details__control-label--watched').addEventListener('click', this._watchedClickHandler);
  }

  setCloseButtonClickHandler(callback) {
    this._callback.clickCloseButton = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupCloseButtonClickHandler);
  }

  _setInnerHandlers() {
    const item = this.getElement();
    item.querySelector('.film-details__emoji-list').addEventListener('change', this._emojiListChangeHandler);
    item.querySelector('.film-details__comment-input').addEventListener('input', this._commentInputInputHandler);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickWatchlist();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickFavorite();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickWatched();
  }

  _popupCloseButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickCloseButton();
  }

  _emojiListChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      currentEmoji: evt.target.value,
    });
  }

  _commentInputInputHandler(evt) {
    evt.preventDefault();
    this.updateData(
      { currentTextComment: evt.target.value },
      true,
    );
  }

  static parseFilmCardToState(film) {
    return Object.assign(
      {},
      film,
      {
        currentEmoji: '',
        currentTextComment: '',
      },
    );
  }

  static parseStateToFilmCard(film) {
    film = Object.assign({}, film);
    delete film.currentTextComment;
    delete film.currentEmoji;
    return film;
  }
}

import FilmCardView  from '../view/film-card.js';
import FilmPopupView from '../view/popup.js';
import { render, RenderPosition, remove, replace } from '../utils/render.js';

const Mode = {
  CLOSE: 'CLOSE',
  OPENED: 'OPENED',
};

export default class Film {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._popupComponent = null;
    this._mode = Mode.CLOSE;

    this._bodyElement = document.querySelector('body');
    this._siteMainElement = document.querySelector('.main');

    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleCloseFilmClick = this._handleCloseFilmClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._popupComponent = new FilmPopupView(film);

    this._filmCardComponent.setFilmClickHandler(this._handleFilmClick);
    this._popupComponent.setCloseButtonClickHandler(this._handleCloseFilmClick);

    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._setPopupEventListeners();

    if (prevFilmCardComponent === null || prevPopupComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }
    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this._mode === Mode.CLOSE) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._mode === Mode.OPENED) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode === Mode.OPENED) {
      this._handleCloseFilmClick();
    }
  }

  _setPopupEventListeners() {
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setCloseButtonClickHandler(this._handleCloseFilmClick);
  }

  _handleFilmClick() {
    if (this._mode === Mode.OPENED) {
      return;
    }
    this._changeMode();
    this._mode = Mode.OPENED;
    this._setPopupEventListeners();
    this._siteMainElement.appendChild(this._popupComponent.getElement());
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._bodyElement.classList.add('hide-overflow');
  }

  _handleCloseFilmClick() {
    this._siteMainElement.removeChild(this._popupComponent.getElement());
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._bodyElement.classList.remove('hide-overflow');
    this._popupComponent.reset(this._film);
    this._mode = Mode.CLOSE;
  }
  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._handleCloseFilmClick();
    }
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !this._film.isWatchlist,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }
}

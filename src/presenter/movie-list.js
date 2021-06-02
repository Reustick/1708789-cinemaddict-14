import MainContentView from '../view/main-content.js';
import AllFilmsView from '../view/all-films.js';
import AllFilmsListView from '../view/all-films-list.js';
import LoadMoreButtonView from '../view/load-more-button.js';
import NoFilmView from '../view/no-film.js';
import LoadingView from '../view/loading.js';
import FilmCardPresenter from './movie.js';
import FilmPopup from './popup.js';
import SiteSort from '../view/sort.js';
import { render, remove } from '../utils/render.js';
import { FILM_COUNT_PER_STEP, FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { filterTypeToFilterFilms } from '../utils/filter.js';

const actionTypeToFilterType = {
  [UserAction.UPDATE_WATCHED]: FilterType.HISTORY,
  [UserAction.UPDATE_FAVORITE]: FilterType.FAVORITES,
  [UserAction.UPDATE_WATCHLIST]: FilterType.WATHCLIST,
};

export default class MovieList {
  constructor(container, filmsModel, filterModel, commentsModel, api) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._siteSortView = null;
    this._showMoreButtonView = null;
    this._allFilmsView = new AllFilmsView();
    this._listView = new AllFilmsListView();
    this._noFilmsView = new NoFilmView();
    this._mainContentView = new MainContentView();
    this._loadingView = new LoadingView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmCardPresenter = {};
    this._popupPresenter = null;
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._filmsModel.subscribe(this._handleModelEvent);
    this._filterModel.subscribe(this._handleModelEvent);
  }

  init() {
    this._render();
  }

  _get() {
    const filterType = this._filterModel.getType();
    const films = this._filmsModel.get().slice();
    const filtredFilms = filterTypeToFilterFilms[filterType](films);

    switch (this._currentSortType) {
      case SortType.BY_DATE:
        return filtredFilms.sort((filmA, filmB) => filmB.date - filmA.date);
      case SortType.BY_RATING:
        return filtredFilms.sort((filmA, filmB) => filmB.totalRating - filmA.totalRating);
    }

    if (filtredFilms.length === 0 ) {
      this._renderNoFilms();
    }
    return filtredFilms;
  }

  _handleModeChange(film) {
    this._renderPopup(film);
  }

  _renderPopup(film) {
    if (this._popupPresenter === null) {
      this._popupPresenter = new FilmPopup(document.body, this._handleViewAction, this._commentsModel, this._api);
    }

    this._popupPresenter.init(film);
  }

  _updatePopup(film) {
    const presenter = this._popupPresenter;

    if (presenter !== null && presenter.isOpen(film)) {
      presenter.init(film);
    }
  }

  _updateCard(film) {
    const presenter = this._filmCardPresenter[film.id] || null;

    if (presenter !== null) {
      presenter.init(film);
    }
  }

  _renderFilmCard(film) {
    const filmCardPresenter = new FilmCardPresenter(this._listView, this._handleViewAction, this._handleModeChange);

    filmCardPresenter.init(film);
    this._filmCardPresenter[film.id] = filmCardPresenter;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;

    this._clear({resetRenderedFilmCount: false});
    this._render();
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilmCard(film));
  }

  _renderLoading() {
    render(this._mainContentView, this._loadingView);
  }

  _renderNoFilms() {
    render(this._mainContentView, this._noFilmsView);
  }

  _renderSort() {
    if (this._siteSortView !== null) {
      this._siteSortView = null;
    }

    this._siteSortView = new SiteSort(this._currentSortType);
    this._siteSortView.setSortTypeClickHandler(this._handleSortTypeChange);
    render(this._container, this._siteSortView);
  }

  _handleShowMoreButtonClick() {
    const films = this._get();
    const filmCount = films.length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const nextFilms = films.slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(nextFilms);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonView);
    }
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonView !== null) {
      this._showMoreButtonView = null;
    }

    this._showMoreButtonView = new LoadMoreButtonView();
    this._showMoreButtonView.setClickHandler(this._handleShowMoreButtonClick);

    render(this._allFilmsView, this._showMoreButtonView);
  }

  _render() {
    if (this._isLoading) {
      render(this._container, this._mainContentView);
      this._renderLoading();
      return;
    }

    if (this._filmsModel.isEmpty()) {
      render(this._container, this._mainContentView);
      this._renderNoFilms();
      return;
    }

    const films = this._get();
    const filmCount = films.length;

    if (filmCount === 0) {
      remove(this._allFilmsView);
      render(this._container, this._mainContentView);
      this._renderNoFilms();
      return;
    }

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));
    this._renderSort();

    render(this._container, this._mainContentView);
    render(this._mainContentView, this._allFilmsView);
    render(this._allFilmsView, this._listView);

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _clear({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    Object
      .values(this._filmCardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmCardPresenter = {};

    remove(this._mainContentView);
    remove(this._siteSortView);
    remove(this._noFilmsView);
    remove(this._loadingView);
    remove(this._showMoreButtonView);

    this._renderedFilmCount = resetRenderedFilmCount ? FILM_COUNT_PER_STEP : Math.min(this._get().length + FILM_COUNT_PER_STEP, this._renderedFilmCount);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  hide() {
    this._mainContentView.hide();
    this._siteSortView.hide();
    this._noFilmsView.hide();
    this._showMoreButtonView.hide();
  }

  show() {
    this._mainContentView.show();
    this._siteSortView.show();
    this._noFilmsView.show();
    this._showMoreButtonView.show();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_WATCHED:
      case UserAction.UPDATE_FAVORITE:
      case UserAction.UPDATE_WATCHLIST:
        this._api.updateFilm(update)
          .then((response) => {
            this._filmsModel.update(
              this._filterModel.getType() === actionTypeToFilterType[actionType] ? UpdateType.MINOR : updateType,
              response,
            );
          })
          .catch(() => {
            if (this._popupPresenter !== null ) {
              this._popupPresenter.shake();
              return;
            }
            this._filmCardPresenter[update.id].shake();
          });
        break;
      case UserAction.ADD_COMMENT:
        this._popupPresenter.setDisabledStatus();
        this._api.addComment(update.filmId, update.comment)
          .then(({ film, comments }) => {
            this._commentsModel.set(updateType, film.id, comments);
            this._filmsModel.update(updateType, film);
            this._popupPresenter.resetInput();
          })
          .catch(() => {
            this._popupPresenter.shakeInputForm();
          })
          .finally(() => {
            this._popupPresenter.setDefaultStatus();
          });
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.update(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._updateCard(data);
        this._updatePopup(data);
        break;
      case UpdateType.MINOR:
        this._updatePopup(data);
        this._clear();
        this._render();
        break;
      case UpdateType.MAJOR:
        this._clear({resetRenderedFilmCount: true, resetSortType: true});
        this._render();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingView);
        this._render();
        break;
    }
  }

}

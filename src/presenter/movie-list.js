import SiteMenuView from '../view/menu.js';
import UserView from '../view/user.js';
import SortView from '../view/sort.js';
import FooterStatisticView from '../view/footer.js';
import LoadMoreButtonView from '../view/button-show-more.js';
import FilmWrapView from '../view/film-wrap.js';
import NoFilmView from '../view/no-film.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { updateItem } from '../utils/common.js';
import { FILM_COUNT_PER_STEP, SortType } from '../const.js';
import { generateFilter } from '../mock/filter.js';
import FilmPresenter from './movie.js';

export default class MovieList {
  constructor(movieContainer) {
    this._movieContainer = movieContainer;
    this._siteUserElement = document.querySelector('.header');
    this._siteFooterElement = document.querySelector('.footer__statistics');

    this._filmWrapComponent = new FilmWrapView().getElement().querySelector('.films-list__all');
    this._sortComponent = new SortView();
    this._noFilmComponent = new NoFilmView();
    this._menuComponent = new SiteMenuView();
    this._userComponent = new UserView();
    this._footerComponent = new FooterStatisticView();
    this._loadMoreButtonComponent = new LoadMoreButtonView();

    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    // this._filters = generateFilter(this._films);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();
    render(this._movieContainer, this._filmWrapComponent, RenderPosition.BEFOREEND);
    this._renderFilmWrap();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _renderMenu() {
    render(this._movieContainer, this._menuComponent, RenderPosition.AFTERBEGIN);
  }

  _renderUser() {
    render(this._siteUserElement, this._userComponent, RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {
    render(this._movieContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeClickHandler(this._handleSortTypeChange);
  }

  _renderFooter() {
    render(this._siteFooterElement, this._footerComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmWrapComponent, this._handleFilmChange, this._handleModeChange);
    filmPresenter.init(film, film.commentsList);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._filmWrapComponent, this._noFilmComponent, RenderPosition.AFTERBEGIN);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this._renderedFilmCount >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderLoadMoreButton() {
    render(this._movieContainer, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderFilmList(){
    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
  _renderFilmWrap() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }
    this._renderFilmList();
    this._renderSort();
    this._renderMenu(/*this._filters*/);
    this._renderUser();
    this._renderFooter();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._films.sort((filmA, filmB) => {return filmB.releaseDate - filmA.releaseDate;});
        break;
      case SortType.BY_RATING:
        this._films.sort((filmA, filmB) => {return filmB.rating - filmA.rating;});
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }
    this._currentSortType = sortType;
  }
}

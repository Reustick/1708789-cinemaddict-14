import SortView from '../view/sort.js';
import LoadMoreButtonView from '../view/button-show-more.js';
import FilmWrapView from '../view/film-wrap.js';
import NoFilmView from '../view/no-film.js';
import FilmCardView  from '../view/film-card.js';
import FilmPopupView from '../view/popup.js';
import { generateFilmCards } from '../mock/card-for-film.js';
import { generateComments } from '../mock/movie-comment.js';
import { render, RenderPosition, remove } from '../utils/render.js';
import { CARDS_MIN_COUNT, FILMS_COUNT, FILM_COUNT_PER_STEP, FILTERS } from '../const.js';

export default class MovieList {
  constructor(movieContainer) {
    this._movieContainer = movieContainer;

    this._filmWrapComponent = new FilmWrapView();
    this._sortComponent = new SortView();
    this._noFilmComponent = new NoFilmView();
  }

  init(films, comments) {
    this._films = films.slice();
    this._filmCardComponent = new FilmCardView(films);
    this._popupComponent = new FilmPopupView(films,comments);
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
    // render(this._movieContainer, this._filmWrapComponent, RenderPosition.BEFOREEND);
    this._renderFilmWrap();
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(this._movieContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film) {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
    const bodyElement = document.querySelector('body');
    const siteMainElement = document.querySelector('.main');
    // const filmComponent = new FilmCardView(film);
    // const popupElement = new FilmPopupView(film/*, comments[0]*/);
    this._filmCardComponent.setFilmClickHandler(() => {
      siteMainElement.appendChild(this._popupComponent);
      document.addEventListener('keydown', onEscKeyDown);
      bodyElement.classList.add('hide-overflow');
    });

    const closePopup = () => {
      siteMainElement.removeChild(this._popupComponent);
      document.removeEventListener('keydown', onEscKeyDown);
      bodyElement.classList.remove('hide-overflow');
    };

    this._popupComponent.setCloseFilmClickHandler(() =>{
      closePopup();
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    render(this._filmWrapComponent, this._filmCardComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    // Метод для рендеринга N-задач за раз
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    // Метод для рендеринга заглушки
    render(this._filmWrapComponent, this._noFilmComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    // Метод, куда уйдёт логика по отрисовке компонетов задачи,
    // текущая функция renderTask в main.js
    let renderedFilmsCount = FILM_COUNT_PER_STEP;
    const loadMoreButtonComponent = new LoadMoreButtonView();
    render(this._filmWrapComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);
    loadMoreButtonComponent.setClickHandler(() => {
    this._films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => this._renderFilm(film));
      renderedFilmsCount += FILM_COUNT_PER_STEP;
      if (renderedFilmsCount >= this._films.length) {
      remove(loadMoreButtonComponent);
      }
    });
  }
  _renderFilmList(){
    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
  _renderFilmWrap() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
    this._films.length === 0 ? this._renderNoFilms() : this._renderFilm();
    this._renderSort();
    this._renderFilmList();
  }
}

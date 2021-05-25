import SiteMenuView from './view/menu.js';
import SortView from './view/sort.js';
import UserView from './view/user.js';
import FilmWrapView from './view/film-wrap.js';
import FilmCardView  from './view/film-card.js';
import LoadMoreButtonView from './view/button-show-more.js';
import FilmPopupView from './view/popup.js';
import FooterStatisticView from './view/footer.js';
import NoFilmView from './view/no-film.js';
import { generateFilmCards } from './mock/card-for-film.js';
import { generateComments } from './mock/movie-comment.js';
import { render, RenderPosition, remove } from './utils/render.js';
import { CARDS_MIN_COUNT, FILMS_COUNT, FILM_COUNT_PER_STEP, FILTERS } from './const.js';

const films = new Array(FILMS_COUNT).fill().map(generateFilmCards);
const comments = new Array(5).fill().map(generateComments);
const bodyElement = document.querySelector('body');
const siteUserElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');

render(siteUserElement, new UserView(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortView(FILTERS), RenderPosition.BEFOREEND);

films.length === 0 ?
  render(siteMainElement, new NoFilmView(), RenderPosition.BEFOREEND) :
  render(siteMainElement, new FilmWrapView(), RenderPosition.BEFOREEND);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const popupElement = new FilmPopupView(film, comments[0]);
  filmComponent.setFilmClickHandler(() => {
    siteMainElement.appendChild(popupElement.getElement());
    document.addEventListener('keydown', onEscKeyDown);
    bodyElement.classList.add('hide-overflow');
  });

  const closePopup = () => {
    siteMainElement.removeChild(popupElement.getElement());
    document.removeEventListener('keydown', onEscKeyDown);
    bodyElement.classList.remove('hide-overflow');
  };

  popupElement.setCloseFilmClickHandler(() =>{
    closePopup();
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

const filmCardContainer = document.querySelector('.films-list__all');
const filmCardContainerTop = document.querySelector('.films-list__top');
const filmCardContainerMost = document.querySelector('.films-list__most');
const containerForButtonShowMore = document.querySelector('.films-list');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmCardContainer, films[i]);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;
  const loadMoreButtonComponent = new LoadMoreButtonView();
  render(containerForButtonShowMore, loadMoreButtonComponent, RenderPosition.BEFOREEND);
  loadMoreButtonComponent.setClickHandler(() => {
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmCardContainer, film));
    renderedFilmsCount += FILM_COUNT_PER_STEP;
    if (renderedFilmsCount >= films.length) {
      remove(loadMoreButtonComponent);
    }
  });
}

for (let i = 0; i < CARDS_MIN_COUNT; i++) {
  renderFilm(filmCardContainerTop, films[i]);
  renderFilm(filmCardContainerMost, films[i]);
}
render(siteFooterElement, new FooterStatisticView(), RenderPosition.BEFOREEND);

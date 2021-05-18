import SiteMenuView from './view/menu.js';
import SortView from './view/sort.js';
import UserView from './view/user.js';
import FilmWrapView from './view/film-wrap.js';
import FilmCardView  from './view/film-card.js';
import LoadMoreButtonView from './view/button-show-more.js';
import FilmPopupView from './view/popup.js';
import FooterStatisticView from './view/footer.js';
import NoTaskView from './view/no-film.js';
import { generateFilmCards } from './mock/card-for-film.js';
import { generateComments } from './mock/movie-comment.js';
import { render, RenderPosition } from './util.js';
import { CARDS_MIN_COUNT, FILMS_COUNT, FILM_COUNT_PER_STEP, FILTERS } from './const.js';

const films = new Array(FILMS_COUNT).fill().map(generateFilmCards);
const comments = new Array(5).fill().map(generateComments);
const bodyElement = document.querySelector('body');
const siteUserElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');

render(siteUserElement, new UserView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); 
render(siteMainElement, new SortView(FILTERS).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmWrapView().getElement(), RenderPosition.BEFOREEND);

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const popupElement = new FilmPopupView(film, comments[0]).getElement(); // КАК ИЗБАВИТЬСЯ ОТ ИНДЕКСА???
  const filmComponentForPopup = filmComponent.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments');
  
  // ТО ЧТО ЗАКОММЕНТИРОВАНО ЭТО ДЛЯ СЛЕДУЮЩЕГО ЗАДАНИЯ
  // const onEscKeyDown = (evt) => {
  //   if (evt.key === 'Escape' || evt.key === 'Esc') {
  //     evt.preventDefault();
  //     closePopup();
  //     document.removeEventListener('keydown', onEscKeyDown);
  //   }
  // };

  for (let clickElement of filmComponentForPopup) {
    clickElement.addEventListener('click', (evt) =>{
      evt.preventDefault(); 
      siteMainElement.appendChild(popupElement);
      // document.addEventListener('keydown', onEscKeyDown);
      bodyElement.classList.add('hide-overflow');
    });
  };
  // const closePopup = () => {
    const popupCloseElement = popupElement.querySelector('.film-details__close-btn');
    popupCloseElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      siteMainElement.removeChild(popupElement);
      // document.removeEventListener('keydown', onEscKeyDown);
      bodyElement.classList.remove('hide-overflow'); 
    });
  // };
  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const filmCardContainer = document.querySelector('.films-list__all');
const filmCardContainerTop = document.querySelector('.films-list__top');
const filmCardContainerMost = document.querySelector('.films-list__most');
const containerForButtonShowMore = document.querySelector('.films-list');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderFilm(filmCardContainer, films[i]);
};

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;
  const loadMoreButtonComponent = new LoadMoreButtonView().getElement();
  render(containerForButtonShowMore, loadMoreButtonComponent, RenderPosition.BEFOREEND);
  loadMoreButtonComponent.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderFilm(filmCardContainer, film));
    renderedFilmsCount += FILM_COUNT_PER_STEP;
    if (renderedFilmsCount >= films.length) {
      loadMoreButtonComponent.remove();
    };
  });
};

for (let i = 0; i < CARDS_MIN_COUNT; i++) {
  renderFilm(filmCardContainerTop, films[i]);
  renderFilm(filmCardContainerMost, films[i]);
};
render(siteFooterElement, new FooterStatisticView().getElement(), RenderPosition.BEFOREEND);
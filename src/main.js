import SiteMenuView from './view/menu.js';
import SortView from './view/sort.js';
import UserView from './view/user.js';
import FilmWrapView from './view/film-wrap.js';
import FilmCardView  from './view/film-card.js';
import LoadMoreButtonView from './view/button-show-more.js';
import FilmPopupView from './view/popup.js';
import FooterStatisticView from './view/footer.js';
import { generateFilmCards } from './mock/card-for-film.js';
import { render, RenderPosition, createClosePopup } from './util.js';
import { CARDS_MIN_COUNT, FILMS_COUNT, FILM_COUNT_PER_STEP, FILTERS } from './const.js';

const films = new Array(FILMS_COUNT).fill().map(generateFilmCards);
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
  const filmWrapComponent = new FilmWrapView(film);
  render(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const filmCardContainer = document.querySelector('.films-list__all');
const filmCardContainerTop = document.querySelector('.films-list__top');
const filmCardContainerMost = document.querySelector('.films-list__most');

// const filmView = new FilmCardView();

//const renderFilms = (container, film, RenderPosition) => {
  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    
    // const filmComponentForPopup = filmView.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments');
    // for (let clickElement of filmComponentForPopup) {
    //   clickElement.addEventListener('click', () =>{
    //     render(siteMainElement, new FilmPopupView(films[i]).getElement(), RenderPosition.BEFOREEND);
    //   })
    // };
    renderFilm(filmCardContainer, films[i]);
  };
//};

// const popupElement = new FilmPopupView(films[0]).getElement();
// const popupCloseElement = popupElement.querySelector('.film-details__close-btn');
// popupCloseElement.addEventListener('click', () => {
//   console.log('sdfds');
// })
//createClosePopup(bodyElement, popupElement, popupCloseElement);

for (let i = 0; i < CARDS_MIN_COUNT; i++) {
  render(filmCardContainerTop, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
  render(filmCardContainerMost, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;
  const loadMoreButtonComponent = new LoadMoreButtonView();
  render(siteMainElement, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = document.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmCardContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));  // вызваем функцию
    renderedFilmsCount += FILM_COUNT_PER_STEP;
    if (renderedFilmsCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

// renderElement(siteMainElement, new FilmPopupView(films[0]).getElement(), RenderPosition.BEFOREEND);   // done
render(siteFooterElement, new FooterStatisticView().getElement(), RenderPosition.BEFOREEND);   // done
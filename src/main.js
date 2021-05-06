import SiteMenuView from './view/menu.js';
import SortView from './view/sort.js';
import UserView from './view/user.js';
import FilmWrapView from './view/film-wrap.js';
import FilmCardView  from './view/film-card.js';
import LoadMoreButtonView from './view/button-show-more.js';
import FilmPopupView from './view/popup.js';
import FooterStatisticView from './view/footer.js';
import { generateFilmCards } from './mock/card-for-film.js';
import { renderTemplate, renderElement, RenderPosition, createClosePopup } from './util.js';
import { CARDS_MIN_COUNT, FILMS_COUNT, FILM_COUNT_PER_STEP, FILTERS } from './const.js';

const films = new Array(FILMS_COUNT).fill().map(generateFilmCards);
const bodyElement = document.querySelector('body');
const siteUserElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');

renderElement(siteUserElement, new UserView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND); 
renderElement(siteMainElement, new SortView(FILTERS).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmWrapView().getElement(), RenderPosition.BEFOREEND);

const filmCardContainer = document.querySelector('.films-list__all');
const filmCardContainerTop = document.querySelector('.films-list__top');
const filmCardContainerMost = document.querySelector('.films-list__most');

//const renderFilms = (filmView, RenderPosition) => {
  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    const filmView = new FilmCardView(films[i]);
    const filmComponentForPopup = filmView.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments');
    for (let clickElement of filmComponentForPopup) {
      clickElement.addEventListener('click', () =>{
        renderElement(siteMainElement, new FilmPopupView(films[i]).getElement(), RenderPosition.BEFOREEND);
      })
    };
    renderElement(filmCardContainer, filmView.getElement(), RenderPosition.BEFOREEND);
  };
//};

const popupElement = new FilmPopupView(films[0]).getElement();
const popupCloseElement = popupElement.querySelector('.film-details__close-btn');
//createClosePopup(bodyElement, popupElement, popupCloseElement);

for (let i = 0; i < CARDS_MIN_COUNT; i++) {
  renderElement(filmCardContainerTop, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
  renderElement(filmCardContainerMost, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;
  const loadMoreButtonComponent = new LoadMoreButtonView();
  renderElement(siteMainElement, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = document.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderElement(filmCardContainer, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));  // вызваем функцию
    renderedFilmsCount += FILM_COUNT_PER_STEP;
    if (renderedFilmsCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
// const popupElement = new FilmPopupView(films[0]).getElement();
// renderElement(siteMainElement, new FilmPopupView(films[0]).getElement(), RenderPosition.BEFOREEND);   // done
renderElement(siteFooterElement, new FooterStatisticView().getElement(), RenderPosition.BEFOREEND);   // done
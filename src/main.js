import { createSiteMenuTemplate } from './view/menu.js';
import { createUser } from './view/user.js';
import { filmListWrap, createFilmCard } from './view/film-card.js';
import { createShowMoreButton } from './view/button-show-more.js';
import { createPopUp } from './view/popup.js';
import { createFooterStatistic } from './view/footer.js';
import { generateFilmCards } from './mock/card-for-film.js';
import { generateMoviePopup } from './mock/movie-popup.js';

const CARDS_MAX_COUNT = 5;
const CARDS_MIN_COUNT = 2;
const FILMS_COUNT = 15;
const FILM_COUNT_PER_STEP = 5;

const films = new Array(FILMS_COUNT).fill().map(generateFilmCards);

const popups = new Array(FILMS_COUNT).fill().map(generateMoviePopup);
//console.log(films);
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const siteUserElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');
render(siteUserElement, createUser(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, filmListWrap(), 'beforeend');
const filmCardContainers = document.querySelectorAll('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmCardContainers[0], createFilmCard(films[i]), 'beforeend');
}
for (let i = 0; i < CARDS_MIN_COUNT; i++) {
  render(filmCardContainers[1], createFilmCard(films[i]), 'beforeend');
  render(filmCardContainers[2], createFilmCard(films[i]), 'beforeend');
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;
  render(siteMainElement, createShowMoreButton(), 'beforeend');
  const loadMoreButton = document.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmCardContainers[0], createFilmCard(film), 'beforeend'));
    renderedFilmsCount += FILM_COUNT_PER_STEP;
    if (renderedFilmsCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}


render(siteMainElement, createPopUp(popups[1]), 'beforeend');
render(siteFooterElement, createFooterStatistic(), 'beforeend');
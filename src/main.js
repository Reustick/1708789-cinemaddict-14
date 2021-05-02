import SiteMenuView from './view/menu.js';
import UserView from './view/user.js';
import FilmWrapView from './view/film-wrap.js';
import FilmCardView  from './view/film-card.js';
import LoadMoreButtonView from './view/button-show-more.js';
import FilmPopupView from './view/popup.js';
import FooterStatisticView from './view/footer.js';
import { generateFilmCards } from './mock/card-for-film.js';
import { renderTemplate, renderElement, RenderPosition } from './util.js';

const CARDS_MIN_COUNT = 2;
const FILMS_COUNT = 15;
const FILM_COUNT_PER_STEP = 5;
const FILTERS = [
  {
    title:'Sort by default',
    compare: (a,b)=>{
      if(a.title < b.title) return 1;
        return -1;
    }
  },
  {
    title:'Sort by date',
    compare: (a, b) => {
        if(a.releaseDate < b.releaseDate) return 1;
        return -1;
    }
  },
  {
    title:'Sort by rating',
    compare: (a,b)=>{
      if(a.rating < b.rating) return 1;
        return -1;
    }
  },
];

const films = new Array(FILMS_COUNT).fill().map(generateFilmCards);
const siteUserElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer__statistics');

renderElement(siteUserElement, new UserView().getElement(), RenderPosition.BEFOREEND);    // done
renderElement(siteMainElement, new SiteMenuView(FILTERS).getElement(), RenderPosition.BEFOREEND);    // done
renderElement(siteMainElement, new FilmWrapView().getElement(), RenderPosition.BEFOREEND);    // done

const filmCardContainers = document.querySelectorAll('.films-list__container');

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderElement(filmCardContainers[0], new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);  // done
}

for (let i = 0; i < CARDS_MIN_COUNT; i++) {
  renderElement(filmCardContainers[1], new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);   // done
  renderElement(filmCardContainers[2], new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);   // done
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;
  const loadMoreButtonComponent = new LoadMoreButtonView();
  renderElement(siteMainElement, loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);  // done

  const loadMoreButton = document.querySelector('.films-list__show-more');
  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderElement(filmCardContainers[0], new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));  // done
    renderedFilmsCount += FILM_COUNT_PER_STEP;
    if (renderedFilmsCount >= films.length) {
      loadMoreButtonComponent.getElement().remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}
// const filmComponent = document.querySelectorAll('.film-card');






renderElement(siteMainElement, new FilmPopupView(films[0]).getElement(), RenderPosition.BEFOREEND);   // done
renderElement(siteFooterElement, new FooterStatisticView().getElement(), RenderPosition.BEFOREEND);   // done
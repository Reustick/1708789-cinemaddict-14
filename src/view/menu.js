import {createElement} from '../util.js';
const createSiteMenuTemplate = (filters) => {
  return `
  <nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">0</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">0</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">0</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
  <ul class="sort">${
    filters.map((filter,idx)=>{
      return `<li><a href="#" class="sort__button ${idx == 0 ? 'sort__button--active' : ''}">${filter.title}</a></li>`; // не выводит
    }).join('')
  }
  
  </ul>
  </section>`;
};

export default class SiteMenu {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }
  getTemplate() {
    return createSiteMenuTemplate(this._filters);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}

{/* <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button">Sort by date</a></li>
  <li><a href="#" class="sort__button">Sort by rating</a></li> */}
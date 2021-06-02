import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const createMainNavigationItemTemplate = (filter, inicialFilterType) => {
  const {type, name, count} = filter;

  return (
    `<a href="#${name}" class="main-navigation__item ${type === inicialFilterType ? 'main-navigation__item--active' : ''}"
    data-type ="${type}">
    ${type === FilterType.ALL_MOVIES
      ? FilterType.ALL_MOVIES
      : `${name} <span class="main-navigation__item-count">${count} </span>`}
  </a>`
  );
};

const createMainNavigationTemplate = (items, inicialFilterType) => {
  const filterItemsTemplate = items
    .map((filter) => createMainNavigationItemTemplate(filter, inicialFilterType))
    .join('');

  const statisticClassName = inicialFilterType === FilterType.STATISTICS
    ? 'main-navigation__additional--active'
    : '';

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional ${statisticClassName}" data-type ="STATISTICS">Stats</a>
    </nav>`
  );
};

export default class MainNavigation extends AbstractView {
  constructor(filters, inicialFilterType) {
    super();
    this._filters = filters;
    this._inicialFilterType = inicialFilterType;

    this._itemsClickHandler = this._itemsClickHandler.bind(this);
  }

  getTemplate() {
    return createMainNavigationTemplate(this._filters, this._inicialFilterType);
  }

  setFilterTypeClickHandler(callback) {
    this._callback.clickFilterType = callback;
    this.getElement().addEventListener('click', this._itemsClickHandler);
  }

  _itemsClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'A') {
      return;
    }
    this._callback.clickFilterType(evt.target.dataset.type);
  }
}

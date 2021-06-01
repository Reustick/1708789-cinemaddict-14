import AbstractView from './abstract.js';
import { SortType } from '../const.js';
const createSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
    </ul>`
  );
};
export default class Sort extends AbstractView {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  setSortTypeClickHandler(callback) {
    this._callback.clickSortType = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

  _removeButtonActive() {
    this.getElement().querySelector('.sort__button.sort__button--active').classList.remove('sort__button--active');
  }

  _sortTypeChangeHandler(evt) {
    const theTarget = evt.target;
    if (theTarget.tagName !== 'A') {
      return;
    }

    evt.preventDefault();

    if (!theTarget.classList.contains('sort__button--active')) {
      this._removeButtonActive();
      theTarget.classList.add('sort__button--active');
    }

    this._callback.clickSortType(theTarget.dataset.sortType);
  }

}

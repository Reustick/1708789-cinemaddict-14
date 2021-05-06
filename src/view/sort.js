import AbstractView from './abstract.js';
const createSortTemplate = (filters) => {
  return `<ul class="sort">${
    filters.map((filter,idx)=>{
      return `<li><a href="#" class="sort__button ${idx == 0 ? 'sort__button--active' : ''}">${filter.title}</a></li>`; 
    }).join('')
  }
  </ul>`;
};
export default class Sort extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  };
  getTemplate() {
    return createSortTemplate(this._filters);
  };
};
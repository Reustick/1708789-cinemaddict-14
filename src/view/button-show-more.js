import AbstractView from './abstract.js';
const createShowMoreButton = () => {
  return `
<button class="films-list__show-more">Show more</button>` ;
};

export default class LoadMoreButton extends AbstractView {
  constructor() {
    super();
  }
  getTemplate() {
    return createShowMoreButton();
  }
}
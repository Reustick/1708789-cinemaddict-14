import AbstractView from './abstract.js';

const createStatisticsTemplate = (filmCount) => {
  return `<p>${filmCount} movies inside</p>`;
};

export default class Statistics extends AbstractView {
  constructor(filmCount) {
    super();
    this._filmCount = filmCount;
  }

  getTemplate() {
    return createStatisticsTemplate(this._filmCount);
  }
}

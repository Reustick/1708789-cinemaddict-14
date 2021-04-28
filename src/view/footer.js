import { getRandomInteger, createElement } from "../util.js";
const createFooterStatistic = () => {
  return `
  <p>${getRandomInteger(1000,200000)} movies inside</p>`;
};
export default class FooterStatistic {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFooterStatistic();
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
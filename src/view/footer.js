import AbstractView from './abstract.js';
import { getRandomInteger } from "../util.js";
const createFooterStatistic = () => {
  return `
  <p>${getRandomInteger(1000,200000)} movies inside</p>`;
};
export default class FooterStatistic extends AbstractView {
  getTemplate() {
    return createFooterStatistic();
  }
}
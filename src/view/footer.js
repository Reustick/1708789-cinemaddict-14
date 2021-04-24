import { getRandomInteger } from "../util.js";
export const createFooterStatistic = () => {
  return `
  <p>${getRandomInteger(1000,200000)} movies inside</p>`;
};
import { SHAKE_TIMEOUT } from '../const.js';

export const truncateText = (text, maxLength) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength - 1)}…`
    : text;

export const getСapitalLetter = (word) => (
  `${word[0].toUpperCase()}${word.slice(1)}`
);

export const shake = (element) => {
  element.classList.add('shake');
  setTimeout(() => element.classList.remove('shake'), SHAKE_TIMEOUT);
};

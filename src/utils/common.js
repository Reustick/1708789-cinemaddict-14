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
export const makeWord = () => {
  let someText = '';
  const someLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 10; i++)
    someText += someLetter.charAt(Math.floor(Math.random() * someLetter.length));

  return someText;
};

import { getRandomInteger } from '../util.js';
import { generateMovieDescription, resultHour, resultMinute, resultDay, resultYear, resultMonth } from './card-for-film.js';
// функция генерации комментария
export const generateComments = () => {
  return {
    text: generateMovieDescription(),
    emoji: generateEmoticons(),
    author: generateAuthor(),
    dateComment:`${resultYear}/${resultMonth}/${resultDay} ${resultHour}:${resultMinute}`
  }
};
export const quantityComments = () =>{
  return new Array(getRandomInteger(0,5)).fill().map(generateComments);
};
// функция генерации смайлика
const generateEmoticons = () => {
  const emoticons = [
    './images/emoji/angry.png',
    './images/emoji/puke.png',
    './images/emoji/sleeping.png',
    './images/emoji/smile.png',
  ];
  const randomIndexEmoticons = getRandomInteger(0, emoticons.length - 1);
  return emoticons[randomIndexEmoticons]; 
};
// функция генерации автора комментария
const generateAuthor = () => {
  const author = [
    'Sasha',
    'Pasha',
    'Masha',
    'Ksusha',
    'Petya',
    'Vasya'
  ];
  const randomIndexAuthor = getRandomInteger(0, author.length - 1);
  return author[randomIndexAuthor]; 
};
import { getRandomInteger } from '../util.js';
import { generateMovieDescription, resultHour, resultMinute, resultDay, resultYear, resultMonth } from './card-for-film.js';
// функция генерации комментария
const generateComments = () => {
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
  const emoticons = {
    angryFace: '&#x1F620',
    pukeFace: '&#129326',
    sleepingFace: '&#x1F634',
    smileFace: '&#x1F600',
  };
  const arrayEmoticons = Array.from(emoticons);
  const randomIndexEmoticons = getRandomInteger(0, arrayEmoticons.length - 1);
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
import { getRandomInteger, getRandomInRange } from "./util.js";
// функция генерации названий фильма
export const generateMovieTitle = () => {
  const movieTitle = [
    'The Wolf of Wall Street',
    'Focus',
    'Suicide Squad',
    'Terminal',
    'Once Upon a Time In Hollywood',
    'Bombshell',
    'Mary Queen of Scots'
  ];
  const randomIndexTitle = getRandomInteger(0, movieTitle.length - 1);
  return movieTitle[randomIndexTitle]; 
};
// функция генерации постера фильма
export const generateMoviePoster = () => {
  const moviePosters = [
    'public\images\posters\made-for-each-other.png',
    'public\images\posters\popeye-meets-sinbad.png',
    'public\images\posters\sagebrush-trail.jpg',
    'public\images\posters\santa-claus-conquers-the-martians.jpg',
    'public\images\posters\the-dance-of-life.jpg',
    'public\images\posters\the-great-flamarion.jpg',
    'public\images\posters\the-man-with-the-golden-arm.jpg'
  ];
  let pics = [];
  for(let i = 0; i < moviePosters.length; i++) {
    let pic = new Image();
    pic.src = moviePosters[i];
    pics[i] = pic;
  };
  const randomIndexPoster = getRandomInteger(0, moviePosters.length - 1);
  return pics[randomIndexPoster];

};
// фнкция генерации описания фильма
export const generateMovieDescription = () => {
  const descriptionsMovie = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.'
  ];
  const randomIndexDescription = getRandomInteger(1, 5);
  return descriptionsMovie[randomIndexDescription];
};
// генерация рандомного времени
const randomHour = getRandomInteger(0, 23);
const hour = new Date().getHours();
export const resultHour = getRandomInteger(hour - randomHour, hour);

const randomMinute = getRandomInteger(0, 59);
const minute = new Date().getMinutes();
export const resultMinute = getRandomInteger(minute - randomMinute, minute);

const randomYear = getRandomInteger(2000,2021);
const year = new Date().getFullYear();
const resultYear = getRandomInteger(year - randomYear, year);

const randomMonth = getRandomInteger(0,11);
const month = new Date().getMonth();
const resultMonth = getRandomInteger(month - randomMonth, month);

const randomDay = getRandomInteger(1,31);
const day = new Date().getDay();
const resultDay = getRandomInteger(day - randomday, day);
// функция генерации жанра 
const generateMovieGenre = () => {
  const movieGenre = [
    'Tragicomedy',
    'Comedy',
    'Action',
    'Neo-noir',
    'Drama',
    'Autobiography',
    'Thriller'
  ];
  const randomIndexGenre = getRandomInteger(0, movieGenre.length - 1);
  return movieGenre[randomIndexGenre]; 
};
// функция генерации карточки фильма
const generateFilmCards = () => {
  return {
    poster: generateMoviePoster(),
    title: generateMovieTitle(),
    rating: getRandomInRange(1,10,1),
    productionYear: getRandomInteger(2000,2021),
    duration:`${resultHour}h ${resultMinute}m`,
    genre: generateMovieGenre(),
    description: generateMovieDescription(),
    numberOfComments: quantityComments()
  };
};
// функция генерации комментария
const generateComments = () => {
  return {
    text: generateMovieDescription(),
    emoji: generateEmoticons(),
    author: generateAuthor(),
    dateComment:`${resultYear}/${resultMonth}/${resultDay} ${resultHour}:${resultMinute}`
  }
};
const quantityComments = () =>{
  for (let i = 0; i <= getRandomInteger(1,10); i++) {
    return generateComments();
  };
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
import { getRandomInteger, getRandomInRange } from '../util.js';
import { quantityComments } from './movie-comment.js';
// функция генерации названий фильма
export const generateMovieTitle = () => {
  const movieTitle = [
    'The Wolf of Wall Street',
    'Focus',
    'Suicide Squad',
    'Terminal',
    'Once Upon a Time In Hollywood',
    'Bombshell',
    'Mary Queen of Scots',
  ];
  const randomIndexTitle = getRandomInteger(0, movieTitle.length - 1);
  return movieTitle[randomIndexTitle];
};
// функция генерации постера фильма
export const generateMoviePoster = () => {
  const moviePosters = [
    'https://upload.wikimedia.org/wikipedia/ru/thumb/7/72/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%92%D0%BE%D0%BB%D0%BA_%D1%81_%D0%A3%D0%BE%D0%BB%D0%BB-%D1%81%D1%82%D1%80%D0%B8%D1%82%C2%BB.jpg/211px-%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%92%D0%BE%D0%BB%D0%BA_%D1%81_%D0%A3%D0%BE%D0%BB%D0%BB-%D1%81%D1%82%D1%80%D0%B8%D1%82%C2%BB.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/3/3a/Focus_poster.jpg/205px-Focus_poster.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/2/2f/Mary_Queen_of_Scots.jpg/203px-Mary_Queen_of_Scots.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/4/4d/Suicide_Squad.jpeg/199px-Suicide_Squad.jpeg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f1/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%9A%D0%BE%D0%BD%D1%87%D0%B5%D0%BD%D0%B0%D1%8F%C2%BB.jpg/211px-%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%D0%B0_%C2%AB%D0%9A%D0%BE%D0%BD%D1%87%D0%B5%D0%BD%D0%B0%D1%8F%C2%BB.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/e/ef/Once_Upon_a_Time_in_Hollywood_cover.png/250px-Once_Upon_a_Time_in_Hollywood_cover.png',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f3/Bombshell_poster.jpg/220px-Bombshell_poster.jpg',
  ];
  const randomIndexPoster = getRandomInteger(0, moviePosters.length - 1);
  return moviePosters[randomIndexPoster];
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
    'In rutrum ac purus sit amet tempus.',
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
export const resultYear = getRandomInteger(year - randomYear, year);

const randomMonth = getRandomInteger(0,11);
const month = new Date().getMonth();
export const resultMonth = getRandomInteger(month - randomMonth, month);

const randomDay = getRandomInteger(1,31);
const day = new Date().getDay();
export const resultDay = getRandomInteger(day - randomDay, day);
// функция генерации жанра
export const generateMovieGenre = () => {
  const movieGenre = [
    'Tragicomedy',
    'Comedy',
    'Action',
    'Neo-noir',
    'Drama',
    'Autobiography',
    'Thriller',
  ];
  const randomIndexGenre = getRandomInteger(0, movieGenre.length - 1);
  return movieGenre[randomIndexGenre];
};
// функция генерации рандомного времени
const getRandomDate = () => {
  const gap = getRandomInteger(0, 365*10);
  const date = new Date();
  date.setDate(date.getDate() - gap);
  return date;
};
// функция генерации карточки фильма_________________________________
export const generateFilmCards = () => {
  return {
    poster: generateMoviePoster(),
    title: generateMovieTitle(),
    originalTitle: generateMovieDescription(),
    rating: getRandomInRange(1,9,1),
    director: generateDirector(),
    screenwriters: writersAndactors,
    cast: writersAndactors,
    releaseDate: getRandomDate(),
    duration: getRandomDate(),  // `${resultHour}h ${resultMinute}m`
    country: generateCountry(),
    genre: generateMovieGenre(),
    description: generateMovieDescription(),
    ageRating: generateAgeRating(),
    comments: quantityComments(),
  };
};
// функция генерации карточки фильма_________________________________

// функция генерации возрастного рейтинга
const generateAgeRating = () => {
  const movieAgeRating = [
    '0+',
    '6+',
    '12+',
    '16+',
    '18+',
  ];
  const randomIndexAgeRating = getRandomInteger(0, movieAgeRating.length - 1);
  return movieAgeRating[randomIndexAgeRating];
};
// функция генерации страны
const generateCountry = () => {
  const countrys = [
    'Russia',
    'USA',
    'New Zealand',
    'Australia',
    'Canada',
    'United Kingdom',
  ];
  const randomIndexCountry = getRandomInteger(0, countrys.length - 1);
  return countrys[randomIndexCountry];
};
// функция генерации режисера
const generateDirector = () => {
  const directors = [
    'Glenn Ficarra',
    'John Requa',
    'Quentin Jerome Tarantino',
    'Vaughn Stein',
    'Josie Rourke',
    'David Ayer',
  ];
  const randomIndexDirector = getRandomInteger(0, directors.length - 1);
  return directors[randomIndexDirector];
};
// функция генерации сценаристов
const generateScreenwriters = () => {
  const screenwriters = [
    'Glenn Ficarra',
    'John Requa',
    'Quentin Jerome Tarantino',
    'Vaughn Stein',
    'Josie Rourke',
    'David Ayer',
  ];
  const randomIndexScreenwriters = getRandomInteger(0, screenwriters.length - 1);
  return screenwriters[randomIndexScreenwriters];
};
const writersAndactors = new Array(getRandomInteger(1,7)).fill().map(generateScreenwriters);

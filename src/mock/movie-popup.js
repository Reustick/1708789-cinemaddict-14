import { getRandomInteger, getRandomInRange } from "../util.js";
import { resultHour, resultMinute, resultDay, resultYear, generateMoviePoster, generateMovieTitle, generateMovieDescription, generateMovieGenre } from "./card-for-film.js";
// функция генерации попапа
export const generateMoviePopup = () => {
  return {
    fullSizeCover: generateMoviePoster(),
    title: generateMovieTitle(),
    originalTitle: generateMovieDescription(),
    rating: getRandomInRange(1,10,1),
    director: generateDirector(),
    screenwriters: writersAndactors,
    cast: writersAndactors,
    releaseDate: `${resultDay} ${generateMonth()} ${resultYear}`,
    duration: `${resultHour}h ${resultMinute}m`,
    country: generateCountry(),
    genre: generateMovieGenre(),
    description: generateMovieDescription(),
    ageRating: generateAgeRating(),
  };
};
// функция генерации возрастного рейтинга
const generateAgeRating = () => {
  const movieAgeRating = [
    '0+',
    '6+',
    '12+',
    '16+',
    '18+'
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
    'United Kingdom'
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
    'David Ayer'
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
    'David Ayer'
  ];
  const randomIndexScreenwriters = getRandomInteger(0, screenwriters.length - 1);
  return screenwriters[randomIndexScreenwriters]; 
};
const randomArr = getRandomInteger(1,7);
const writersAndactors = new Array(randomArr).fill().map(generateScreenwriters);
// функция генерации месяцев
const generateMonth = () => {
  const months = ["January","February","March",
    "April","May","June",
    "July","August","September",
    "October","November","December"];
  const randomIndexMonth = getRandomInteger(0, months.length - 1);
  return months[randomIndexMonth]; 
};
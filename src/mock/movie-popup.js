import { getRandomInteger, getRandomInRange } from "./util.js";
import { resultHour, resultMinute, generateMoviePoster, generateMovieTitle, generateMovieDescription } from "./card-film.js";
// функция генерации попапа
const generateMoviePopup = () => {
  return {
    fullSizeCover: generateMoviePoster(),
    title: generateMovieTitle(),
    originalTitle: generateMovieDescription(),
    rating: getRandomInRange(1,10,1),
    director: generateDirector(),
    screenwriters:
    cast:
    releaseDate:
    duration: `${resultHour}h ${resultMinute}m`,
    country: generateCountry(),
    genre: generateMovieGenre(),
    description: generateMovieDescription(),
    ageRating: generateAgeRating();
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
import { getTimeFromMins, formatReleaseDate }  from '../../utils/format-date.js';

const createGenreSpan = (genres) => {
  return `<span class="film-details__genre">${genres}</span>`;
};

const createDetailsRowTemplate = (term, cell) => (
  `<tr class="film-details__row">
    <td class="film-details__term">${term}</td>
    <td class="film-details__cell">${cell}</td>
    </tr>`
);

export const createTableTemplate = (film) => {
  const {
    poster,
    title,
    totalRating,
    ageRating,
    director,
    writers,
    actors,
    date,
    runtime,
    country,
    genres,
    description,
  } = film;

  const genreTitle = genres.length > 1 ? 'Genres': 'Genre';
  const genreList = genres.map((genres) => createGenreSpan(genres)).join('');

  return (
    `<div class="film-details__info-wrap">
      <div class="film-details__poster">
        <img class="film-details__poster-img" src="${poster}" alt="">
        <p class="film-details__age">${ageRating}</p>
      </div>
      <div class="film-details__info">
        <div class="film-details__info-head">
          <div class="film-details__title-wrap">
            <h3 class="film-details__title">${title}</h3>
            <p class="film-details__title-original">Original: ${title}</p>
          </div>
          <div class="film-details__rating">
            <p class="film-details__total-rating">${totalRating}</p>
          </div>
        </div>
        <table class="film-details__table">
          ${createDetailsRowTemplate('Director', director)}
          ${createDetailsRowTemplate('Writers', writers.join(', '))}
          ${createDetailsRowTemplate('Actors', actors.join(', '))}
          ${createDetailsRowTemplate('Release Date', formatReleaseDate(date))}
          ${createDetailsRowTemplate('Runtime', getTimeFromMins(runtime))}
          ${createDetailsRowTemplate('Country', country)}
          ${createDetailsRowTemplate(genreTitle, genreList)}
        </table>
        <p class="film-details__film-description">${description}</p>
      </div>
    </div>`
  );
};

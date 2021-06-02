import Observer from '../utils/observer.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  set(updateType, items) {
    this._items = items.slice();
    this._notify(updateType);
  }

  get() {
    return this._items;
  }

  update(updateType, film) {
    const index = this._items.findIndex((item) => item.id === film.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._items = [
      ...this._items.slice(0, index),
      film,
      ...this._items.slice(index + 1),
    ];

    this._notify(updateType, film);
  }

  isEmpty() {
    return this._items.length === 0;
  }

  static adaptToClient(film) {
    const info = film.film_info;
    const release = info.release;
    const details = film.user_details;

    return {
      id: film.id,
      comments: film.comments,
      title: info.title,
      alternativeTitle: info.alternative_title,
      poster: info.poster,
      description: info.description,
      totalRating: info.total_rating,
      ageRating: info.age_rating,
      director: info.director,
      writers: info.writers,
      actors: info.actors,
      date: info.release.date !== null
        ? new Date(release.date)
        : release.date,
      country: release.release_country,
      runtime: info.runtime,
      genres: info.genre,
      isWatchlist: details.watchlist,
      isWatched: details.already_watched,
      isFavorite: details.favorite,
      watchingDate: details.watching_date !== null
        ? new Date(details.watching_date)
        : details.watching_date,
    };
  }

  static adaptToServer(film) {
    return {
      'id': film.id,
      'comments': film.comments,
      'film_info': {
        'title': film.title,
        'alternative_title': film.alternativeTitle,
        'poster': film.poster,
        'description': film.description,
        'total_rating': film.totalRating,
        'age_rating': film.ageRating,
        'director': film.director,
        'writers': film.writers,
        'actors': film.actors,
        'release': {
          'date': film.date instanceof Date ? film.date.toISOString() : null,
          'release_country': film.country,
        },
        'runtime': film.runtime,
        'genre': film.genres,
      },
      'user_details': {
        'watchlist': film.isWatchlist,
        'already_watched': film.isWatched,
        'favorite': film.isFavorite,
        'watching_date': film.watchingDate instanceof Date ? film.watchingDate.toISOString() : null,
      },
    };
  }
}

import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();

    this._map = new Map();
  }

  set(updateType, filmId, comments) {
    this._map.set(filmId, comments);
    this._notify(updateType);
  }

  get(filmId) {
    return this._map.get(filmId) || [];
  }

  has(filmId) {
    return this._map.has(filmId);
  }

  delete(updateType, filmId, commentId) {
    const comments = this._map.get(filmId);

    const index = comments.findIndex(({ id }) => id === commentId);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    const updatedComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1),
    ];

    this._map.set(filmId, updatedComments);

    this._notify(updateType, {
      filmId,
      comments: updatedComments,
    });
  }

  static adaptToClient(comments) {
    return comments.map(({
      date,
      comment: text,
      emotion: emoji,
      ...props
    }) => Object.assign({},
      props,
      {
        date: date === null ? null : new Date(date),
        text,
        emoji,
      },
    ));
  }

  static adaptToServer(comment) {
    return {
      comment: comment.text,
      emotion: comment.emoji,
    };
  }
}

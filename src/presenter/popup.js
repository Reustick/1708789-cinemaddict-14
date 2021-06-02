import PopupView from '../view/popup.js';
import { render, remove } from '../utils/render.js';
import {UserAction, UpdateType, PopupState} from '../const.js';
import { shake } from '../utils/common.js';

const KeyboardKey = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
  ENTER: 'Enter',
};

const ESCAPE_KEYS = [
  KeyboardKey.ESCAPE,
  KeyboardKey.ESC,
];

const isEscEvent = (evt) => ESCAPE_KEYS.includes(evt.key);
const isControlEnterEvent = (evt) => evt.key === KeyboardKey.ENTER && (evt.ctrlKey || evt.metaKey);

export default class Popup {
  constructor(container, changeData, commentsModel, api) {
    this._container = container;
    this._changeData = changeData;
    this._commentsModel = commentsModel;
    this._api = api;

    this._film = null;
    this._view = null;

    this._keydownHandler = this._keydownHandler.bind(this);

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);

    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._render();
  }

  _render() {
    if (this._view !== null) {
      this._update();
      return;
    }

    this._view = new PopupView(this._film);
    this._loadComments();

    render(document.body, this._view);

    this._setViewEventListeners();

    document.addEventListener('keydown', this._keydownHandler);
    document.body.classList.add('hide-overflow');
  }

  _update() {
    if (this._commentsModel.has(this._film.id)) {
      const comments = this._commentsModel.get(this._film.id);
      this._view.reset(this._film, comments);
    } else {
      this._view.reset(this._film);
      this._loadComments();
    }
  }

  _loadComments() {
    const film = this._film;

    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.set(UpdateType.PATCH, film.id, comments);

        if (this.isOpen(film)) {
          this._view.reset(film, comments);
        }
      })
      .catch(() => {
        this._view.shake();
      });
  }

  isOpen(film) {
    return this._view !== null && this._film.id === film.id;
  }

  resetInput() {
    this._view.resetInput();
  }

  shake() {
    shake(this._view.getElement());
  }

  shakeInputForm() {
    this._view.shakeInputForm();
  }

  setDisabledStatus() {
    this._view.setState(PopupState.DISABLED);
  }

  setDefaultStatus() {
    this._view.setState(PopupState.DEFAULT);
  }

  _setViewEventListeners() {
    const view = this._view;

    view.setWatchlistClickHandler(this._handleWatchlistClick);
    view.setFavoriteClickHandler(this._handleFavoriteClick);
    view.setWatchedClickHandler(this._handleWatchedClick);
    view.setCloseButtonClickHandler(this._handleCloseButtonClick);
    view.setDeleteCommentClickHandler(this._handleDeleteCommentClick);
  }

  _close() {
    remove(this._view);
    this._view = null;
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._keydownHandler);
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_WATCHLIST,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isWatchlist: !this._film.isWatchlist,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FAVORITE,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_WATCHED,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handleDeleteCommentClick(commentId) {
    this._view.setState(PopupState.DELETE, commentId);
    this._api.deleteComment(commentId)
      .then(() => {
        this._commentsModel.delete(UpdateType.PATCH, this._film.id, commentId);

        const comments = this._film.comments.slice();
        comments.splice(comments.indexOf(commentId), 1);

        this._changeData(
          UserAction.DELETE_COMMENT,
          UpdateType.PATCH,
          Object.assign(
            {},
            this._film,
            {
              comments,
            },
          ),
        );
      })
      .catch(() => {
        this._view.setState(PopupState.ABORTING);
        this._view.shakeButtonDelete(commentId);
      });
  }

  _handleCloseButtonClick() {
    this._close();
  }

  _keydownHandler(evt) {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      this._close();
      return;
    }

    if (isControlEnterEvent(evt)) {
      evt.preventDefault();
      const comment = this._view.getInput();

      this._changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        {
          filmId: this._film.id,
          comment,
        },
      );
    }
  }
}

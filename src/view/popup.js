import { createButtonCloseTemplate, createTableTemplate, createControlsTemplate, createCommentListTemplate } from './popup/index.js';
import SmartView from './smart.js';
import { PopupState } from '../const.js';
import { shake } from '../utils/common.js';

const createPopupTemplate = (state) => {
  const {
    film,
    currentComments: comments,
    currentEmoji: emoji,
    currentText: text,
    isDeleting,
    isDisabled,
    deleteId,
  } = state;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          ${createButtonCloseTemplate()}
          ${createTableTemplate(film)}
          ${createControlsTemplate(film)}
        </div>
        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
            ${createCommentListTemplate(comments, { emoji, text, isDeleting, isDisabled, deleteId })}
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class Popup extends SmartView {
  constructor(film) {
    super();

    this._state = Popup.parseFilmToState(film);

    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._popupCloseButtonClickHandler = this._popupCloseButtonClickHandler.bind(this);
    this._commentsListClickHandler = this._commentsListClickHandler.bind(this);
    this._emojiListChangeHandler = this._emojiListChangeHandler.bind(this);
    this._commentInputInputHandler = this._commentInputInputHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._state);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  reset(film, comments = []) {
    this.updateData({
      film,
      currentComments: comments,
    }, false);
  }

  resetInput() {
    this.updateData({
      currentEmoji: '',
      currentText: '',
    }, false);
  }

  getInput() {
    const { currentText: text, currentEmoji: emoji } = this._state;
    return {
      text,
      emoji,
    };
  }

  shakeInputForm() {
    const newCommentForm = this.getElement().querySelector('.film-details__comment-input');
    shake(newCommentForm);
  }

  shakeButtonDelete(id) {
    const deleteButton = this.getElement()
      .querySelector(`.film-details__comment-delete[data-id="${id}"]`)
      .closest('.film-details__comment');
    shake(deleteButton);
  }

  setState(state, deleteId) {
    switch (state) {
      case PopupState.DISABLED:
        this.updateData(
          {
            isDisabled: true,
          },
        );
        break;
      case PopupState.DELETE:
        this.updateData(
          {
            isDeleting: true,
            deleteId,
          },
        );
        break;
      case PopupState.DEFAULT:
        this.updateData(
          {
            isDisabled: false,
            isDeleting: false,
          },
        );
        break;
      case PopupState.ABORTING:
        this.updateData(
          {
            isDisabled: false,
            isDeleting: false,
          },
        );
        break;
    }
  }

  setWatchlistClickHandler(callback) {
    this._callback.clickWatchlist = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.clickFavorite = callback;
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.clickWatched = callback;
    this.getElement().querySelector('.film-details__control-label--watched').addEventListener('click', this._watchedClickHandler);
  }

  setCloseButtonClickHandler(callback) {
    this._callback.clickCloseButton = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._popupCloseButtonClickHandler);
  }

  setDeleteCommentClickHandler(callback) {
    this._callback.clickDeleteComment = callback;
    this.getElement().querySelector('.film-details__comments-list').addEventListener('click', this._commentsListClickHandler);
  }

  _setInnerHandlers() {
    const node = this.getElement();
    node.querySelector('.film-details__emoji-list').addEventListener('change', this._emojiListChangeHandler);
    node.querySelector('.film-details__comment-input').addEventListener('input', this._commentInputInputHandler);
    node.querySelector('.film-details__control-label--watchlist').addEventListener('click', this._watchlistClickHandler);
    node.querySelector('.film-details__control-label--favorite').addEventListener('click', this._favoriteClickHandler);
    node.querySelector('.film-details__control-label--watched').addEventListener('click', this._watchedClickHandler);
    node.querySelector('.film-details__close-btn').addEventListener('click', this._popupCloseButtonClickHandler);
    node.querySelector('.film-details__comments-list').addEventListener('click', this._commentsListClickHandler);
  }

  _watchlistClickHandler() {
    this._callback.clickWatchlist();
  }

  _favoriteClickHandler() {
    this._callback.clickFavorite();
  }

  _watchedClickHandler() {
    this._callback.clickWatched();
  }

  _popupCloseButtonClickHandler() {
    this._callback.clickCloseButton();
  }

  _emojiListChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      currentEmoji: evt.target.value,
    }, false);
  }

  _commentInputInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      currentText: evt.target.value,
    }, true);
  }

  _commentsListClickHandler(evt) {
    if (!evt.target.classList.contains('film-details__comment-delete')) {
      return;
    }

    evt.preventDefault();
    this._callback.clickDeleteComment(evt.target.dataset.id);
  }

  static parseFilmToState(film) {
    return {
      film: Object.assign({}, film),
      currentComments: [],
      currentText: '',
      currentEmoji: '',
      isDisabled: false,
      isDeleting: false,
      deleteId: '',
    };
  }
}

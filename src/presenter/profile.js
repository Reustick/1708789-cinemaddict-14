import ProfileView from '../view/profile.js';
import {remove, render, replace}  from '../utils/render.js';
import {getRankTitle, countWatchedFilms} from '../utils/statistic.js';

export default class Profile {
  constructor(container, filmsModel) {
    this._container = container;
    this._model = filmsModel;

    this._view = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._model.subscribe(this._handleModelEvent);
  }

  init() {
    this._render();
  }

  _getFilms() {
    return this._model.get();
  }

  getStatus() {
    return getRankTitle(countWatchedFilms(this._getFilms()));
  }

  _render() {
    const prevView = this._view;
    this._view = new ProfileView(this.getStatus());

    if (this._model.isEmpty()) {
      return;
    }

    if (prevView === null) {
      render(this._container, this._view);

      return;
    }

    replace(this._view, prevView);
    remove(prevView);
  }

  _handleModelEvent() {
    this.init();
  }
}

import StatsView from '../view/stats.js';
import { render, replace, remove } from '../utils/render.js';
import { TimeRange } from '../const.js';
import { getRankTitle, countWatchedFilms } from '../utils/statistic.js';

export default class Stats {
  constructor(container, filmsModel, profilePresenter) {
    this._container = container;
    this._model = filmsModel;
    this._profile = profilePresenter;
    this._range = TimeRange.ALL_TIME;

    this._view = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._render();
  }

  show() {
    this._view.show();
  }

  hide() {
    this._view.hide();
  }

  _handleModelEvent() {
    this.init();
  }

  _getFilms() {
    return this._model.get();
  }

  _getStatus() {
    return getRankTitle(countWatchedFilms(this._getFilms()));
  }

  _render() {
    const prevView = this._view;
    this._view = new StatsView(this._getFilms(), this._profile.getStatus());

    if (prevView === null) {
      render(this._container, this._view);

      return;
    }
    replace(this._view, prevView);
    remove(prevView);
  }
}

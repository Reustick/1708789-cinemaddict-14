import Observer from '../utils/observer.js';
import { FilterType } from '../const.js';

export default class Filter extends Observer {
  constructor() {
    super();
    this._active = FilterType.ALL_MOVIES;
  }

  set(updateType, filter) {
    this._active = filter;
    this._notify(updateType, filter);
  }

  getType() {
    return this._active;
  }
}

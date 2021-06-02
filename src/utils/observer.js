export default class Observer {
  constructor() {
    this._listeners = [];
  }

  subscribe(listener) {
    this._listeners.push(listener);
  }

  unsubscribe(listener) {
    this._listeners = this._listeners.filter((existedListener) => existedListener !== listener);
  }

  _notify(action, payload) {
    this._listeners.forEach((listener) => listener(action, payload));
  }
}

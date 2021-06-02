import AbstractView from './abstract.js';

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._state = {};
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: restoreHandlers');
  }

  updateElement() {
    const prevItem = this.getElement();
    const parent = prevItem.parentElement;
    const position = prevItem.scrollTop;
    this.removeElement();

    const newItem = this.getElement();

    parent.replaceChild(newItem, prevItem);

    newItem.scrollTo(0, position);

    this.restoreHandlers();
  }

  updateData(update, justDataUpdating = false) {
    if (!update) {
      return;
    }

    this._state = Object.assign(
      {},
      this._state,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }
}

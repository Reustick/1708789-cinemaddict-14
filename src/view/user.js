import {createElement} from '../util.js';
const createUser = () => {
  return `
  <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>` ;
};
export default class User {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return createUser();
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
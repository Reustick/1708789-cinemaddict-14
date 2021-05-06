import AbstractView from './abstract.js';
const filmListWrap = () => {
  return `<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container films-list__all">
    </div>
  </section>
  <section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
    <div class="films-list__container films-list__top"></div>
  </section>
  <section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container films-list__most"></div>
  </section>
  </section>`;
};
export default class FilmWrap extends AbstractView {
  constructor() {
    super();
  }
  getTemplate() {
    return filmListWrap();
  }
}
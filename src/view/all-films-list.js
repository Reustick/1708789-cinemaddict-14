import AbstractView from './abstract.js';

const createAllFilmsListTemplate = () => {
  return (
    '<div class="films-list__container"></div>'
  );
};

export default class AllFilmsList extends AbstractView {
  getTemplate() {
    return createAllFilmsListTemplate();
  }
}

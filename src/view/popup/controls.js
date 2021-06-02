const createControlTemplate = (name, title, isChecked = false) => (
  `<input
    class="film-details__control-input visually-hidden"
    id="${name}"
    name="${name}"
    type="checkbox"
    ${isChecked ? 'checked' : ''}
   >
   <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${title}</label>`
);

const createControlsTemplate = (film) => {
  const {
    isWatchlist,
    isWatched,
    isFavorite,
  } = film;

  return (
    `<section class="film-details__controls">
      ${createControlTemplate('watchlist', 'Add to watchlist', isWatchlist)}
      ${createControlTemplate('watched', 'Already watched', isWatched)}
      ${createControlTemplate('favorite', 'Add to favorites', isFavorite)}
    </section>`
  );
};

export { createControlsTemplate };

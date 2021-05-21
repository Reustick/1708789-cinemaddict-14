const CARDS_MIN_COUNT = 2;
const FILMS_COUNT = 15;
const FILM_COUNT_PER_STEP = 5;
const FILTERS = [
  {
    title:'Sort by default',
    compare: (a,b)=>{
      if(a.title < b.title) return 1;
      return -1;
    },
  },
  {
    title:'Sort by date',
    compare: (a, b) => {
      if(a.releaseDate < b.releaseDate) return 1;
      return -1;
    },
  },
  {
    title:'Sort by rating',
    compare: (a,b)=>{
      if(a.rating < b.rating) return 1;
      return -1;
    },
  },
];

export {
  CARDS_MIN_COUNT,
  FILMS_COUNT,
  FILM_COUNT_PER_STEP,
  FILTERS
};

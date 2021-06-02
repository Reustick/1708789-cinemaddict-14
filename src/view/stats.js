import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import { TimeRange } from '../const.js';
import { filterWatchedFilmsInRange, countWatchedFilms } from '../utils/statistic.js';

const BAR_HEIGHT = 50;
const BG_COLOR = '#ffe800';
const HOVER_BG_COLOR = '#ffe800';
const FONT_SIZE = 20;
const FONT_COLOR = '#ffffff';
const OFFSET = 40;
const TICKS_PADDING = 100;
const BAR_THICKNESS = 24;
const MINUTES_IN_HOUR = 60;

const reduceGenres = (genres, genre) => {
  const count = genres[genre];
  genres[genre] = count === undefined ? 1 : count + 1;
  return genres;
};

const getWatchedStats = (films) => films
  .reduce((stats, film) => {
    if (film.isWatched) {
      stats.watched += 1;
      stats.runtime += film.runtime;
      stats.genres = film.genres.reduce(reduceGenres, stats.genres);
    }

    return stats;
  }, { runtime: 0, watched: 0, genres: {} });

const getSortedFilmByGenreCounts = (stats) => {
  return Object.entries(stats).map(([ key, value ]) => ({ key, count: value })).sort((a, b) => b.count - a.count);
};

const renderChart = (statisticCtx, stats) => {
  const genresWatchedFilms = stats.genres;
  const sortedFilms = getSortedFilmByGenreCounts(genresWatchedFilms);
  const genres = sortedFilms.map((film) => film.key);
  const counts = sortedFilms.map((film) => film.count);

  statisticCtx.height = BAR_HEIGHT * genres.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genres,
      datasets: [{
        data: counts,
        backgroundColor: BG_COLOR,
        hoverBackgroundColor: HOVER_BG_COLOR,
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: FONT_SIZE,
          },
          color: FONT_COLOR,
          anchor: 'start',
          align: 'start',
          offset: OFFSET,
          barThickness: BAR_THICKNESS,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: FONT_COLOR,
            padding: TICKS_PADDING,
            fontSize: FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = (rankName, stats, {range}, filmsCount) => {
  const totalWatchedTimeInMin = stats.runtime;
  const hours = Math.floor(totalWatchedTimeInMin / MINUTES_IN_HOUR );
  const minutes = Math.floor(totalWatchedTimeInMin) - (hours * MINUTES_IN_HOUR);
  const getTopGenre = (stats) => {
    if (Object.keys(stats.genres).length !== 0) {
      return Object.keys(stats.genres)[0];
    }
    return '';
  };

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rankName}</span>
      </p>
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="${TimeRange.ALL_TIME}"${range === TimeRange.ALL_TIME ? ' checked' : ''}>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="${TimeRange.DAY}"${range === TimeRange.DAY ? ' checked' : ''}>
        <label for="statistic-today" class="statistic__filters-label">Today</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="${TimeRange.WEEK}"${range === TimeRange.WEEK ? ' checked' : ''}>
        <label for="statistic-week" class="statistic__filters-label">Week</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="${TimeRange.MONTH}"${range === TimeRange.MONTH ? ' checked' : ''}>
        <label for="statistic-month" class="statistic__filters-label">Month</label>
        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="${TimeRange.YEAR}"${range === TimeRange.YEAR ? ' checked' : ''}>
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>
      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${countWatchedFilms(filmsCount)} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${getTopGenre(stats)}</p>
        </li>
      </ul>
      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    </section>`
  );
};

export default class Stats extends SmartView {
  constructor(states, rankName) {
    super();
    this._chart = null;
    this._state = {
      films: states,
      range: TimeRange.ALL_TIME,
    };
    this._rankName = rankName;

    this._setCharts();

    this._statisticFiltersChangeHandler = this._statisticFiltersChangeHandler.bind(this);

    this._setStatisticFilterChangeHandler();
  }

  getTemplate() {
    return createStatsTemplate(this._rankName, this._getWatchedStats(), this._state, this._getWatchedFilms());
  }

  restoreHandlers() {
    this._setCharts();
    this._setStatisticFilterChangeHandler();
  }

  _getWatchedFilms() {
    return filterWatchedFilmsInRange(this._state);
  }

  _getWatchedStats() {
    return getWatchedStats(this._getWatchedFilms());
  }

  _setCharts() {
    if (this._chart !== null) {
      this._chart = null;
    }

    const statisticCtx = this.getElement().querySelector('.statistic__chart');
    this._chart = renderChart(statisticCtx, this._getWatchedStats());
  }

  _setStatisticFilterChangeHandler() {
    this.getElement()
      .querySelector('.statistic__filters')
      .addEventListener('change', this._statisticFiltersChangeHandler);
  }

  _statisticFiltersChangeHandler(evt) {
    evt.preventDefault();

    const range = evt.target.value;
    this.updateData({
      range: range,
    });
  }
}

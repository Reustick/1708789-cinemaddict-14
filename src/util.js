export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
export const getRandomInRange = (min, max,simbolsAfterComma) => {
  return min>=0 && max>=0 && min<max ? ((Math.random() * (max - min + 1) + min).toFixed(simbolsAfterComma)) : alert('Диапазон чисел не может быть отрицательным');
};
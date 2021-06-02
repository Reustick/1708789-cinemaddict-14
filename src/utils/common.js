export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
export const getRandomInRange = (min, max,simbolsAfterComma) => {
  return min>=0 && max>=0 && min<max ? ((Math.random() * (max - min + 1) + min).toFixed(simbolsAfterComma)) : alert('Диапазон чисел не может быть отрицательным');
};
export const formatDate = (date) => {
  const months = ['January','February','March',
    'April','May','June',
    'July','August','September',
    'October','November','December'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const truncateText = (text, maxLength) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength - 1)}…`
    : text;


export const getСapitalLetter = (word) => (
  `${word[0].toUpperCase()}${word.slice(1)}`
);

export const getNewArray = (array, randomNumber) => {
  const someArray = [];
  for (let i = 0; i <= randomNumber; i++) {
    someArray.push(array[i]);
  }
  const newArray = new Set(someArray);
  return Array.from(newArray);
};

export const getShuffledArray = (arr) => {
  const newArr = arr.slice();
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
};
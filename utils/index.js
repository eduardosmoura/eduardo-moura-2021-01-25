export const formatNumberWithComma = (number) => {
  const parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (parts[1]) {
    parts[1] = parts[1].slice(0, 2);
  }

  return parts.join('.');
};

export const pluralize = (number, word) =>
  `${number} ${word}${number > 1 || number === 0 ? 's' : ''}`;

export const timeSince = (date) => {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return pluralize(Math.floor(interval), 'year');
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return pluralize(Math.floor(interval), 'month');
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return pluralize(Math.floor(interval), 'day');
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return pluralize(Math.floor(interval), 'hour');
  }

  interval = seconds / 60;
  if (interval > 1) {
    return pluralize(Math.floor(interval), 'minute');
  }

  return pluralize(Math.floor(seconds), 'second');
};

export const debounce = (func, wait, immediate) => {
  let timeout;

  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

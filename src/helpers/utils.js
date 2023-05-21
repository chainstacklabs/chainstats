const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const keyGenerator = () => Math.random().toString(36).slice(2, 7);

const gbToTb = (value) => {
  if (value > 1000) {
    return value / 1000 + ' TB';
  } else {
    return value + ' GB';
  }
};

export { capitalizeFirstLetter, keyGenerator, gbToTb };

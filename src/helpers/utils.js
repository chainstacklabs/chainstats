const gbToTb = (value) => {
  if (value > 1000) {
    return value / 1000 + ' TB';
  } else {
    return value + ' GB';
  }
};

export { gbToTb };

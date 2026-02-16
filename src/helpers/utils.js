const gbToTb = (value) => {
  if (value >= 1000) {
    return (value / 1000).toFixed(2) + ' TB';
  } else {
    return value + ' GB';
  }
};

export { gbToTb };

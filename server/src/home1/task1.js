const { validateTask1: validate } = require("./validator");

module.exports = (str) => {
  const digitsMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  validate(str, digitsMap);

  return [...str].reduce((res, item, idx, arr) => {
    if (idx === arr.length - 1 || digitsMap[item] >= digitsMap[str[idx + 1]]) {
      return res + digitsMap[item];
    }
    return res - digitsMap[item];
  }, 0);
};

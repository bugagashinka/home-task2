const { validateTask3: validate } = require("./validator");

module.exports = (str) => {
  const syms = { "{": "}", "(": ")", "[": "]" };
  const levels = [];
  let leaf = [];

  validate(str, syms);

  return (
    str.length >= 1 &&
    str.length % 2 === 0 &&
    [...str].every((item) => {
      if (item in syms) {
        leaf = [item];
        levels.push(leaf);
        return true;
      } else if (syms[leaf[0]] === item) {
        leaf = levels[--levels.length - 1];
        return true;
      }
      return false;
    })
  );
};

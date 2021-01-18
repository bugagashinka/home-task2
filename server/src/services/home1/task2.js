const { validateTask2: validate } = require("./validator");

module.exports = (input) => {
  validate(input);
  return input.toString() === [...input.toString()].reverse().join("");
};

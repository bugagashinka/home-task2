const { validateTask5: validate } = require("./validator");

module.exports = (nums, target) => {
  validate(nums, target);

  const res = nums.findIndex((num) => num - target >= 0);
  return res >= 0 ? res : nums.length;
};

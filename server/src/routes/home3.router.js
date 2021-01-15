const router = require("express").Router();
const { task1, task2, task3, task4, task5 } = require("services/home1");

// Algorithms Controllers

const romanController = ({ body }, res) => {
  const { input } = body;
  res.send({ result: task1(input) });
};

const palindromeController = ({ body }, res) => {
  const { input } = body;
  res.send({ result: task2(input) });
};

const brackets = ({ body }, res) => {
  const { input } = body;
  res.send({ result: task3(input) });
};
const arraySort = ({ body }, res) => {
  const { arr1, arr2 } = body;
  res.send({ result: task4(arr1, arr2) });
};
const nextIndex = ({ body }, res) => {
  const { nums, target } = body;
  res.send({ result: task5(nums, target) });
};

// Algorithms Routes

router.route("/roman").post(romanController);

router.route("/palindrome").post(palindromeController);

router.route("/brackets").post(brackets);

router.route("/arraySort").post(arraySort);

router.route("/nextIndex").post(nextIndex);

module.exports = router;

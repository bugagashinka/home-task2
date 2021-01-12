const router = require("express").Router();
const { task1, task2, task3, task4, task5 } = require("../home1");

router.route("/roman").post(({ body }, res) => {
  const { input } = body;
  res.status(200).send({ result: task1(input) });
});

router.route("/palindrome").post(({ body }, res) => {
  const { input } = body;
  res.status(200).send({ result: task2(input) });
});

router.route("/brackets").post(({ body }, res) => {
  const { input } = body;
  res.status(200).send({ result: task3(input) });
});

router.route("/arraySort").post(({ body }, res) => {
  const { arr1, arr2 } = body;
  res.status(200).send({ result: task4(arr1, arr2) });
});

router.route("/nextIndex").post(({ body }, res) => {
  const { nums, target } = body;
  res.status(200).send({ result: task5(nums, target) });
});

module.exports = router;

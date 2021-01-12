const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const scoresJsonPath = path.join(__dirname, "../", "scores.json");
const scoreList = require(scoresJsonPath);

const SCORE_LIST_SIZE = 10;

const sortScores = ({ score: s1 }, { score: s2 }) => s2 - s1;

const getScores = () => {
  return scoreList.sort(sortScores).slice(0, SCORE_LIST_SIZE);
};

router
  .route("/")
  .get((req, res) => {
    res.status(200).json(getScores());
  })
  .post((req, res) => {
    const body = req.body;
    if (!body.name) throw TypeError("'name' is missing");
    if (!body.score) throw TypeError("'score' is missing");

    scoreList.push({ ...body, key: new Date().getTime() });

    fs.writeFile(scoresJsonPath, JSON.stringify(scoreList), function (error) {
      if (error) throw error;
    });

    res.status(200).json(getScores());
  });

module.exports = router;

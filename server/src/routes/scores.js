const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const scoresJsonPath = path.join(__dirname, "../", "scores.json");
const scoreList = require(scoresJsonPath);
const { updateUserScore } = require("../services/usersService");

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
    const { name, score } = req.body;
    if (!name) throw TypeError("'name' is missing");
    if (!score) throw TypeError("'score' is missing");

    scoreList.push({ ...req.body, key: new Date().getTime() });

    fs.writeFile(scoresJsonPath, JSON.stringify(scoreList), function (error) {
      if (error) throw error;
    });

    const bestScore = updateUserScore(name, score);

    req.app.locals.activeUser = { name, bestScore };
    res.redirect("/");
  });

module.exports = router;

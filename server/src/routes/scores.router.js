const express = require("express");
const router = express.Router();
const { updateUserScore, getScores } = require("../services/usersService");
const {
  session,
  database: { sort },
  gameConfig,
} = require("utils/consts");

// Scores Controllers

const getScoresController = async (req, res) => {
  res.status(200).json(await getScores(gameConfig.SCORE_LIST_SIZE, sort.DESC_ORDER));
};

const postScoresController = async (req, res, next) => {
  const { name, score } = req.body;
  if (!name) throw TypeError("'name' is missing");
  if (!score) throw TypeError("'score' is missing");

  updateUserScore(req.cookies[session.AUTH_COOKIE], score)
    .then((bestScore) => {
      req.app.locals.activeUser = { name, bestScore };
    })
    .catch((err) => {})
    .finally(() => res.redirect("/"));
};

// Scores Routes

router.route("/").get(getScoresController).post(postScoresController);

module.exports = router;

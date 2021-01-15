const express = require("express");
const scoresRouter = require("./scores.router");
const router = express.Router();
const { invalidateAuth } = require("utils");
const { AUTH_COOKIE } = require("utils/consts");

const securePaths = [/\//, /\/scores\/?/i];

const validateAccess = (req, res, next) => {
  if (!securePaths.some((mask) => req.path.match(mask))) return next();

  if (req.cookies[AUTH_COOKIE] === "true" || req.app.locals.isAuth) {
    req.app.locals.isAuth = true;
    return next();
  }

  invalidateAuth(req, res);
  res.redirect("/session/login");
};

// Game Controllers

const getGameController = (req, res) => {
  const { name = "", bestScore = "" } = req.app.locals.activeUser ?? {};
  res.render("index", { name, bestScore, title: "Kill blocks game" });
};

// Game Routes

router.use(validateAccess);

router.use("/scores", scoresRouter);

router.route("/").get(getGameController);

module.exports = router;

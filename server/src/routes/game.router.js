const express = require("express");
const scoresRouter = require("./scores.router");
const router = express.Router();
const { invalidateAuth } = require("utils");
const { session, gameConfig } = require("utils/consts");
const { getUserBy } = require("services/usersService");

const validateAccess = async (req, res, next) => {
  if (!gameConfig.PROTECTED_PATHS.some((mask) => req.path.match(mask))) return next();

  const checkedUser = await getUserBy("_id", req.cookies[session.AUTH_COOKIE]);
  if (checkedUser || req.app.locals.isAuth) {
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

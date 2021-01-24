const express = require("express");
const scoresRouter = require("./scores.router");
const adminRouter = require("./admin.router");
const router = express.Router();
const { invalidateAuth } = require("utils");
const { session, gameConfig, roles } = require("utils/consts");
const { getUserBy } = require("services/usersService");

const validateAccess = async (req, res, next) => {
  const protectedPaths = [...gameConfig.PROTECTED_PATHS, ...gameConfig.ADMIN_PATHS];
  const matchedPath = protectedPaths.find((mask) => req.path.match(mask));
  if (!matchedPath) return next();

  const checkedUser = await getUserBy("_id", req.cookies[session.AUTH_COOKIE]);
  if (checkedUser || req.app.locals.isAuth) {
    req.app.locals.isAuth = true;

    if (gameConfig.ADMIN_PATHS.includes(matchedPath) && checkedUser.role !== roles.ADMIN_ROLE) {
      return res.redirect("/");
    }
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

router.use("/admin", adminRouter);

router.route("/").get(getGameController);

module.exports = router;

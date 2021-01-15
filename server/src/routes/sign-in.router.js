const express = require("express");
const router = express.Router();
const { invalidateAuth } = require("utils");
const { getUser } = require("../services/usersService");
const { AUTH_COOKIE, MAX_AGE_MS_COOKIE } = require("utils/consts");

// Sign-In, Logout Controllers

const getLoginController = (req, res) => {
  if (req.app.locals.isAuth) {
    res.redirect("/");
    return;
  }
  res.render("login", { title: "Sign-In" });
};

const postLoginController = (req, res) => {
  const { login, password } = req.body;
  const existedUser = getUser(login);

  if (existedUser && password === existedUser.password) {
    res.cookie(AUTH_COOKIE, "true", { maxAge: MAX_AGE_MS_COOKIE });
    req.app.locals.activeUser = { name: login, bestScore: existedUser.bestScore };
    return res.redirect("/");
  }
  res.render("login", { message: "Invalid credentials", title: "Sign-In" });
};

const logoutController = (req, res) => {
  invalidateAuth(req, res);
  res.redirect("login");
};

// Sign-In, Logout Routes

router.route("/login").get(getLoginController).post(postLoginController);
router.route("/logout").get(logoutController);

module.exports = router;

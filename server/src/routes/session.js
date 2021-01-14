const express = require("express");
const router = express.Router();
const { AUTH_COOKIE, MAX_AGE_SEC_COOKIE } = require("../consts");
const { invalidateAuth } = require("../utils");
const { getUser } = require("../services/usersService");

const loginGetHandler = (req, res) => {
  if (req.app.locals.isAuth) {
    res.redirect("/");
    return;
  }
  res.render("login", { title: "Sign-In" });
};

const loginPostHandler = (req, res) => {
  const { login, password } = req.body;
  const existedUser = getUser(login);

  if (existedUser && password === existedUser.password) {
    res.cookie(AUTH_COOKIE, "true", { maxAge: MAX_AGE_SEC_COOKIE });
    req.app.locals.activeUser = { name: login, bestScore: existedUser.bestScore };
    return res.redirect("/");
  }
  res.render("login", { message: "Invalid credentials", title: "Sign-In" });
};

router.route("/login").get(loginGetHandler).post(loginPostHandler);

router.route("/logout").get((req, res) => {
  invalidateAuth(req, res);
  res.redirect("login");
});

module.exports = router;

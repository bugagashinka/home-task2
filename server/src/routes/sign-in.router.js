const express = require("express");
const router = express.Router();
const { invalidateAuth } = require("utils");
const { getUserBy } = require("../services/usersService");
const {
  session,
  clientAlertTypes: { DANGER_ALERT },
} = require("utils/consts");
const { encryptPassword } = require("utils");

// Sign-In, Logout Controllers

const getLoginController = (req, res) => {
  if (req.app.locals.isAuth) {
    res.redirect("/");
    return;
  }
  res.render("login", { title: "Sign-In" });
};

const postLoginController = async (req, res) => {
  const { login, password } = req.body;

  try {
    const existedUser = await getUserBy("login", login);

    if (existedUser) {
      const [userPassword, salt] = existedUser.password.split(".");
      const [checkedPassword] = encryptPassword(password, salt);

      if (checkedPassword === userPassword) {
        res.cookie(session.AUTH_COOKIE, existedUser._id, { maxAge: session.MAX_AGE_MS_COOKIE });
        req.app.locals.activeUser = { name: login, bestScore: existedUser.bestScore };
        return res.redirect("/");
      }
    }
  } catch (error) {}

  res.status(401).render("login", {
    errors: [{ message: "Authorization error, invalid credentials", type: DANGER_ALERT }],
    title: "Sign-In",
  });
};

const logoutController = (req, res) => {
  invalidateAuth(req, res);
  res.redirect("login");
};

// Sign-In, Logout Routes

router.route("/login").get(getLoginController).post(postLoginController);
router.route("/logout").get(logoutController);

module.exports = router;

const express = require("express");
const router = express.Router();
const { createUser } = require("../services/usersService");

const {
  session,
  accountValidation: { LOGIN_VALID_MASK, NAME_VALID_MASK, PASS_MIN_LENGTH },
  clientAlertTypes: { DANGER_ALERT },
} = require("utils/consts");

const sanitizeFields = (formData) => {
  return Object.entries(formData).reduce((result, [field, value]) => {
    result[field] = value.trim();
    return result;
  }, {});
};

const validateSignUpForm = ({ login, name, password, confirm }) => {
  let errors = [];

  if (!login || !login.match(LOGIN_VALID_MASK)) {
    errors.push({
      message: "Please use only lovercase Latin letters and digits for <strong>Login</strong>",
      type: DANGER_ALERT,
    });
  }

  if (!name || !name.match(NAME_VALID_MASK)) {
    errors.push({
      message: "You can use only Latin, Cyrillic letters, digits and space for <strong>Name</strong>",
      type: DANGER_ALERT,
    });
  }

  if (!password || password.length < PASS_MIN_LENGTH) {
    errors.push({ message: "<strong>Password</strong> must be at least 8 characters", type: DANGER_ALERT });
  }

  if (!confirm || confirm !== password) {
    errors.push({
      message: "<strong>Password</strong> and <strong>Confirm password</strong> do not match",
      type: DANGER_ALERT,
    });
  }
  let isValid = !errors.length;
  return [isValid, isValid ? [login, name, password] : errors];
};

// Sign-Up Controllers

const getSignUpController = (req, res) => {
  if (req.app.locals.isAuth) {
    res.redirect("/");
    return;
  }
  res.render("sign-up", { title: "Sign-Up" });
};

const postSignUpController = async (req, res, next) => {
  let [isValid, result] = validateSignUpForm(sanitizeFields(req.body));

  if (isValid) {
    try {
      const user = await createUser([...result, req.ip]);
      res.cookie(session.AUTH_COOKIE, user._id, { maxAge: session.MAX_AGE_MS_COOKIE });
      req.app.locals.activeUser = { name: user.name, bestScore: 0 };
      return res.redirect("/");
    } catch (err) {
      result = [{ message: err.message, type: "danger" }];
    }
  }

  res.render("sign-up", {
    errors: result,
    login: req.body.login,
    name: req.body.name,
    title: "Sign-Up",
  });
};

// Sign-Up Routes

router.route("/").get(getSignUpController).post(postSignUpController);

module.exports = router;

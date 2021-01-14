const { AUTH_COOKIE } = require("./consts");

const invalidateAuth = (req, res) => {
  res.clearCookie(AUTH_COOKIE);
  req.app.locals.isAuth = false;
  req.app.locals.activeUser = null;
};

const notFoundHandler = (req, res) => {
  res.status(404).send({ error: "Not Found" });
};

const clientErrorHandler = (error, req, res, next) => {
  if (error instanceof TypeError) {
    res.status(422).send({ error: error.message });
    return;
  }
  next(error);
};

const errorHandler = (error, req, res, next) => {
  if (error instanceof Error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  notFoundHandler,
  clientErrorHandler,
  errorHandler,
  invalidateAuth,
};

const { AUTH_COOKIE } = require("./consts");

const invalidateAuth = (req, res) => {
  res.clearCookie(AUTH_COOKIE);
  req.app.locals.isAuth = false;
  req.app.locals.activeUser = null;
};

const notFoundController = (req, res) => {
  res.status(404).send({ error: "Not Found" });
};

const clientErrorController = (error, req, res, next) => {
  if (error instanceof TypeError) {
    res.status(422).send({ error: error.message });
    return;
  }
  next(error);
};

const errorController = (error, req, res, next) => {
  if (error instanceof Error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  notFoundController,
  clientErrorController,
  errorController,
  invalidateAuth,
};

const { session } = require("./consts");
const CryptoJS = require("crypto-js");

const invalidateAuth = (req, res) => {
  res.clearCookie(session.AUTH_COOKIE);
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
  console.error(error);
  res.status(500).send({ error: `Internal Server Error. ${error.customErrorMessage ?? ""}` });
};

const encryptPassword = (password, salt) => {
  const _salt = salt || CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.hex);
  const key256Bits = CryptoJS.PBKDF2(password, _salt, {
    keySize: 256 / 32,
  });
  return [key256Bits.toString(CryptoJS.enc.hex), _salt.toString(CryptoJS.enc.hex)];
};

module.exports = {
  notFoundController,
  clientErrorController,
  errorController,
  invalidateAuth,
  encryptPassword,
};

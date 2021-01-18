const home3Router = require("./home3.router");
const gameRouter = require("./game.router");
const signInRouter = require("./sign-in.router");
const signUpRouter = require("./sign-up.router");
const { notFoundController, clientErrorController, errorController } = require("utils");

module.exports = (app) => {
  app.use("/api/tasks/", home3Router);
  app.use("/session", signInRouter);
  app.use("/signup", signUpRouter);
  app.use("/", gameRouter);
  app.use("*", notFoundController);
  app.use(clientErrorController);
  app.use(errorController);
};

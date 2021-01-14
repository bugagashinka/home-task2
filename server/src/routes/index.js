const home3Router = require("./home3");
const gameRouter = require("./game");
const sessionRouter = require("./session");
const { notFoundHandler, clientErrorHandler, errorHandler } = require("../utils");

module.exports = (app) => {
  app.use("/api/tasks/", home3Router);
  app.use("/session", sessionRouter);
  app.use("/", gameRouter);
  app.use("*", notFoundHandler);
  app.use(clientErrorHandler);
  app.use(errorHandler);
};

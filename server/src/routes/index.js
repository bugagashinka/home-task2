const scoresRouter = require("./scores");
const home3Router = require("./home3");

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
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = (app) => {
  app.use("/scores", scoresRouter);
  app.use("/api/tasks/", home3Router);
  app.use("*", notFoundHandler);
  app.use(clientErrorHandler);
  app.use(errorHandler);
};

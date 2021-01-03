const scores = require("./scores");

module.exports = (app) => {
  app.use("/scores", scores);
  app.use("*", (req, res) => {
    res.status(404).send({ error: "Not Found" });
  });
};

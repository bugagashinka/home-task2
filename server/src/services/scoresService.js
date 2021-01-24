const Score = require("models/score.model");
const { dbRequest } = require("./dbService");

const addScore = async (userId, score) => {
  return await dbRequest(
    async () => {
      const scoreDoc = await Score.create({
        player: userId,
        result: score,
      });
      return await scoreDoc.save();
    },
    {
      general: "Last session score not saved",
    }
  );
};

module.exports = {
  addScore,
};

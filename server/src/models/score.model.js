const mongoose = require("mongoose");

const { Schema } = mongoose;

const ScoreSchema = new Schema({
  playerName: { type: String, required: true },
  result: { type: Number, required: true },
  date: { type: Date, autopopulate: true, default: Date.now },
});

module.exports = mongoose.model("Score", ScoreSchema, "ScoreTable");

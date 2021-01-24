const mongoose = require("mongoose");

const { Schema } = mongoose;

const ScoreSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: "User" },
  result: { type: Number, required: true },
  date: { type: Date, autopopulate: true, default: Date.now },
});

module.exports = mongoose.model("Score", ScoreSchema);

const {
  accountValidation: { LOGIN_VALID_MASK, NAME_VALID_MASK },
} = require("utils/consts");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    login: { type: String, unique: true, required: true, trim: true, match: LOGIN_VALID_MASK },
    name: { type: String, required: true, match: NAME_VALID_MASK },
    password: { type: String, required: true, trim: true, minlength: 8 },
    bestScore: { type: Number, default: 0, index: true, alias: "score" },
    ipAddress: { type: String },
    date: { type: Date, autopopulate: true, default: Date.now },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.score = ret.bestScore;
        ret.id = ret._id;
        delete ret.bestScore;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

/* UserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === DUPLICATE_ERR_CODE) {
    error.type = "dublicate"
    const customError = new Error("Account already exists");
    customError.custom = true;
    next(customError);
  } else {
    next(error);
  }
}); */

module.exports = mongoose.model("User", UserSchema);

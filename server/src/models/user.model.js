const {
  roles: { USER_ROLE },
  accountValidation: { LOGIN_VALID_MASK, NAME_VALID_MASK },
} = require("utils/consts");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const removeField = (name, ret) => {
  delete ret[name];
};

const renameField = (oldName, newName, ret) => {
  ret[newName] = ret[oldName];
  removeField(oldName, ret);
};

const UserSchema = new Schema(
  {
    login: { type: String, unique: true, required: true, trim: true, match: LOGIN_VALID_MASK },
    name: { type: String, index: true, required: true, match: NAME_VALID_MASK },
    password: { type: String, required: true, trim: true, minlength: 8 },
    bestScore: { type: Number, default: 0, index: true, alias: "score" },
    ipAddress: { type: String, index: true },
    role: { type: String, default: USER_ROLE, index: true },
    registered: { type: String, index: true },
    scores: [{ type: Schema.Types.ObjectId, ref: "Score" }],
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        // Rename bestScore field
        renameField("bestScore", "score", ret);

        // Rename _id field
        renameField("_id", "id", ret);

        // Remove __v field
        removeField("__v", ret);

        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        ret.gameCount = ret.scores.length;

        // Rename _id field
        renameField("_id", "id", ret);

        // Remove __v field
        removeField("__v", ret);

        return ret;
      },
    },
  }
);

UserSchema.virtual("getStats").get(function () {
  return this.scores.length + " / " + this.score;
});

UserSchema.query.sortBy = function (names) {
  let fieldsFilter = names.replace("id", "_id");

  return this.sort(fieldsFilter);
};

module.exports = mongoose.model("User", UserSchema);

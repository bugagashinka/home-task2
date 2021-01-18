const User = require("models/user.model");
const { dbRequest } = require("./dbService");
const {
  database: { errors },
} = require("utils/consts");
const { encryptPassword } = require("utils");

const createUser = async ([login, name, password, ip]) => {
  return await dbRequest(
    async () => {
      const user = await User.create({ login, name, password: encryptPassword(password).join("."), ip });
      return await user.save();
    },
    {
      general: "Account not created",
      [errors.DUPLICATE_ERR_CODE]: "Account already exists",
    }
  );
};

const getUserBy = async (field, value) => {
  return await dbRequest(
    async () => {
      return await User.findOne({ [field]: value });
    },
    {
      general: "Account information could not be retrieved",
    }
  );
};

const updateUserScore = async (id, score) => {
  return await dbRequest(
    async () => {
      const user = await User.findById(id);

      if (user.bestScore < score) {
        user.bestScore = score;
        await user.save();
        return score;
      }
      return user.bestScore;
    },
    {
      general: "Last session score not saved",
    }
  );
};

const getScores = async (limit = 10, order = -1) => {
  return await dbRequest(
    async () => {
      return await User.find()
        .where("bestScore")
        .gt(0)
        .select("name bestScore")
        .sort({ bestScore: order })
        .limit(limit)
        .exec();
    },
    {
      general: "Unable to retrieve Score Table",
    }
  );
};

module.exports = {
  createUser,
  getUserBy,
  updateUserScore,
  getScores,
};

const User = require("models/user.model");
const { dbRequest } = require("./dbService");
const { addScore } = require("./scoresService");
const {
  roles,
  database: { errors, sort },
  gameConfig,
} = require("utils/consts");
const { encryptPassword } = require("utils");

const createUser = async ([login, name, password, ip]) => {
  return await dbRequest(
    async () => {
      const user = await User.create({
        login,
        name,
        password: encryptPassword(password).join("."),
        ipAddress: ip,
        registered: new Date().toISOString(),
      });
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

const getUsers = async ({
  skip = 0,
  limit = gameConfig.ROWS_PER_PAGE,
  role = roles.USER_ROLE,
  sortBy,
  searchByColumnName,
  searchQuery,
}) => {
  return await dbRequest(
    async () => {
      const rowCount = await User.countDocuments({ role, [searchByColumnName]: new RegExp(searchQuery, "i") });
      const userList = await User.find({ role, [searchByColumnName]: new RegExp(searchQuery, "i") })
        .select("_id login name ipAddress registered scores bestScore")
        .skip(skip * limit)
        .limit(limit)
        .sortBy(sortBy)
        .exec();

      return [userList, rowCount];
    },
    {
      general: "Account information could not be retrieved",
    }
  );
};

const getUsersTable = async (page, sortByColumnsIdx = [], search = []) => {
  const headers = [
    ["id", "id"],
    ["login", "login"],
    ["name", "name"],
    ["ipAddress", "Reg IP"],
    ["registered", "Reg Date"],
    ["getStats", "Game stats"],
  ];

  // const searchConditions = {}
  const [searchByColumn = 2, searchQuery = "(.*?)"] = search;
  const [searchByColumnName = "login"] = headers[searchByColumn - 1] ?? [];

  // Validate sortByColumns values
  const sorted = {};
  const sortByColumnsName = sortByColumnsIdx.reduce((res, columnIdx) => {
    const [columnName, uiColumnName] = headers[Math.abs(columnIdx) - 1] ?? [];
    if (!columnName) return res;
    const sign = `${columnIdx > 0 ? "" : "-"}`;
    sorted[uiColumnName] = columnIdx / Math.abs(columnIdx);
    res.push(`${sign}${columnName}`);
    return res;
  }, []);

  const [userList, rowCount] = await getUsers({
    skip: page - 1,
    sortBy: sortByColumnsName.join(" "),
    searchByColumnName,
    searchQuery,
  });

  // Convert query result fields to table headers format
  const rows = userList.map((user) => {
    return headers.reduce((acc, [fieldName, headerName]) => {
      acc[headerName] = user[fieldName];
      return acc;
    }, {});
  });
  const headersNames = headers.map(([, headerName]) => headerName);
  const pageCount = Math.ceil(rowCount / gameConfig.ROWS_PER_PAGE);
  return [headersNames, rows, pageCount, sorted];
};

const updateUserScore = async (id, score) => {
  return await dbRequest(
    async () => {
      let user = await User.findById(id);

      const savedScore = await addScore(id, score);
      user.scores.push(savedScore._id);
      if (user.bestScore < score) {
        user.bestScore = score;
      }
      user = await user.save();

      return user.bestScore;
    },
    {
      general: "Last session score not saved",
    }
  );
};

const getScores = async (limit = gameConfig.SCORE_LIST_SIZE, order = sort.DESC_ORDER) => {
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
  getUsers,
  getUsersTable,
};

const {
  database: { errors },
} = require("utils/consts");

const mongoose = require("mongoose");

const uri = process.env.MONGODB_ENV;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.debug("DB connection established");
  })
  .catch((error) => {
    console.error("DB connecting failed:", error.message);
  });

const dbRequest = async (action, actionErrorMessages = { general: "DB operation error" }) => {
  try {
    return await action();
  } catch (error) {
    let errorMessage = actionErrorMessages.general;

    console.error(`${errorMessage},\n ${error}`);

    if (error.code === errors.DUPLICATE_ERR_CODE) {
      errorMessage = actionErrorMessages[errors.DUPLICATE_ERR_CODE];
    }

    throw Error(errorMessage);
  }
};

module.exports = { dbRequest };

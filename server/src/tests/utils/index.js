const got = require("got");

const BASE_URL = "http://localhost";
const BASE_PORT = 9090;

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

const sendPostRequest = async (payload, path = "/", url) => {
  const baseUrl = url || `${BASE_URL}:${BASE_PORT}`;
  const finalUrl = `${baseUrl}${path}`;

  const result = got.post(finalUrl, {
    json: payload,
    responseType: "json",
  });

  try {
    return await result;
  } catch (err) {
    const { body, statusCode } = err.response;
    throw new ApiError(statusCode, body.error);
  }
};

module.exports = {
  sendPostRequest,
};

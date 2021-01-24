const BASE_URL = "http://localhost:9090/";
const SCORES_ENDPOINT = "scores/";
const TABLE_ENDPOINT = "admin/";
const responseFormat = {
  TEXT_FORMAT: "text",
  JSON_FORMAT: "json",
};
const httpMethod = {
  POST_METHOD: "POST",
  GET_METHOD: "GET",
};
const CLIENT_ERROR_MIN_CODE = 400;
const SERVER_ERROR_MAX_CODE = 599;
const INTERNET_DISCONNECTED_ERROR = "No internet connection";

const errorHandler = async (response) => {
  const resError = await response.json();
  let error = new Error(
    `${response.status}: ${resError.error ? resError.error : "Something went wrong, result couln't be provided"}`
  );
  if (response.status >= CLIENT_ERROR_MIN_CODE && response.status <= SERVER_ERROR_MAX_CODE) {
    error.originError = resError;
  }
  return Promise.reject(error);
};

const makeRequest = async ({
  url,
  method = httpMethod.GET_METHOD,
  payload,
  headers,
  format = responseFormat.JSON_FORMAT,
}) => {
  const config = {
    method,
    headers: headers ?? {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: method == httpMethod.POST_METHOD ? JSON.stringify(payload) : null,
  };
  try {
    const res = await fetch(url, config);
    if (res.redirected) {
      window.location.href = res.url;
    }
    // Cases with 4xx/5xx status code
    if (!res.ok) {
      return errorHandler(res);
    }
    if (format === responseFormat.JSON_FORMAT) return res.json();
    if (format === responseFormat.TEXT_FORMAT) return res.text();
  } catch (e) {
    // internet connection case
    console.error(e);
    const disconnectError = new Error();
    disconnectError.status = INTERNET_DISCONNECTED_ERROR;
    throw disconnectError;
  }
};

const makeAsyncRequest = async ({ url }) => {
  window.history.pushState(null, null, url);
  return await makeRequest({
    url,
    format: responseFormat.TEXT_FORMAT,
    headers: {
      "X-Async-Request": "async/html",
    },
  });
};

const addScores = async (data) => {
  const url = `${BASE_URL}${SCORES_ENDPOINT}`;
  return await makeRequest({ url, method: httpMethod.POST_METHOD, payload: data });
};

const getScores = async () => {
  const url = `${BASE_URL}${SCORES_ENDPOINT}`;
  return await makeRequest({ url });
};

const searchBy = async (columnIdx, queryText) => {
  const searchQuery = `?search=${columnIdx}:${queryText}`;
  const url = `${BASE_URL}${TABLE_ENDPOINT}${searchQuery}`;
  return await makeAsyncRequest({ url });
};

const sortBy = async (columnIdx, order) => {
  const searchQuery = `?sort=${columnIdx * order}`;
  const url = `${BASE_URL}${TABLE_ENDPOINT}${searchQuery}`;
  return await makeAsyncRequest({ url });
};

export { addScores, getScores, searchBy, sortBy };

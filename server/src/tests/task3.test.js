const { sendPostRequest, ApiError } = require("./utils");
const { assert, expect } = require("chai");
require("chai").use(require("chai-as-promised"));
const fixtures = require("./fixtures/task3.fixtures");

describe(`Route '${fixtures.route}'`, () => {
  // Positive tests
  describe("Request with valid payload", () => {
    const { route, positive } = fixtures;

    positive.forEach(({ input, expected }) => {
      it(`${input} should be checked and return ${expected}`, async () => {
        const { statusCode, body } = await sendPostRequest({ input }, route);
        assert.equal(statusCode, 200, "Status not equal OK");
        assert.equal(body.result, expected, "is not equal");
      });
    });
  });

  // Negative test
  describe("Request with invalid payload", () => {
    const { route, negative } = fixtures;

    negative.forEach(({ input, expected, status }) => {
      it(`'${input}' value should throw error`, async () => {
        return expect(sendPostRequest({ input }, route))
          .to.be.rejectedWith(ApiError, expected)
          .eventually.with.property("statusCode", status);
      });
    });
  });
});

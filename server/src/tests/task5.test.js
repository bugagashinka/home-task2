const { sendPostRequest, ApiError } = require("./utils");
const { assert, expect } = require("chai");
require("chai").use(require("chai-as-promised"));
const fixtures = require("./fixtures/task5.fixtures");

describe(`Route '${fixtures.route}'`, () => {
  // Positive tests
  describe("Request with valid payload", () => {
    const { route, positive } = fixtures;

    positive.forEach(({ nums, target, expected }) => {
      it(`return the index if the target ${target} is found in ${nums}`, async () => {
        const { statusCode, body } = await sendPostRequest({ nums, target }, route);
        assert.equal(statusCode, 200, "Status not equal OK");
        assert.equal(body.result, expected, "is not equal");
      });
    });
  });

  // Negative test
  describe("Request with invalid payload", () => {
    const { route, negative } = fixtures;

    negative.forEach(({ nums, target, expected, status }) => {
      it(`input values should throw error`, async () => {
        return expect(sendPostRequest({ nums, target }, route))
          .to.be.rejectedWith(ApiError, expected)
          .eventually.with.property("statusCode", status);
      });
    });
  });
});

const { sendPostRequest, ApiError } = require("./utils");
const { assert, expect } = require("chai");
require("chai").use(require("chai-as-promised"));
const fixtures = require("./fixtures/task4.fixtures");

describe(`Route '${fixtures.route}'`, () => {
  // Positive tests
  describe("Request with valid payload", () => {
    const { route, positive } = fixtures;

    positive.forEach(({ arr1, arr2, expected }) => {
      it(`sort ${arr1} are the same as in ${arr2}`, async () => {
        const { statusCode, body } = await sendPostRequest({ arr1, arr2 }, route);
        assert.equal(statusCode, 200, "Status not equal OK");
        assert.deepEqual(body.result, expected, "is not equal");
      });
    });
  });

  // Negative test
  describe("Request with invalid payload", () => {
    const { route, negative } = fixtures;

    negative.forEach(({ arr1, arr2, expected, status }) => {
      it(`input values should throw error`, async () => {
        return expect(sendPostRequest({ arr1, arr2 }, route))
          .to.be.rejectedWith(ApiError, expected)
          .eventually.with.property("statusCode", status);
      });
    });
  });
});

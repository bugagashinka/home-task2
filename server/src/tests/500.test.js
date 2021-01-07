const { sendPostRequest, ApiError } = require("./utils");
const { assert, expect } = require("chai");
require("chai").use(require("chai-as-promised"));

const fixture = {
  route: "/",
  input: JSON.stringify(JSON.stringify({})),
  status: 500,
  expected: "Internal Server Error",
};

describe(`Route '${fixture.route}'`, () => {
  describe("Request with invalid payload", () => {
    const { input, status, expected, route } = fixture;

    it(`Invalid JSON should throw Internal Server Error with 500 status code`, async () => {
      return expect(sendPostRequest(input, route))
        .to.be.rejectedWith(ApiError, expected)
        .eventually.with.property("statusCode", status);
    });
  });
});

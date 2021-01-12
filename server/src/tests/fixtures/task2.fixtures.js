module.exports = {
  route: "/api/tasks/palindrome",
  positive: [
    {
      input: 121,
      expected: true,
    },

    {
      input: -121,
      expected: false,
    },

    {
      input: 10,
      expected: false,
    },

    {
      input: 2,
      expected: true,
    },

    {
      input: -2,
      expected: false,
    },

    {
      input: (-2) ** 31,
      expected: false,
    },

    {
      input: 2 ** 31 - 1,
      expected: false,
    },
  ],
  negative: [
    {
      input: "asdad",
      expected: "Input argument must be number",
      status: 422,
    },

    {
      input: (-2) ** 31 - 1,
      expected: "Input argument must satisfy next constraints -(2 ** 31) <= number <= 2 ** 31 - 1",
      status: 422,
    },

    {
      input: 2 ** 31,
      expected: "Input argument must satisfy next constraints -(2 ** 31) <= number <= 2 ** 31 - 1",
      status: 422,
    },
  ],
};

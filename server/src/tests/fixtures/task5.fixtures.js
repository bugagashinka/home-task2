module.exports = {
  route: "/api/tasks/nextIndex",
  positive: [
    {
      nums: [1, 3, 5, 6],
      target: 5,
      expected: 2,
    },

    {
      nums: [1, 3, 5, 6],
      target: 2,
      expected: 1,
    },

    {
      nums: [1, 3, 5, 6],
      target: 7,
      expected: 4,
    },

    {
      nums: [1, 3, 5, 6],
      target: 0,
      expected: 0,
    },

    {
      nums: [1],
      target: 0,
      expected: 0,
    },
  ],
  negative: [
    {
      nums: 1,
      target: 0,
      expected: "Function arguments should be 'array' and 'number' in the following sequence",
      status: 422,
    },

    {
      nums: [1],
      target: "",
      expected: "Function arguments should be 'array' and 'number' in the following sequence",
      status: 422,
    },
  ],
};

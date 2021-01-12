module.exports = {
  route: "/api/tasks/brackets",
  positive: [
    {
      input: "()",
      expected: true,
    },

    {
      input: "()[]{}",
      expected: true,
    },

    {
      input: "(]",
      expected: false,
    },

    {
      input: "([)]",
      expected: false,
    },

    {
      input: "{[]}",
      expected: true,
    },

    {
      input: "{[]",
      expected: false,
    },

    {
      input: "{",
      expected: false,
    },

    {
      input: "{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",
      expected: true,
    },
  ],
  negative: [
    {
      input: 22,
      expected: "Input argument must be string",
      status: 422,
    },

    {
      input:
        "{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}",
      expected: "Input argument must satisfy next constraints 1 <= input length <= 104",
      status: 422,
    },

    {
      input: "",
      expected: "Input argument must satisfy next constraints 1 <= input length <= 104",
      status: 422,
    },

    {
      input: "[]{<>}",
      expected: "String must consists of next '()[]{}' brackets",
      status: 422,
    },
  ],
};

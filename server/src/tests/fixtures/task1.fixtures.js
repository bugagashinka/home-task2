module.exports = {
  route: "/api/tasks/roman",
  positive: [
    {
      input: "III",
      expected: 3,
    },

    {
      input: "VI",
      expected: 6,
    },

    {
      input: "IV",
      expected: 4,
    },

    {
      input: "IX",
      expected: 9,
    },

    {
      input: "LVIII",
      expected: 58,
    },

    {
      input: "MCMXCIV",
      expected: 1994,
    },

    {
      input: "M",
      expected: 1000,
    },

    {
      input: "MMMCMXCIX",
      expected: 3999,
    },
  ],
  negative: [
    {
      input: 1,
      expected: "Input argument must be string",
      status: 422,
    },

    {
      input: "",
      expected: "Input argument must satisfy next constraints 1 <= input length <= 15",
      status: 422,
    },

    {
      input: "IIIIIIIIIXIIIIIIIIIX",
      expected: "Input argument must satisfy next constraints 1 <= input length <= 15",
      status: 422,
    },

    {
      input: "HI",
      expected: "Only the following 'I', 'V', 'X', 'L', 'C', 'D', 'M' characters are expected",
      status: 422,
    },
  ],
};

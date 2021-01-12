module.exports = {
  route: "/api/tasks/arraySort",
  positive: [
    {
      arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
      arr2: [2, 1, 4, 3, 9, 6],
      expected: [2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19],
    },

    {
      arr1: [0],
      arr2: [0],
      expected: [0],
    },

    {
      arr1: [1000],
      arr2: [1000],
      expected: [1000],
    },

    {
      arr1: [0, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      arr2: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    },
  ],
  negative: [
    {
      arr1: 1,
      arr2: [1],
      expected: "Each input argument must be array",
      status: 422,
    },

    {
      arr1: [1],
      arr2: "",
      expected: "Each input argument must be array",
      status: 422,
    },

    {
      arr1: [-1],
      arr2: [-1],
      expected: "0 <= arr1[i], arr2[i] <= 1000",
      status: 422,
    },

    {
      arr1: [-1, 2],
      arr2: [2],
      expected: "0 <= arr1[i], arr2[i] <= 1000",
      status: 422,
    },

    {
      arr1: [1001],
      arr2: [1001],
      expected: "0 <= arr1[i], arr2[i] <= 1000",
      status: 422,
    },

    {
      arr1: [1, 2, 3],
      arr2: [1, 2, 1],
      expected: "All the elements of arr2 must be distinct",
      status: 422,
    },

    {
      arr1: [1, 2, 3],
      arr2: [1, 2, 4],
      expected: "Each arr2[i] must be in arr1",
      status: 422,
    },

    {
      arr1: [],
      arr2: [1, 2, 4],
      expected: "1 <= arr1.length, arr2.length <= 1000",
      status: 422,
    },

    {
      arr1: [1, 2, 3],
      arr2: [],
      expected: "1 <= arr1.length, arr2.length <= 1000",
      status: 422,
    },

    {
      arr1: [1, 2, 3],
      arr2: Array(1001).fill(1),
      expected: "1 <= arr1.length, arr2.length <= 1000",
      status: 422,
    },

    {
      arr1: Array(1001).fill(1),
      arr2: [1, 2, 3],
      expected: "1 <= arr1.length, arr2.length <= 1000",
      status: 422,
    },
  ],
};

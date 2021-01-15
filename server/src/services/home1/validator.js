const TYPE_ERROR = "TYPE_ERROR";
const LIMITS_ERROR = "LIMITS_ERROR";
const VALID_ERROR = "VALID_ERROR";
const ITEM_LIMITS_ERROR = "ITEM_LIMITS_ERROR";
const DISTINCT_ERROR = "DISTINCT_ERROR";
const CROSSING_ERROR = "CROSSING_ERROR";

const errors = {
  task1: {
    [TYPE_ERROR]: "Input argument must be string",
    [LIMITS_ERROR]: "Input argument must satisfy next constraints 1 <= input length <= 15",
    [VALID_ERROR]: "Only the following 'I', 'V', 'X', 'L', 'C', 'D', 'M' characters are expected",
  },
  task2: {
    [TYPE_ERROR]: "Input argument must be number",
    [LIMITS_ERROR]: "Input argument must satisfy next constraints -(2 ** 31) <= number <= 2 ** 31 - 1",
  },
  task3: {
    [TYPE_ERROR]: "Input argument must be string",
    [LIMITS_ERROR]: "Input argument must satisfy next constraints 1 <= input length <= 104",
    [VALID_ERROR]: "String must consists of next '()[]{}' brackets",
  },
  task4: {
    [TYPE_ERROR]: "Each input argument must be array",
    [LIMITS_ERROR]: "1 <= arr1.length, arr2.length <= 1000",
    [ITEM_LIMITS_ERROR]: "0 <= arr1[i], arr2[i] <= 1000",
    [DISTINCT_ERROR]: "All the elements of arr2 must be distinct",
    [CROSSING_ERROR]: "Each arr2[i] must be in arr1",
  },
  task5: {
    [TYPE_ERROR]: "Function arguments should be 'array' and 'number' in the following sequence",
  },
  throwError(taskNum) {
    return (errorType) => {
      throw TypeError(this[`task${taskNum}`][errorType]);
    };
  },
};

const validateTask1 = (value, validSymbols) => {
  const throwError = errors.throwError(1);
  if (typeof value !== "string") throwError(TYPE_ERROR);
  if (value.length > 15 || value.length < 1) throwError(LIMITS_ERROR);
  if (![...value].every((char) => validSymbols[char])) throwError(VALID_ERROR);
};

const validateTask2 = (value) => {
  const throwError = errors.throwError(2);
  if (typeof value !== "number" || isNaN(value)) throwError(TYPE_ERROR);
  if (value < -(2 ** 31) || value > 2 ** 31 - 1) throwError(LIMITS_ERROR);
};

const validateTask3 = (value, validSymbols) => {
  const throwError = errors.throwError(3);

  if (typeof value !== "string") throwError(TYPE_ERROR);
  if (value.length > 104 || value.length < 1) throwError(LIMITS_ERROR);

  const validSymsSet = new Set([...Object.keys(validSymbols), ...Object.values(validSymbols)]);
  if (![...value].every((char) => validSymsSet.has(char))) throwError(VALID_ERROR);
};

const validateTask4 = (value1, value2) => {
  const throwError = errors.throwError(4);
  const checkItemLimit = (item) => (item < 0 || item > 1000) && throwError(ITEM_LIMITS_ERROR);

  if (!Array.isArray(value1) || !Array.isArray(value2)) throwError(TYPE_ERROR);
  if (value1.length < 1 || value2.length < 1 || value1.length > 1000 || value2.length > 1000) throwError(LIMITS_ERROR);
  if (value2.length !== new Set(value2).size) throwError(DISTINCT_ERROR);
  [...value1, ...value2].forEach(checkItemLimit);

  const value1Set = new Set(value1);
  const checkEntry = (item) => !value1Set.has(item) && throwError(CROSSING_ERROR);
  value2.forEach(checkEntry);
};

const validateTask5 = (value1, value2) => {
  const throwError = errors.throwError(5);
  if (!Array.isArray(value1) || typeof value2 !== "number") throwError(TYPE_ERROR);
};

module.exports = { validateTask1, validateTask2, validateTask3, validateTask4, validateTask5 };

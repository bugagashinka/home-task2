const { validateTask4: validate } = require("./validator");

module.exports = (arr1, arr2) => {
  validate(arr1, arr2);
  const arr1ItemCountMap = arr1.reduce((itemCountMap, item) => {
    itemCountMap.set(item, (itemCountMap.get(item) ?? 0) + 1);
    return itemCountMap;
  }, new Map());

  const res = arr2.reduce((res, item) => {
    const size = arr1ItemCountMap.get(item);
    arr1ItemCountMap.delete(item);
    return res.concat(Array(size).fill(item));
  }, []);
  return res.concat(...arr1ItemCountMap.keys());
};

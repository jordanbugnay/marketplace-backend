const nums = [2, 7, 11, 15];
const target = 9;
var twoSum = function(nums, target) {
  const numsObj = nums.reduce((obj, item) => ((obj[item] = item), obj), {});

  while (true) {}

  return numsObj;
};

console.log(twoSum(nums, target));

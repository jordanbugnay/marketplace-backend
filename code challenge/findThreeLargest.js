const array = [12, 3, 1, 2, -6, 5, 0, -8, -1]
const targetSum = 0

// [[-8, 3, 5], [-6, 1, 5], [-1, 0, 1]]

function threeNumberSum(array, targetSum) {
  const sortedArray = array.sort((a, b) => a - b);
  const triplets = [];
  
	for(let x = 0; x < array.length - 1; x++) {
    let current = sortedArray[x];
		let next = sortedArray[x + 1];
    let last = sortedArray[array.length - 1];

    let nextIndex = sortedArray.indexOf(next);
    let lastIndex = sortedArray.indexOf(last);

    
		for(let y = x; y < array.length - 1; y++) {
      let sum = current + next + last;
			if(sum === targetSum && next !== last) {
				triplets.push([current, next, last]);
			}
			
			if(sum < targetSum) {
        nextIndex++;
				next = sortedArray[nextIndex];
			} else {
        lastIndex--;
				last = sortedArray[lastIndex];
			}
		}
	}
	
	return triplets;
}

console.log(threeNumberSum(array, targetSum))


// [
//   -8, -6, -1,
//    0,  1,  2,
//    3,  5, 12
// ]
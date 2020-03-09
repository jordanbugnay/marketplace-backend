const input = [[4, 9, 2], [3, 5, 7], [8, 1, 5]];

function magicScquare(input) {
  const center = input[1][1];
  if (center !== 5) input[1][1] = 5;

  const magicConstant = 120;
  const leastCost = 0;

  for (let x = 0; x)

  return checkIfMagicSquare(input);
}

function getArraySum(array) {
  return array.reduce((a, b) => a + b, 0);
}

function checkIfMagicSquare(square) {
  let flag = true;

  while (flag) {
    // check rows
    for (let x = 0; x < 3; x++) {
      if (getArraySum(square[x]) !== 15) {
        flag = false;
      }
    }

    // check columns
    for (let x = 0; x < 3; x++) {
      if (getArraySum([square[0][x], square[1][x], square[2][x]]) !== 15) {
        flag = false;
      }
    }

    // check diagonals
    if (getArraySum([square[0][0], square[1][1], square[2][2]]) !== 15) {
      flag = false;
    }
    if (getArraySum([square[0][2], square[1][1], square[2][0]]) !== 15) {
      flag = false;
    }

    break;
  }
  return flag;
}

console.log(magicScquare(input));

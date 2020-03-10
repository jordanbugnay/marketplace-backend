const input = '23478998';

function calculateValidationNumber(input) {
  input = input.split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
  if (input > 9) {
    return calculateValidationNumber(`${input}`);
  }
  return input;
}

console.log(calculateValidationNumber(input));

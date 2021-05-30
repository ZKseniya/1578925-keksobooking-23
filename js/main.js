function getRandomArbitrary(firstNumber, secondNumber, numberOfDemicalPlace) {
  let number = Math.random();

  if (firstNumber < 0 || secondNumber < 0) {
    throw new Error('Ошибка! Диапазон не должен содержать отрицательные числа.');
  }

  if (firstNumber === secondNumber) {
    throw new Error('Ошибка! Числа не должны быть равны.');
  }

  number = (Math.round(number * Math.pow(10, numberOfDemicalPlace)) / Math.pow(10, numberOfDemicalPlace)) * (secondNumber - firstNumber) + firstNumber;

  return number.toFixed(numberOfDemicalPlace);
}

getRandomArbitrary(5.555, 0, 5);

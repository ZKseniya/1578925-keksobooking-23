function getRandomArbitrary(firstNumber, secondNumber, numberOfDemicalPlace = 0) {

  if (firstNumber === undefined || secondNumber === undefined) {
    throw new Error('Ошибка! Диапазон не определен. Нужно ввести два числа');
  }

  if (firstNumber < 0 || secondNumber < 0) {
    throw new Error('Ошибка! Диапазон не должен содержать отрицательные числа.');
  }

  if (numberOfDemicalPlace < 0) {
    throw new Error('Ошибка! Количество знаков после запятой не может быть отрицательным.');
  }

  if (firstNumber === secondNumber) {
    throw new Error('Ошибка! Числа не должны быть равны.');
  }

  let number = Math.random();

  if (numberOfDemicalPlace < 2) {
    number = (Math.round(number * 100)) / 100 * (secondNumber - firstNumber) + firstNumber;
  } else {
    number = (Math.round(number * Math.pow(10, numberOfDemicalPlace)) / Math.pow(10, numberOfDemicalPlace)) * (secondNumber - firstNumber) + firstNumber;
  }

  return parseFloat(number.toFixed(numberOfDemicalPlace));
}

getRandomArbitrary(99, 2, 1);

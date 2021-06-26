// Случайное положительное число с плавающей запятой
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

  const number = (Math.random() * (secondNumber - firstNumber) + firstNumber).toFixed(numberOfDemicalPlace);

  return parseFloat(number);
}

const getRandomArrayElement = (elements) => elements[Math.round(getRandomArbitrary(0, elements.length - 1))];

const getRandomArray = (array) => {
  const newArray = array.sort(() => Math.random() - 0.5);
  return newArray.slice(Math.round(getRandomArbitrary(0, array.length - 1)));
};

export {getRandomArbitrary, getRandomArrayElement, getRandomArray};

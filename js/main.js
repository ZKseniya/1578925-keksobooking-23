// Случайное положительное число с плавающей запятой

function getRandomArbitrary(firstNumber, secondNumber, numberOfDemicalPlace = 2) {

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

// Случайное целое положительное число

function getRandomPositiveInteger (firstNumber, secondNumber) {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Генерация данных

let similarAds = [];
const LOCATION_LAT_MIN = 35.65000;
const LOCATION_LAT_MAX = 35.70000;
const LOCATION_LNG_MIN = 139.70000;
const LOCATION_LNG_MAX = 139.80000;
const PRICE_MIN = 500;
const PRICE_MAX = 2000;
const ROOM_MIN = 1;
const ROOM_MAX = 3;
const GUESTS_MIN = 1;
const GUESTS_MAX = 5;
const SIMILAR_AD_COUNT = 10;
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomArray = (array) => {
  const newArray = array.sort(() => Math.random() - 0.5);
  return newArray.slice(getRandomPositiveInteger(0, array.length - 1));
};

similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map((element, index) => {
  const location = {
    lat : getRandomArbitrary(LOCATION_LAT_MIN, LOCATION_LAT_MAX),
    lng : getRandomArbitrary(LOCATION_LNG_MIN, LOCATION_LNG_MAX),
  };

  const offers = {
    title : `Предложение №${index + 1}`,
    address : `${location.lat  }, ${  location.lng}`,
    price : `${getRandomPositiveInteger(PRICE_MIN, PRICE_MAX)  } .руб`,
    type : getRandomArrayElement(TYPE),
    room : getRandomPositiveInteger(ROOM_MIN, ROOM_MAX),
    guests : getRandomPositiveInteger(GUESTS_MIN, GUESTS_MAX),
    checkin : getRandomArrayElement(TIME),
    checkout : getRandomArrayElement(TIME),
    features : getRandomArray(FEATURES),
    description: `Описание предложения №${index + 1}`,
    photos: getRandomArray(PHOTOS),
  };

  const author = {
    avatar : 'img/avatars/user_0' + (index + 1) + '.png',
  };

  return {author, offers, location};

});

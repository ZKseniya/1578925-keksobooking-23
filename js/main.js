const loc = {
  LAT : {
    MIN : 35.65000,
    MAX : 35.70000,
  },
  LNG : {
    MIN : 139.70000,
    MAX : 139.80000,
  },
  NUMBER_OF_DEMICAL : 5,
};

const priceRange = {
  MIN : 500,
  MAX : 2000,
};

const roomCapacity = {
  MIN : 1,
  MAX : 3,
};

const guestCapacity = {
  MIN : 1,
  MAX : 5,
};

const SIMILAR_AD_COUNT = 10;
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

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

// Генерация данных
const getRandomArrayElement = (elements) => elements[Math.round(getRandomArbitrary(0, elements.length - 1))];

const getRandomArray = (array) => {
  const newArray = array.sort(() => Math.random() - 0.5);
  return newArray.slice(Math.round(getRandomArbitrary(0, array.length - 1)));
};

const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map((element, index) => {
  const location = {
    lat : getRandomArbitrary(loc.LAT.MIN, loc.LAT.MAX, loc.NUMBER_OF_DEMICAL),
    lng : getRandomArbitrary(loc.LNG.MIN, loc.LNG.MAX, loc.NUMBER_OF_DEMICAL),
  };

  const offers = {
    title : `Предложение №${index + 1}`,
    address : `${location.lat  }, ${  location.lng}`,
    price : `${Math.round(getRandomArbitrary(priceRange.MIN, priceRange.MAX))  } руб.`,
    type : getRandomArrayElement(TYPE),
    room : Math.round(getRandomArbitrary(roomCapacity.MIN, roomCapacity.MAX)),
    guests : Math.round(getRandomArbitrary(guestCapacity.MIN, guestCapacity.MAX)),
    checkin : getRandomArrayElement(TIME),
    checkout : getRandomArrayElement(TIME),
    features : getRandomArray(FEATURES),
    description: `Описание предложения №${index + 1}`,
    photos: getRandomArray(PHOTOS),
  };

  const author = {
    avatar : `img/avatars/user_0${  index + 1  }.png`,
  };

  return {author, offers, location};

});

similarAds;


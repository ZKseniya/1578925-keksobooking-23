import {getRandomArbitrary, getRandomArray, getRandomArrayElement} from './util.js';

const Coordinate = {
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

const PriceRange = {
  MIN : 500,
  MAX : 2000,
};

const RoomCapacity = {
  MIN : 1,
  MAX : 3,
};

const GuestCapacity = {
  MIN : 1,
  MAX : 5,
};

const SIMILAR_AD_COUNT = 10;
const TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECK_TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map((element, index) => {
  const location = {
    lat : getRandomArbitrary(Coordinate.LAT.MIN, Coordinate.LAT.MAX, Coordinate.NUMBER_OF_DEMICAL),
    lng : getRandomArbitrary(Coordinate.LNG.MIN, Coordinate.LNG.MAX, Coordinate.NUMBER_OF_DEMICAL),
  };

  const offers = {
    title : `Предложение №${index + 1}`,
    address : `${location.lat  }, ${  location.lng}`,
    price : `${Math.round(getRandomArbitrary(PriceRange.MIN, PriceRange.MAX))  }`,
    type : getRandomArrayElement(TYPE_OF_HOUSING),
    room : Math.round(getRandomArbitrary(RoomCapacity.MIN, RoomCapacity.MAX)),
    guests : Math.round(getRandomArbitrary(GuestCapacity.MIN, GuestCapacity.MAX)),
    checkin : getRandomArrayElement(CHECK_TIME),
    checkout : getRandomArrayElement(CHECK_TIME),
    features : getRandomArray(FEATURES),
    description: `Описание предложения №${index + 1}`,
    photos: getRandomArray(PHOTOS),
  };

  const author = {
    avatar : `img/avatars/user0${  index + 1  }.png`,
  };

  return {author, offers, location};

});

export {similarAds};

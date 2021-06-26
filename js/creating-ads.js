import {similarAds} from './data-generator.js';

const HOUSING_TYPE_DICTIONARY = {
  bungalow : 'Бунгало',
  flat : 'Квартира',
  house : 'Дом',
  hotel : 'Отель',
  palace : 'Дворец',
};

const FEATURES_CLASSES = {
  wifi : 'popup__feature--wifi',
  dishwasher : 'popup__feature--dishwasher',
  parking : 'popup__feature--parking',
  washer : 'popup__feature--washer',
  elevator : 'popup__feature--elevator',
  conditioner : 'popup__feature--conditioner',
};

const PHOTOS_DATA = {
  width : 45,
  height : 40,
  alt : 'Фотография жилья',
};

const arrayAds = [];
let similarAdTemplate = document.querySelector('#card').content;

const createAd = function(ad) {
  similarAdTemplate = similarAdTemplate.cloneNode(true);
  const adPrice = similarAdTemplate.querySelector('.popup__text--price');
  const amountGuestsAndRooms = similarAdTemplate.querySelector('.popup__text--capacity');
  const checkinAndCheckOut = similarAdTemplate.querySelector('.popup__text--time');
  const featuresList = similarAdTemplate.querySelector('.popup__features');
  const featuresListElements = similarAdTemplate.querySelectorAll('.popup__feature');
  const featuresDataArray = ad.offers.features;
  const photoList = similarAdTemplate.querySelector('.popup__photos');
  const photoListElements = similarAdTemplate.querySelectorAll('.popup__photo');
  const photosDataArray = ad.offers.photos;

  similarAdTemplate.querySelector('.popup__avatar').src = ad.author.avatar;
  similarAdTemplate.querySelector('.popup__title').textContent = ad.offers.title;
  similarAdTemplate.querySelector('.popup__text--address').textContent = ad.offers.address;
  adPrice.textContent = `${ad.offers.price  } ₽/ночь`;
  similarAdTemplate.querySelector('.popup__description').textContent = ad.offers.description;
  similarAdTemplate.querySelector('.popup__type').textContent = HOUSING_TYPE_DICTIONARY[ad.offers.type];

  if (ad.offers.room === 1) {
    if (ad.offers.guests === 1) {
      amountGuestsAndRooms.textContent = `${ad.offers.room} комната для ${ad.offers.guests } гостя`;
    } else {
      amountGuestsAndRooms.textContent = `${ad.offers.room} комната для ${ad.offers.guests } гостей`;
    }
  } else {
    amountGuestsAndRooms.textContent = `${ad.offers.room} комнаты для ${ad.offers.guests } гостей`;
  }

  checkinAndCheckOut.textContent = `Заезд после ${ad.offers.checkin}, выезд до ${ad.offers.checkout}`;

  featuresListElements.forEach((event) => {
    event.remove();
  });

  featuresDataArray.forEach((feature) => {
    const featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature');
    featuresElement.classList.add(FEATURES_CLASSES[feature]);
    featuresList.appendChild(featuresElement);
  });

  photoListElements.forEach((event) => {
    event.remove();
  });

  photosDataArray.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.src = photo;
    photoElement.width = PHOTOS_DATA.width;
    photoElement.height = PHOTOS_DATA.height;
    photoElement.alt = PHOTOS_DATA.alt;
    photoList.appendChild(photoElement);
  });

  arrayAds.push(similarAdTemplate);
};

similarAds.forEach((ad) => {
  createAd(ad);
});

export {arrayAds};

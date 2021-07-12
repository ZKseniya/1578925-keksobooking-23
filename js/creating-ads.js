import {getWordEndings} from './util.js';

const HousingTypeDictionary = {
  bungalow : 'Бунгало',
  flat : 'Квартира',
  house : 'Дом',
  hotel : 'Отель',
  palace : 'Дворец',
};

const FeaturesClasses = {
  wifi : 'popup__feature--wifi',
  dishwasher : 'popup__feature--dishwasher',
  parking : 'popup__feature--parking',
  washer : 'popup__feature--washer',
  elevator : 'popup__feature--elevator',
  conditioner : 'popup__feature--conditioner',
};

const PhotosData = {
  WIDTH : 45,
  HEIGHT : 40,
  ALT : 'Фотография жилья',
};

const createAd = (similarAd) => {
  let similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
  similarAdTemplate = similarAdTemplate.cloneNode(true);
  const adPrice = similarAdTemplate.querySelector('.popup__text--price');
  const amountGuestsAndRooms = similarAdTemplate.querySelector('.popup__text--capacity');
  const checkinAndCheckOut = similarAdTemplate.querySelector('.popup__text--time');
  const featuresList = similarAdTemplate.querySelector('.popup__features');
  const featuresListElements = similarAdTemplate.querySelectorAll('.popup__feature');
  const featuresDataArray = similarAd.offers.features;
  const photoList = similarAdTemplate.querySelector('.popup__photos');
  const photoListElements = similarAdTemplate.querySelectorAll('.popup__photo');
  const photosDataArray = similarAd.offers.photos;

  similarAdTemplate.querySelector('.popup__avatar').src = similarAd.author.avatar;
  similarAdTemplate.querySelector('.popup__title').textContent = similarAd.offers.title;
  similarAdTemplate.querySelector('.popup__text--address').textContent = similarAd.offers.address;
  adPrice.textContent = `${similarAd.offers.price  } ₽/ночь`;
  similarAdTemplate.querySelector('.popup__description').textContent = similarAd.offers.description;
  similarAdTemplate.querySelector('.popup__type').textContent = HousingTypeDictionary[similarAd.offers.type];
  amountGuestsAndRooms.textContent = `${similarAd.offers.room} ${getWordEndings(similarAd.offers.room, ['комната', 'комнаты', 'комнат'])} для
  ${similarAd.offers.guests} ${getWordEndings(similarAd.offers.guests, ['гостя', 'гостей'])}`;

  checkinAndCheckOut.textContent = `Заезд после ${similarAd.offers.checkin}, выезд до ${similarAd.offers.checkout}`;

  featuresListElements.forEach((event) => {
    event.remove();
  });

  featuresDataArray.forEach((feature) => {
    const featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature');
    featuresElement.classList.add(FeaturesClasses[feature]);
    featuresList.appendChild(featuresElement);
  });

  photoListElements.forEach((event) => {
    event.remove();
  });

  photosDataArray.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.src = photo;
    photoElement.width = PhotosData.width;
    photoElement.height = PhotosData.height;
    photoElement.alt = PhotosData.alt;
    photoList.appendChild(photoElement);
  });

  return similarAdTemplate;
};

export {createAd};

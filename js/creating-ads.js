import {getWordEndings} from './utils/util.js';

const HousingTypeToRus = {
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
  const arrayFeatures = similarAd.offer.features || [];
  const arrayPhotos = similarAd.offer.photos || [];
  const adPrice = similarAdTemplate.querySelector('.popup__text--price');
  const amountGuestsAndRooms = similarAdTemplate.querySelector('.popup__text--capacity');
  const checkinAndCheckOut = similarAdTemplate.querySelector('.popup__text--time');
  const featuresList = similarAdTemplate.querySelector('.popup__features');
  const featuresListElements = similarAdTemplate.querySelectorAll('.popup__feature');
  const photoList = similarAdTemplate.querySelector('.popup__photos');
  const photoListElements = similarAdTemplate.querySelectorAll('.popup__photo');
  similarAdTemplate.querySelector('.popup__avatar').src = similarAd.author.avatar;
  similarAdTemplate.querySelector('.popup__title').textContent = similarAd.offer.title;
  similarAdTemplate.querySelector('.popup__text--address').textContent = similarAd.offer.address;
  adPrice.textContent = `${similarAd.offer.price  } ₽/ночь`;
  similarAdTemplate.querySelector('.popup__description').textContent = similarAd.offer.description;
  similarAdTemplate.querySelector('.popup__type').textContent = HousingTypeToRus[similarAd.offer.type];
  amountGuestsAndRooms.textContent = `${similarAd.offer.rooms} ${getWordEndings(similarAd.offer.rooms, ['комната', 'комнаты', 'комнат'])} для
  ${similarAd.offer.guests} ${getWordEndings(similarAd.offer.guests, ['гостя', 'гостей'])}`;

  checkinAndCheckOut.textContent = `Заезд после ${similarAd.offer.checkin}, выезд до ${similarAd.offer.checkout}`;

  featuresListElements.forEach((event) => {
    event.remove();
  });

  if (arrayFeatures === []) {
    featuresList.classList.add('hidden');
  } else {
    arrayFeatures.forEach((feature) => {
      const featuresElement = document.createElement('li');
      featuresElement.classList.add('popup__feature');
      featuresElement.classList.add(FeaturesClasses[feature]);
      featuresList.appendChild(featuresElement);
    });
  }

  photoListElements.forEach((event) => {
    event.remove();
  });

  if(arrayPhotos === []) {
    photoList.classList.add('hidden');
  } else {
    arrayPhotos.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.classList.add('popup__photo');
      photoElement.src = photo;
      photoElement.width = PhotosData.width;
      photoElement.height = PhotosData.height;
      photoElement.alt = PhotosData.alt;
      photoList.appendChild(photoElement);
    });
  }

  return similarAdTemplate;
};

export {createAd};

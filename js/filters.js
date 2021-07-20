import {createMarkers} from './map-processing.js';

const addFilterMarkers = (adsList) => {
  const SIMILAR_ADS_COUNT = 10;
  const TYPE_ANY = 'any';
  const filtersForm = document.querySelector('.map__filters');
  const typeHousingSelect = filtersForm['housing-type'];
  const priceSelect = filtersForm['housing-price'];
  const roomsSelect = filtersForm['housing-rooms'];
  const guestsSelect = filtersForm['housing-guests'];
  const features = filtersForm.querySelectorAll('[type="checkbox"]');

  const priceRange = {
    'low': {
      min: 0,
      max: 10000,
    },
    'middle': {
      min: 10000,
      max: 50000,
    },
    'high': {
      min: 50000,
      max: 1000000,
    },
  };

  const getFilterFeatures = (itemList) => {
    const featuresChecked = [...features].filter((feature) => feature.checked);
    return  featuresChecked.every((feature) => itemList.offer.features && itemList.offer.features.includes(feature.value));
  };

  const filterTypeHousing = adsList.filter((itemList) => typeHousingSelect.value === TYPE_ANY ? true : itemList.offer.type === typeHousingSelect.value)
    .filter((itemList) => roomsSelect.value === TYPE_ANY ? true : itemList.offer.rooms === parseFloat(roomsSelect.value))
    .filter((itemList) => guestsSelect.value === TYPE_ANY ? true : itemList.offer.guests === parseFloat(guestsSelect.value))
    .filter((itemList) => priceSelect.value === TYPE_ANY ? true : itemList.offer.price >= priceRange[priceSelect.value].min
    && itemList.offer.price <= priceRange[priceSelect.value].max)
    .filter((itemList) => getFilterFeatures(itemList));


  createMarkers(filterTypeHousing.slice(0, SIMILAR_ADS_COUNT));
};

export {addFilterMarkers};

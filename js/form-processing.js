import { resetMap, addDefaultCoordinates } from './map-processing.js';

const infoAboutAdForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');
const guestCapacitySelect = document.querySelector('#capacity');
const guestCapacityOptions = guestCapacitySelect.querySelectorAll('option');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const imagePreview = document.querySelector('.ad-form__photo');

const DEFAULT_IMAGE = 'img/muffin-grey.svg';

const addFormsLocking = () => {
  const addDisabled = (element) => {
    const lockClass = `${element.classList.item(0)  }--disabled`;
    element.classList.add(lockClass);

    element.childNodes.forEach((item) => {
      item.disabled = true;
    });
  };

  addDisabled(infoAboutAdForm);
  addDisabled(filtersForm);
};

const removeFormsLocking = () => {
  const removeDisabled = (element) => {
    element.classList.remove(`${element.classList.item(0)  }--disabled`);

    element.childNodes.forEach((item) => {
      item.disabled = false;
    });
  };
  const addDefaultValue  = () => {
    addDefaultCoordinates();
    guestCapacityOptions.forEach((option) => {
      option.disabled = parseFloat(option.value) > 1 || parseFloat(option.value) === 0;
      option.selected = !(parseFloat(option.value) > 1 || parseFloat(option.value) === 0);
    });
  };

  removeDisabled(infoAboutAdForm);
  addDefaultValue();
  removeDisabled(filtersForm);
};

const addFormValidation = () => {
  const TitleLength = {
    MIN : 30,
    MAX : 100,
  };
  const MAX_PRICE = 1000000;
  const HousingOptions = {
    BUNGALOW : {
      minPrice: 0,
      value: 'bungalow',
    },
    FLAT : {
      minPrice: 1000,
      value: 'flat',
    },
    HOTEL : {
      minPrice: 3000,
      value: 'hotel',
    },
    HOUSE : {
      minPrice: 5000,
      value: 'house',
    },
    PALACE : {
      minPrice: 10000,
      value: 'palace',
    },
  };

  const adTitle = document.querySelector('#title');
  const adPrice = document.querySelector('#price');
  const roomCapacitySelect = document.querySelector('#room_number');
  const typeHousingSelect = document.querySelector('#type');
  const timeInSelect = document.querySelector('#timein');
  const timeOutSelect = document.querySelector('#timeout');

  adTitle.addEventListener('input', () => {
    const valueLength = adTitle.value.length;

    if (valueLength < TitleLength.MIN) {
      adTitle.setCustomValidity(`Имя должно состоять минимум из 30-х символов. Еще ${ TitleLength.MIN - valueLength } символов.`);
    } else if (valueLength > TitleLength.MAX) {
      adTitle.setCustomValidity(`Имя не должно превышать 100 символов. Удалите ${ valueLength - TitleLength.MAX } символов.`);
    } else {
      adTitle.setCustomValidity('');
    }
  });

  adPrice.addEventListener('input', () => {
    if (adPrice.value < 0) {
      adPrice.setCustomValidity('Значение не должно быть отрицательным');
    } else if (adPrice.value > MAX_PRICE) {
      adPrice.setCustomValidity(`Значение не должно быть больше ${MAX_PRICE}`);
    } else {
      adPrice.setCustomValidity('');
    }
  });

  const addSyncSelects = (evt, optionsList) => {
    const currentOption = evt.target;
    const currentOptionValue = parseFloat(currentOption.value);
    const GuestsOptionsValue = {
      ONE_GUEST : 1,
      TWO_GUESTS : 2,
      THREE_GUESTS : 3,
      NOT_FOR_GUESTS : 100,
    };

    const addDisabledOptions = () => {
      optionsList.forEach((option) => {
        option.selected = false;
        const optionValue = parseFloat(option.value);
        option.disabled = optionValue > currentOptionValue || optionValue === 0;
        option.selected = optionValue === 1;
      });
    };

    switch (currentOptionValue) {
      case GuestsOptionsValue.ONE_GUEST:
      case GuestsOptionsValue.TWO_GUESTS:
      case GuestsOptionsValue.THREE_GUESTS:
        addDisabledOptions(optionsList);
        break;
      case GuestsOptionsValue.NOT_FOR_GUESTS:
        optionsList.forEach((option) => {
          const optionValue = parseFloat(option.value);
          option.disabled = optionValue !== 0;
          option.selected = !(optionValue !== 0);
        });
    }
  };
  roomCapacitySelect.addEventListener('change', (evt) => addSyncSelects(evt, guestCapacityOptions));

  typeHousingSelect.addEventListener('change', (evt) => {
    const optionValue = evt.target.value;

    adPrice.min = HousingOptions[optionValue.toUpperCase()].minPrice;
    adPrice.placeholder = HousingOptions[optionValue.toUpperCase()].minPrice;
  });

  const addSelectOpionsTime = (evt, optionsList) => {
    const optionValue = evt.target.value;

    for (const elem of optionsList.children) {
      elem.selected = elem.value === optionValue;
    }
  };

  timeInSelect.addEventListener('change', (evt) => addSelectOpionsTime(evt, timeOutSelect));
  timeOutSelect.addEventListener('change', (evt) => addSelectOpionsTime(evt, timeInSelect));
};

const clearUserForm = () => {
  avatarPreview.src = DEFAULT_IMAGE;
  imagePreview.innerHTML = '';
  infoAboutAdForm.reset();
  resetMap();
  addDefaultCoordinates();
};

const buttonReset = document.querySelector('.ad-form__reset');

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearUserForm();
});

export {addFormsLocking, removeFormsLocking, addFormValidation, clearUserForm};

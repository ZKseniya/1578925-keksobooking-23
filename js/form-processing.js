const infoAboutAdForm = document.querySelector('.ad-form');
const filtersForm = document.querySelector('.map__filters');

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
  removeDisabled(infoAboutAdForm);
  removeDisabled(filtersForm);
};

const addFormValidation = () => {
  const TitleLength = {
    MIN : 30,
    MAX : 100,
  };
  const MAX_PRICE = 1000000;
  const HousingPriceMin = {
    BUNGALOW : 0,
    FLAT : 1000,
    HOTEL : 3000,
    HOUSE : 5000,
    PALACE : 10000,
  };
  const adTitle = document.querySelector('#title');
  const adPrice = document.querySelector('#price');
  const roomCapacitySelect = document.querySelector('#room_number');
  const roomCapacityOptions = roomCapacitySelect.querySelectorAll('option');
  const guestCapacitySelect = document.querySelector('#capacity');
  const guestCapacityOptions = guestCapacitySelect.querySelectorAll('option');
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

    const addDisabledOptions = () => {
      optionsList.forEach((option) => {
        option.selected = false;
        const optionValue = parseFloat(option.value);
        if (optionValue > currentOptionValue || optionValue === 0) {
          option.disabled = true;
        } else {
          option.disabled = false;
          if (optionValue === 1) {
            option.selected = true;
          }
        }
      });
    };

    switch (currentOptionValue) {
      case 1:
        addDisabledOptions(optionsList);
        break;
      case 2:
        addDisabledOptions(optionsList);
        break;
      case 3:
        addDisabledOptions(optionsList);
        break;
      case 100:
        optionsList.forEach((option) => {
          const optionValue = parseFloat(option.value);
          if (optionValue !== 0) {
            option.disabled = true;
            option.selected = false;
          } else {
            option.disabled = false;
            option.selected = true;
          }
        });
    }
  };

  roomCapacitySelect.addEventListener('change', (evt) => addSyncSelects(evt, guestCapacityOptions));
  guestCapacitySelect.addEventListener('change', (evt) => addSyncSelects(evt, roomCapacityOptions));

  typeHousingSelect.addEventListener('change', (evt) => {
    const optionValue = evt.target.value;

    switch (optionValue) {
      case 'bungalow' :
        adPrice.min = HousingPriceMin.BUNGALOW;
        adPrice.placeholder = HousingPriceMin.BUNGALOW;
        break;
      case 'flat' :
        adPrice.min = HousingPriceMin.FLAT;
        adPrice.placeholder = HousingPriceMin.FLAT;
        break;
      case 'hotel' :
        adPrice.min = HousingPriceMin.HOTEL;
        adPrice.placeholder = HousingPriceMin.HOTEL;
        break;
      case 'house' :
        adPrice.min = HousingPriceMin.HOUSE;
        adPrice.placeholder = HousingPriceMin.HOUSE;
        break;
      case 'palace' :
        adPrice.min = HousingPriceMin.PALACE;
        adPrice.placeholder = HousingPriceMin.PALACE;
        break;
    }
  });

  const addSelectOpionsTime = (evt, optionsList) => {
    const optionValue = evt.target.value;

    for (const elem of optionsList.children) {
      if (elem.value === optionValue) {
        elem.selected = true;
      } else {
        elem.selected = false;
      }
    }
  };

  timeInSelect.addEventListener('change', (evt) => addSelectOpionsTime(evt, timeOutSelect));
  timeOutSelect.addEventListener('change', (evt) => addSelectOpionsTime(evt, timeInSelect));
};

export {addFormsLocking, removeFormsLocking, addFormValidation};

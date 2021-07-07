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
    if (element.classList.contains(`${element.classList.item(0)  }--disabled`) === true) {
      element.classList.remove(`${element.classList.item(0)  }--disabled`);

      element.childNodes.forEach((item) => {
        item.disabled = false;
      });
    }
  };
  removeDisabled(infoAboutAdForm);
  removeDisabled(filtersForm);
};

export {addFormsLocking, removeFormsLocking};

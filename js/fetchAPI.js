import {addMapAndMarkers} from './map-processing.js';

const getData = () => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((adsList) => {
      addMapAndMarkers(adsList);
    });
};

const sendData = (onSuccess, onSuccessMessage, onErrorMassage) => {
  const infoAboutAdForm = document.querySelector('.ad-form');

  infoAboutAdForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch('https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      if (response.ok) {
        onSuccess();
        onSuccessMessage();
      } else {
        onErrorMassage();
      }
    })
      .catch(() => {
        onErrorMassage();
      });
  });
};

export {getData, sendData};

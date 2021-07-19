import {addMapAndMarkers} from './map-processing.js';
import {onMessageErrorServer} from './messages.js';
import {clearUserForm} from './form-processing.js';

const FetchUrl = {
  GETDATA : 'https://23.javascript.pages.academy/keksobooking/data',
  SENDDATA : 'https://23.javascript.pages.academy/keksobooking',
};

const getData = () => {
  fetch(FetchUrl.GETDATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onMessageErrorServer();
      }
    })
    .then((adsList) => {
      addMapAndMarkers(adsList);
    })
    .catch(() => {
      onMessageErrorServer();
    });
};

const sendData = (onSuccess, onSuccessMessage, onErrorMassage) => {
  const infoAboutAdForm = document.querySelector('.ad-form');

  infoAboutAdForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(FetchUrl.SENDDATA,
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      if (response.ok) {
        onSuccess();
        onSuccessMessage();
      } else if (response.status > 400){
        onErrorMassage();
        clearUserForm();
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

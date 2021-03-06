const closeMessage = (message) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      document.body.removeChild(message);
    }
  });

  const popupMessageCloseHandler = () => {
    message.remove();
    document.body.removeEventListener('click', popupMessageCloseHandler);
  };

  document.body.addEventListener('click', popupMessageCloseHandler);
};

const onSuccessMessage = () => {
  let messageTemplateSuccess = document.querySelector('#success').content.querySelector('.success');
  messageTemplateSuccess = messageTemplateSuccess.cloneNode(true);
  document.body.appendChild(messageTemplateSuccess);

  closeMessage(messageTemplateSuccess);
};

const onErrorMassage = () => {
  let messageTemplateError = document.querySelector('#error').content.querySelector('.error');
  messageTemplateError = messageTemplateError.cloneNode(true);
  const errorButton = messageTemplateError.querySelector('.error__button');
  document.body.appendChild(messageTemplateError);

  const ErrorMessageCloseHandler = () => {
    messageTemplateError.remove();
  };

  errorButton.addEventListener('click', () => ErrorMessageCloseHandler());

  closeMessage(messageTemplateError);
};

const onMessageErrorServer = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#b60d2f';
  alertContainer.style.color = 'white';

  alertContainer.textContent = 'Ошибка загрузки данных. Попробуйте позже';

  document.body.appendChild(alertContainer);

  const offMessageErrorServer = () => {
    document.body.removeChild(alertContainer);
  };

  setTimeout(() => {
    offMessageErrorServer();
  }, 5000);
};

export {onSuccessMessage, onErrorMassage, onMessageErrorServer};

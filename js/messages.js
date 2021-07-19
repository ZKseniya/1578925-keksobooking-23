const pressEsc = (message) => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      document.querySelector('body').removeChild(message);
    }
});
};

const onSuccessMessage = () => {
  const messageTemplateSuccess = document.querySelector('#success').content.querySelector('.success');
  document.querySelector('body').appendChild(messageTemplateSuccess);

  pressEsc(messageTemplateSuccess);
};

const onErrorMassage = () => {
  const messageTemplateError = document.querySelector('#error').content.querySelector('.error');
  const errorButton = messageTemplateError.querySelector('.error__button');
  document.querySelector('body').appendChild(messageTemplateError);

  errorButton.addEventListener('click', () => {
    document.querySelector('body').removeChild(messageTemplateError);
  });

  pressEsc(messageTemplateError);
};

export {onSuccessMessage, onErrorMassage};

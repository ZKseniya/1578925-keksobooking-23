import {addFormsLocking, addFormValidation, clearUserForm} from './form-processing.js';
import {getData, sendData} from './fetchAPI.js';
import {onSuccessMessage, onErrorMassage} from './messages.js';

addFormsLocking();
getData();
addFormValidation();
<<<<<<< HEAD
=======
sendData(clearUserForm, onSuccessMessage, onErrorMassage);
>>>>>>> cfcc3a2 (feat: добавляет обработку данных с сервера)

import {addFormsLocking, addFormValidation, clearUserForm} from './form-processing.js';
import {getData, sendData} from './fetchAPI.js';
import {onSuccessMessage, onErrorMassage} from './messages.js';

addFormsLocking();
getData();
addFormValidation();
sendData(clearUserForm, onSuccessMessage, onErrorMassage);

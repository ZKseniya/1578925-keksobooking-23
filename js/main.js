import {addFormsLocking, addFormValidation, clearUserForm} from './form-processing.js';
import {getData, sendData} from './fetch-api.js';
import {onSuccessMessage, onErrorMassage} from './messages.js';

addFormsLocking();
getData();
sendData(clearUserForm, onSuccessMessage, onErrorMassage);
addFormValidation();

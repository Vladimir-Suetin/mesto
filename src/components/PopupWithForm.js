import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, submitForm, submitButtonLoading }) {
    super(selector);
    this._handleSubmitForm = submitForm;
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = this._form.querySelectorAll('.popup__field');
    this._submitButtonLoading = submitButtonLoading;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();

    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      this._handleSubmitForm(evt, this._getInputValues());
      this._submitButtonLoading(this._popup);
      this._form.reset();
    });
  }
}

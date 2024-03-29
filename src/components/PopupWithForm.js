import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, submitForm }) {
    super(selector);
    this._handleSubmitForm = submitForm;
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = this._form.querySelectorAll('.popup__field');
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
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
      evt.preventDefault();
      this._handleSubmitForm({
        objectValue: this._getInputValues(),
        submitButton: this._submitButton,
        popup: this._popup,
      });
    });
  }
}

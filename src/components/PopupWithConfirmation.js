import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ selector }) {
    super(selector);
    this._form = this._popup.querySelector('.popup__container');
  }

  setCallback(handleDeleteCard) {
    this._handleDeleteCard = handleDeleteCard;
  }

  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleDeleteCard();
    });
  }
}

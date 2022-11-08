import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ selector }) {
    super(selector);
    this._form = this._popup.querySelector('.popup__container');
  }

  setCallback({ handleDeleteCard, data }) {
    this._data = data;
    this._handleDeleteCard = handleDeleteCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._editButtonTextCallBack(this._submitButton);
      this._handleDeleteCard({ data: this._data, submitButton: this._submitButton, popup: this._popup });
    });
  }
}

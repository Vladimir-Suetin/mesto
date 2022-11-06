import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ selector, deleteCard}) {
    super(selector);
    this._deleteCard = deleteCard;
    // this._data = data;
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._deleteCard(this.data);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submitHandler);
  }
}

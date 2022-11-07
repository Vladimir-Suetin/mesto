import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selector, deleteCard) {
    super(selector);
    this._deleteCard = deleteCard;
  }

  _submitHandler(evt, data) {
    evt.preventDefault();
    this._deleteCard(data);
    super.close();
  }

  setEventListeners(data) {
    super.setEventListeners();
    this._popup.addEventListener('click', (evt) => {
      this._submitHandler(evt, data);
    });
  }
}

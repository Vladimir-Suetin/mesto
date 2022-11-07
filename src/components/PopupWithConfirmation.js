import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({selector, deleteCard, submitButtonLoading}) {
    super(selector);
    this._deleteCard = deleteCard;
    this._submitButtonLoading = submitButtonLoading;
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
      this._submitButtonLoading(this._popup)
    });
  }
}

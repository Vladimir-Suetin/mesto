import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ selector }) {
    super(selector);
    this._form = this._popup.querySelector('.popup__container');
  }

  setCallback({ handleDeleteCard, dataCard }) {
    this._dataCard = dataCard;
    this._handleDeleteCard = handleDeleteCard;
  }

  editSubmitButtonText(editButtonTextCallBack) {
    this._editButtonTextCallBack = editButtonTextCallBack;
  }

  removeSubmitButtonText(removeButtonTextCallBack) {
    this._removeButtonTextCallBack = removeButtonTextCallBack;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._editButtonTextCallBack(this._submitButton);
      this._handleDeleteCard({ dataCard: this._dataCard, submitButton: this._submitButton, popup: this._popup });
    });
  }
}

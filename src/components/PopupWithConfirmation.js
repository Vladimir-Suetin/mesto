import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ selector}) {
    super(selector);
    this._form = this._popup.querySelector('.popup__container');
  }

  setCallback(submitCallBack) {
    this._handleSubmit = submitCallBack;
  }

  setEventListeners(data) {
    super.setEventListeners();
    this._form.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmit({data, submitButton: this._submitButton, popup: this._popup});
      this._editButtonTextCallBack(this._submitButton);
    });
  }
}

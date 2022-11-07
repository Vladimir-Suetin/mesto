import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ selector, submitButtonLoading }) {
    super(selector);
    this._form = this._popup.querySelector('.popup__container');
    this._submitButtonLoading = submitButtonLoading;
  }

  setCallback(submitCallBack) {
    this._handleSubmit = submitCallBack;
  }

  setEventListeners(data) {
    super.setEventListeners();
    this._form.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmit(data);
      this._submitButtonLoading(this._popup);
    });
  }
}

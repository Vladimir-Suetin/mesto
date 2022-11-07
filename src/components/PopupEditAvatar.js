import Popup from "./Popup.js";

export default class PopupEditAvatar extends Popup{
  constructor({selector, editAvatar}) {
    super(selector);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    editAvatar();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {this._submitHandler(evt)});
  }
}
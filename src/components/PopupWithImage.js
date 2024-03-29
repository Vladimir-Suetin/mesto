import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ selector }) {
    super(selector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageName = this._popup.querySelector('.popup__image-title');
  }

  open({ name, link }) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupImageName.textContent = this._popupImage.alt;
  }
}

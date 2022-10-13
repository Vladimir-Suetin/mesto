export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector('.popup__close-icon');
    // this._escapeClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });

    this._closeButton.addEventListener('click', () => {
      this.close();
    });
  };
}

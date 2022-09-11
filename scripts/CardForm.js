import Card from "./Card.js";

export default class CardForm {
  constructor(selectors, template, nameInput, linkInput, list, formAddImage, closePopup, getTemplateImage) {
    this._selectors = selectors;
    this._template = template;
    this._nameInput = nameInput;
    this._linkInput = linkInput;
    this._list = list;
    this._form = formAddImage;
    this._closePopup = closePopup;
    this._getTemplateImage = getTemplateImage;
  }

  _submitHandler = (evt) => {
    evt.preventDefault();

    this.getElement();

    this._form.reset();

    this._closePopup();

    this._getTemplateImage();
  };

  getElement = () => {
    this._nameValue = this._nameInput.value;
    this._linkValue = this._linkInput.value;
    this._object = { name: this._nameValue, link: this._linkValue };

    this.element = new Card(this._object, this._template, this._selectors);

    this._list.prepend(this.element.generateCard());
  };

  eventListener = () => {
    this._form.addEventListener("submit", this._submitHandler);
  };
}

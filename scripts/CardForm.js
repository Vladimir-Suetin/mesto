// import Card from "./Card.js";

// export default class CardForm {
//   _selectors;
//   _template;
//   _nameInput;
//   _linkInput;
//   _list;
//   _form;
//   _closePopup;
//   _openPopupViewImage;
//   _nameValue;
//   _linkValue;
//   _object;

//   constructor(selectors, template, nameInput, linkInput, list, formAddImage, closePopup, openPopupViewImage) {
//     this._selectors = selectors;
//     this._template = template;
//     this._nameInput = nameInput;
//     this._linkInput = linkInput;
//     this._list = list;
//     this._form = formAddImage;
//     this._closePopup = closePopup;
//     this._openPopupViewImage = openPopupViewImage;
//   }

//   _submitHandler = (evt) => {
//     evt.preventDefault();

//     this.getElement();

//     this._form.reset();

//     this._closePopup();
//   };

//   getElement = () => {
//     this._nameValue = this._nameInput.value;
//     this._linkValue = this._linkInput.value;
//     this._object = { name: this._nameValue, link: this._linkValue };

//     this.element = new Card(this._object, this._template, this._selectors, this._openPopupViewImage);

//     this._list.prepend(this.element.generateCard());
//   };

//   eventListener = () => {
//     this._form.addEventListener("submit", this._submitHandler);
//   };
// }

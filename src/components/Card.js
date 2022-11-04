export default class Card {
  _link;
  _name;
  _selectors;
  _template;
  _cloneElementTemplate;
  _elementTemplate;
  _title;
  _image;
  _removeButton;
  _likeButton;

  constructor(card, cardSelector, handleCardClick, confirmsDeletion) {
    this._link = card.link;
    this._name = card.name;
    this._template = cardSelector;
    this._handleCardClick = handleCardClick;
    this._confirmsDeletion = confirmsDeletion;
  }

  _delClickHandler() {
    this._confirmsDeletion();
    this._elementTemplate.remove();
    this._elementTemplate = null;
  };

  _likeClickHandler() {
    this._likeButton.classList.toggle("element__like-button_active");
  };

  // setLike(data) {

  // }

  // deleteLike(data) {

  // }

  _cloneElement() {
    this._cloneElementTemplate = document.querySelector(this._template).content.cloneNode(true);
    return this._cloneElementTemplate;
  };

  generateCard() {
    this._elementTemplate = this._cloneElement().querySelector(".element");
    this._title = this._elementTemplate.querySelector(".element__title");
    this._image = this._elementTemplate.querySelector(".element__mask-group");
    this._removeButton = this._elementTemplate.querySelector(".element__button-remove");
    this._likeButton = this._elementTemplate.querySelector(".element__like-button");

    this._title.textContent = this._name;

    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();

    return this._elementTemplate;
  };

  _setEventListeners() {
    this._removeButton.addEventListener("click", () => {
      this._delClickHandler();
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._likeClickHandler();
    });
  };
}

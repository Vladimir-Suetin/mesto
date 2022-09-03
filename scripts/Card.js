export default class Card {
  _link;
  _name;
  _template;

  _cloneElementTemplate;
  _elementTemplate;
  _title;
  _image;
  _removeButton;
  _likeButton;

  constructor(card, template, selectors) {
    this._link = card.link;
    this._name = card.name;
    this._template = template;
    this._selectors = selectors;
  }

  _delClickHandler() {
    this._elementTemplate.remove();
  }

  _likeClickHandler() {
    if (this._likeButton.classList.contains("element__like-button_active")) {
      this._likeButton.classList.remove("element__like-button_active");
    } else {
      this._likeButton.classList.add("element__like-button_active");
    }
  }

  cloneElementTemplate() {
    this._cloneElementTemplate = this._template.content.cloneNode(true);
    return this._cloneElementTemplate;
  }

  generateCard() {
    this._elementTemplate = this.cloneElementTemplate().querySelector(this._selectors.templateCardElement);
    this._title = this._elementTemplate.querySelector(this._selectors.templateTitleImageCard);
    this._image = this._elementTemplate.querySelector(this._selectors.templateLinkImageCard);
    this._removeButton = this._elementTemplate.querySelector(this._selectors.templateElementButtonRemove);
    this._likeButton = this._elementTemplate.querySelector(this._selectors.templateLikeButton);

    this._title.textContent = this._name;

    this._image.src = this._link;
    this._image.alt = this._name;

    this._setEventListeners();

    return this._elementTemplate;
  }

  _setEventListeners() {
    this._removeButton.addEventListener("click", () => {
      this._delClickHandler();
    });

    this._image.addEventListener("click", () => {
      openPopupViewImage(this._image);
    });

    this._likeButton.addEventListener("click", () => {
      this._likeClickHandler();
    });
  }
}
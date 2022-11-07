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

  constructor({ card, cardSelector, handleCardClick, confirmsDeletion, setLikes, deleteLikes, mainId }) {
    this._card = card;
    this._link = card.link;
    this._name = card.name;
    this._idCard = card._id;
    this._likes = card.likes;
    this._template = cardSelector;
    this._handleCardClick = handleCardClick;
    this._confirmsDeletion = confirmsDeletion;
    this._deleteLikes = deleteLikes;
    this._setLikes = setLikes;
    this._mainId = mainId;
  }

  _delClickHandler() {
    this._confirmsDeletion({ idCard: this._idCard, card: this });
  }

  _likeClickHandler() {
    if (!this._likeButton.classList.contains('element__like-button_active')) {
      this._setLikes(this._idCard, this);
    } else {
      this._deleteLikes(this._idCard, this);
    }
  }

  resultClickLike(res) {
    this._numberLikes.textContent = res.likes.length;
    this._likeButton.classList.toggle('element__like-button_active');
  }

  resultClickDeleteCard() {
    this._elementTemplate.remove();
    this._elementTemplate = null;
  }

  generateCard() {
    this._cloneTemplateElement = document.querySelector(this._template).content.cloneNode(true);
    this._elementTemplate = this._cloneTemplateElement.querySelector('.element');
    this._title = this._elementTemplate.querySelector('.element__title');
    this._image = this._elementTemplate.querySelector('.element__mask-group');
    this._removeButton = this._elementTemplate.querySelector('.element__button-remove');
    this._likeButton = this._elementTemplate.querySelector('.element__like-button');
    this._numberLikes = this._elementTemplate.querySelector('.element__number-likes');

    this._title.textContent = this._name;

    this._image.src = this._link;
    this._image.alt = this._name;

    this._checkLikeCard();
    this._checkOwnerCard();

    this._setEventListeners();

    return this._elementTemplate;
  }

  _checkLikeCard() {
    this._mainUser = this._likes.some((like) => {
      return like._id === this._mainId;
    });

    this._numberLikes.textContent = this._likes.length;

    if (this._mainUser) {
      this._likeButton.classList.add('element__like-button_active');
    }
  }

  _checkOwnerCard() {
    if (this._mainId !== this._card.owner._id) {
      this._removeButton.remove();
    }
  }

  _setEventListeners() {
    this._removeButton.addEventListener('click', () => {
      this._delClickHandler();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', () => {
      this._likeClickHandler();
    });
  }
}

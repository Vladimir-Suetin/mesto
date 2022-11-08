export default class Card {
  constructor({ card, cardSelector, handleCardClick, confirmsDeletion, setLikes, deleteLikes, userId }) {
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
    this._userId = userId;
  }

  _handleDeleteClick() {
    this._confirmsDeletion({ card: this });
  }

  getIdCard() {
    return this._idCard;
  }

  _handleLikeClick() {
    if (!this._likeButton.classList.contains('element__like-button_active')) {
      this._setLikes(this._idCard, this);
    } else {
      this._deleteLikes(this._idCard, this);
    }
  }

  handleLikeButton(dataLikes) {
    this._checkLikeCard(dataLikes);
  }

  deleteCard() {
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

    this._checkLikeCard(this._likes);
    this._checkOwnerCard();

    this._setEventListeners();

    return this._elementTemplate;
  }

  _checkLikeCard(data) {
    this._isLikedByUser = data.some((like) => {
      return like._id === this._userId;
    });

    this._numberLikes.textContent = data.length;

    if (this._isLikedByUser && !this._likeButton.classList.contains('element__like-button_active')) {
      this._likeButton.classList.add('element__like-button_active');
    } else {
      this._likeButton.classList.remove('element__like-button_active');
    }
  }

  _checkOwnerCard() {
    if (this._userId !== this._card.owner._id) {
      this._removeButton.remove();
    }
  }

  _setEventListeners() {
    this._removeButton.addEventListener('click', () => {
      this._handleDeleteClick();
    });

    this._image.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });
  }
}

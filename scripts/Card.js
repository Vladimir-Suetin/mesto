// Массив с карточками
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

class Card {
  constructor(array, cardSelector) {
    this._name = array.name;
    this._link = array.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const getElementTemlate = document.querySelector(this._cardSelector).template.content.cloneNode(true);
    return getElementTemlate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._title = this.element.querySelector(selectors.templateTitleImageCard);
    this._link = this.element.querySelector(selectors.temlateLinkImageCard);
    this._elementButtonRemove = this.element.querySelector(selectors.templateElementButtonRemove);
    this._templateLikeButton = this.element.querySelector(selectors.templateLikeButton);

    this._title.textContent = this._name;
    this._link.src = this._link;
    this._link.alt = this._name;

    this._link.addEventListener("click", openPopupViewImage);

    this._elementButtonRemove.addEventListener("click", handleRemoveElement);

    this._templateLikeButton.addEventListener("click", handleAddLikePhoto);

    return this._element;
  }
}

// Функция перебирает клонирует массив и вставляет в разметку
function cloneArrayPhotoCards() {
  const array = initialCards.map((newArray) => getElement(newArray));

  listCardPhotoGrid.prepend(...array);
}

// Функция работы с элементами template photo cards
function getElement(item) {
  const getElementTemlate = template.content.cloneNode(true);
  const title = getElementTemlate.querySelector(selectors.templateTitleImageCard);
  const link = getElementTemlate.querySelector(selectors.temlateLinkImageCard);
  const elementButtonRemove = getElementTemlate.querySelector(selectors.templateElementButtonRemove);
  const templateLikeButton = getElementTemlate.querySelector(selectors.templateLikeButton);

  title.textContent = item.name;

  link.setAttribute("src", `${item.link}`);
  link.setAttribute("alt", `${item.name}`);

  link.addEventListener("click", () => openPopupViewImage(item));

  elementButtonRemove.addEventListener("click", handleRemoveElement);

  templateLikeButton.addEventListener("click", handleAddLikePhoto);

  return getElementTemlate;
}

// Функция добавления новой карточки
function handleAddNewImage(evt) {
  evt.preventDefault();

  const nameValue = popupImageNameInput.value;
  const linkValue = popupImageLinkInput.value;

  const element = getElement({ name: nameValue, link: linkValue });

  listCardPhotoGrid.prepend(element);

  popupFormAddImage.reset();

  closePopupAddImage();
}

// Функция удаления карточки
function handleRemoveElement(evt) {
  const element = evt.target.closest(selectors.templateElement);
  element.remove();
}

// Функция like
function handleAddLikePhoto(evt) {
  const element = evt.target.closest(selectors.templateLikeButton);
  element.classList.toggle("element__like-button_active");
}

// Вызывает функцию добавления карточки
popupFormAddImage.addEventListener("submit", handleAddNewImage);

// Вызывает функцию работы с массивом
cloneArrayPhotoCards();

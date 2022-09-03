import Card from './Card.js';
import CardsList from './CardsList.js';
import {selectors, profile, profileName, profilejob, profileEditButton, popupEditProfile,
  popupProfileNameInput, popupProfileJobInput, listCardPhotoGrid, popupAddImage, imageAddButton,
  popupImageNameInput, popupImageLinkInput, templateCard, templateCardElement, templateTitleImageCard,
  templateLinkImageCard, popupViewImage, popupFormAddImage, popupFormEditProfile} from './constants.js'

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

const proba = {
  name: "АрAPAP",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
};

// Функция открытия popup
function openPopup(item) {
  item.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

// Функция закрытия popup
function closePopup(item) {
  item.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

// Функция закрытия popup при нажатии на внешнюю область
function closePopupByClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

// Функция закрытия попап при нажатии escape
function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Функция открытия popup profile
function openPopupProfile() {
  openPopup(popupEditProfile);
  popupProfileNameInput.value = profileName.textContent;
  popupProfileJobInput.value = profilejob.textContent;
}

// Функция закрытия popup profile
function closePopupProfile() {
  closePopup(popupEditProfile);
}

// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function handleFormSubmirProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Вставляем новые значения с помощью textContent
  profileName.textContent = popupProfileNameInput.value;
  profilejob.textContent = popupProfileJobInput.value;

  closePopupProfile();
}

// Функция открытия popup add image
function openPopupAddImage() {
  openPopup(popupAddImage);
}

// Функция закрытия popup add image
function closePopupAddImage() {
  closePopup(popupAddImage);
}

// Функция открытия popup view image
function openPopupViewImage(item) {
  openPopup(popupViewImage);

  popupImage.src = item.src;
  popupImage.alt = item.alt;

  popupImageName.textContent = popupImage.alt;
}

// Функция закрытия popup view image
function closePopupViewImage() {
  closePopup(popupViewImage);
}

// Функция перебирает клонирует массив и вставляет в разметку
// function cloneArrayPhotoCards() {
//   const array = initialCards.map((newArray) => getElement(newArray));

//   listCardPhotoGrid.prepend(...array);
// }

// Функция работы с элементами template photo cards
// function getElement(item) {
//   const getElementTemplate = template.content.cloneNode(true);
//   const title = getElementTemplate.querySelector(selectors.templateTitleImageCard);
//   const link = getElementTemplate.querySelector(selectors.templateLinkImageCard);
//   const elementButtonRemove = getElementTemplate.querySelector(selectors.templateElementButtonRemove);
//   const templateLikeButton = getElementTemplate.querySelector(selectors.templateLikeButton);

//   title.textContent = item.name;

//   link.setAttribute("src", `${item.link}`);
//   link.setAttribute("alt", `${item.name}`);

//   link.addEventListener("click", () => openPopupViewImage(item));

//   elementButtonRemove.addEventListener("click", handleRemoveElement);

//   templateLikeButton.addEventListener("click", handleAddLikePhoto);

//   return getElementTemplate;
//  }

// class ListCards {
//   constructor(data, itemTemlate, domElement) {
//     this._data = data;
//     this._itemTemplate = itemTemlate;
//     this._domElement = domElement;

//   }

//   // getCards() {
//   //   this._data.forEach((item) => {
//   //     generateCard(item);
//   //   });
//   // }

//   setCards() {
//     const card = new Card(this._data, this._itemTemplate);
//     const result = card.generateCard();
//     this._domElement.prepend(result);
//   }
// }

// class CreateCards {
//   constructor(card) {
//     this._card = card;
//   }

// _renderCards() {
// return card.map(array => new Card(array))
// }

// }




const cards = new CardsList(initialCards, listCardPhotoGrid, templateCard, selectors);
cards.sortCard();
// initialCards.forEach((element) => {
//   cards.addCard(element);
// })

//  const card = new Card(trtrt, templateCard, selectors);
//  const generateCard = card.generateCard();
//  listCardPhotoGrid.prepend(generateCard);



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
// function handleRemoveElement(evt) {
//   const element = evt.target.closest(selectors.templateElement);
//   element.remove();
// }

// Функция like
// function handleAddLikePhoto(evt) {
//   const element = evt.target.closest(selectors.templateLikeButton);
//   element.classList.toggle("element__like-button_active");
// }

// Функция обработки всех popup, вызова функций анимации и закрития при нажатии на внешнюю область
function sortPopup() {
  const popupList = document.querySelectorAll(selectors.popup);
  popupList.forEach((popup) => {
    const buttonClosePopup = popup.querySelector(selectors.popupCloseButton);
    buttonClosePopup.addEventListener("click", () => closePopup(popup));
    popup.addEventListener("mousedown", closePopupByClickOverlay);
  });
}

// Вызывает функцию добавления карточки
popupFormAddImage.addEventListener("submit", handleAddNewImage);

// Вызывает функцию редактирования popup
popupFormEditProfile.addEventListener("submit", handleFormSubmirProfile);

// Вызывает функцию открытия popup profile при прослушивании click
profileEditButton.addEventListener("click", openPopupProfile);

// Вызывает функцию открытия popup add image при прослушивании click
imageAddButton.addEventListener("click", openPopupAddImage);

// Вызывает функцию работы с массивом
// cloneArrayPhotoCards();

// Вызывает функцию обработки popup
sortPopup();

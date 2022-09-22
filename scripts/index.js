import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  selectors,
  objectValidation,
  profile,
  profileName,
  profilejob,
  profileEditButton,
  popupEditProfile,
  popupProfileNameInput,
  popupProfileJobInput,
  listCardPhotoGrid,
  popupAddImage,
  imageAddButton,
  popupImageNameInput,
  popupImageLinkInput,
  popupViewImage,
  popupImage,
  popupImageName,
  popupFormAddImage,
  popupFormEditProfile,
  initialCards,
} from "../utils/constants.js";

const cardElementFormValidator = new FormValidator(objectValidation, popupFormAddImage);
const profileElementFormValidator = new FormValidator(objectValidation, popupFormEditProfile);

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
  profileElementFormValidator.enableValidation();
}

// Функция закрытия popup profile
function closePopupProfile() {
  closePopup(popupEditProfile);
  profileElementFormValidator.resetValidation();
}

// Функция открытия popup add image
function openPopupAddImage() {
  openPopup(popupAddImage);
  cardElementFormValidator.enableValidation();
}

// Функция закрытия popup add image
function closePopupAddImage() {
  closePopup(popupAddImage);
  cardElementFormValidator.resetValidation();
}

// Функция открытия popup view image
function openPopupViewImage(element) {
  openPopup(popupViewImage);

  popupImage.src = element.src;
  popupImage.alt = element.alt;

  popupImageName.textContent = popupImage.alt;
}

// Функция обработки всех popup, вызова функций анимации и закрытия при нажатии на внешнюю область
function sortPopup() {
  const popupList = document.querySelectorAll(selectors.popup);
  popupList.forEach((popup) => {
    const buttonClosePopup = popup.querySelector(selectors.popupCloseButton);
    buttonClosePopup.addEventListener("click", () => closePopup(popup));
    popup.addEventListener("mousedown", closePopupByClickOverlay);
  });
}

// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function handleSubmitFormProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Вставляем новые значения с помощью textContent
  profileName.textContent = popupProfileNameInput.value;
  profilejob.textContent = popupProfileJobInput.value;

  closePopupProfile();
}

// Функция обработки карточек из массива
function sortCards(cards) {
  cards.forEach((element) => {
    createCard(element);
  });
}

// Функция создания карточки
function createCard(element) {
  const cardElement = new Card(element, selectors.templateCard, openPopupViewImage);
  addCards(cardElement.generateCard());
}

// Функция добавления карточек
function addCards(cardElements) {
  listCardPhotoGrid.prepend(cardElements);
}


// Функция обработчик события при создании новой карточки
function handleSubmitAddImage(evt) {
  evt.preventDefault();

  addNewCard();

  popupFormAddImage.reset();

  closePopupAddImage();
}

// Функция добавления новой карточки
function addNewCard() {
  const nameValue = popupImageNameInput.value;
  const linkValue = popupImageLinkInput.value;
  const cardValue = { name: nameValue, link: linkValue };

  const element = new Card(cardValue, selectors.templateCard, openPopupViewImage);

  listCardPhotoGrid.prepend(element.generateCard());
}

// Вызывает функцию обработки popup
sortPopup();

// Вызывает функцию обработки карточек
sortCards(initialCards);

// Вызывает функцию редактирования popup
popupFormEditProfile.addEventListener("submit", handleSubmitFormProfile);

// Вызывает функцию добавления карточки
popupAddImage.addEventListener("submit", handleSubmitAddImage);

// Вызывает функцию открытия popup profile при прослушивании click
profileEditButton.addEventListener("click", openPopupProfile);

// Вызывает функцию открытия popup add image при прослушивании click
imageAddButton.addEventListener("click", openPopupAddImage);

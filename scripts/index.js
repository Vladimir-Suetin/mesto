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

const addCardFormValidator = new FormValidator(objectValidation, popupAddImage);
const editProfileFormValidator = new FormValidator(objectValidation, popupEditProfile);

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
  editProfileFormValidator.enableValidation();
}

// Функция закрытия popup profile
function closePopupProfile() {
  closePopup(popupEditProfile);
  editProfileFormValidator.resetValidation();
}

// Функция открытия popup add image
function openPopupAddImage() {
  openPopup(popupAddImage);
  addCardFormValidator.enableValidation();
}

// Функция закрытия popup add image
function closePopupAddImage() {
  closePopup(popupAddImage);
  addCardFormValidator.resetValidation();
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

// Функция обработки карточек
function sortCards() {
  initialCards.forEach((element) => {
    addCards(element);
  });
}

// Функция добавления карточек из массива
function addCards(element) {
  const cardElement = new Card(element, selectors.templateCard, openPopupViewImage);
  listCardPhotoGrid.prepend(cardElement.generateCard());
}

// Функция обработчик события при создании новой карточки
function handleSubmitAddImage(evt) {
  evt.preventDefault();

  addNewCard();

  popupFormAddImage.reset();

  closePopupAddImage();

  getTemplateImage();
}

// Функция добавления новой карточки
function addNewCard() {
  const nameValue = popupImageNameInput.value;
  const linkValue = popupImageLinkInput.value;
  const cardValue = { name: nameValue, link: linkValue };

  const element = new Card(cardValue, selectors.templateCard);

  listCardPhotoGrid.prepend(element.generateCard());
}

// // Функция обработки нажатия для просмотра изображения
// function getTemplateImage() {
//   const images = document.querySelectorAll(selectors.templateLinkImageCard);

//   images.forEach((element) => {
//     element.addEventListener("click", (evt) => {
//       openPopupViewImage(evt.currentTarget);
//     });
//   });
// }

// Вызывает функцию обработки popup
sortPopup();

// Вызывает функцию обработки карточек
sortCards();

// Вызывает функцию обработчика view image popup
// getTemplateImage();

// Вызывает функцию редактирования popup
popupFormEditProfile.addEventListener("submit", handleSubmitFormProfile);

// Вызывает функцию добавления карточки
popupAddImage.addEventListener("submit", handleSubmitAddImage);

// Вызывает функцию открытия popup profile при прослушивании click
profileEditButton.addEventListener("click", openPopupProfile);

// Вызывает функцию открытия popup add image при прослушивании click
imageAddButton.addEventListener("click", openPopupAddImage);

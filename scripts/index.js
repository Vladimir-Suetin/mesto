import CardForm from "./CardForm.js";
import CardsList from "./CardsList.js";
import {
  selectors,
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
  templateCard,
  templateCardElement,
  templateTitleImageCard,
  templateLinkImageCard,
  popupViewImage,
  popupImage,
  popupImageName,
  popupFormAddImage,
  popupFormEditProfile,
  initialCards,
} from "./constants.js";

const cards = new CardsList(initialCards, listCardPhotoGrid, templateCard, selectors);

const cardForm = new CardForm(
  selectors,
  templateCard,
  popupImageNameInput,
  popupImageLinkInput,
  listCardPhotoGrid,
  popupFormAddImage,
  closePopupAddImage,
  getTemplateImage,
);

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
function openPopupViewImage(element) {
  openPopup(popupViewImage);

  popupImage.src = element.src;
  popupImage.alt = element.alt;

  popupImageName.textContent = popupImage.alt;
}

// Функция обработки нажатия для просмотра изображения
function getTemplateImage() {
  const images = document.querySelectorAll(selectors.templateLinkImageCard);

  images.forEach((element) => {
    element.addEventListener("click", (evt) => {
      openPopupViewImage(evt.currentTarget);
    });
  });
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


// Вызывает функцию редактирования popup
popupFormEditProfile.addEventListener("submit", handleFormSubmirProfile);

// Вызывает функцию открытия popup profile при прослушивании click
profileEditButton.addEventListener("click", openPopupProfile);

// Вызывает функцию открытия popup add image при прослушивании click
imageAddButton.addEventListener("click", openPopupAddImage);

// Вызывает функцию обработки popup
sortPopup();

// Вызывает метод создания карточек
cards.sortCard();

// Вызывает метод слушателя submit при создании новой карточки
cardForm.eventListener();

// Вызывает функцию обработчика view image popup
getTemplateImage();

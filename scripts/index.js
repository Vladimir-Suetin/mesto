// Cелекторы
const selectors = {
  profile: '.profile',
  profileName: '.profile__name',
  profilejob: '.profile__job',
  profileEditButton: '.profile__edit-button',
  popupEditProfile: '.popup_edit_profile',
  popupProfileNameInput: '.popup__name_value',
  popupProfileJobInput: '.popup__job_value',
  closePopupButton: '.popup__close-icon',
  listCardPhotoGrid: '.cards__photo-grid',
  popupAddImage: '.popup_add_image',
  popupImageNameInput: '.popup__name-image',
  popupImageLinkInput: '.popup__link-image',
  imageAddButton: '.profile__add-button',
  template: '.template-list',
  templateItemList: '.element',
}

// Поиск элементов в документе

const profile = document.querySelector(selectors.profile);
const profileName = profile.querySelector(selectors.profileName);
const profilejob = profile.querySelector(selectors.profilejob);
const profileEditButton = profile.querySelector(selectors.profileEditButton);
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupProfileNameInput = popupEditProfile.querySelector(selectors.popupProfileNameInput);
const popupProfileJobInput = popupEditProfile.querySelector(selectors.popupProfileJobInput);
const closeButtonProfilePopup = popupEditProfile.querySelector(selectors.closePopupButton);
const listCardPhotoGrid = document.querySelector(selectors.listCardPhotoGrid);
const popupAddImage = document.querySelector(selectors.popupAddImage);
const popupImageNameInput = popupAddImage.querySelector(selectors.popupImageNameInput);
const popupImageLinkInput = popupAddImage.querySelector(selectors.popupImageLinkInput);
const closeButtonImagePopup = popupAddImage.querySelector(selectors.closePopupButton);
const template = document.querySelector(selectors.template);
const elementCardsPhoto = template.querySelector(selectors.template);

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

// Функция открытия popup
function openPopup(item) {
  item.classList.add("popup_opened");
}

// Функция закрытия popup
function closePopup(item) {
  item.classList.remove("popup_opened");
}

// Функция закрытия popup при нажатии на внешнюю область
function closePopupByClickOverlay(event) {
  if ((event.target === event.currentTarget) && 
  (popupEditProfile.classList.contains('popup_opened'))) {
    closePopupProfile();
  } else if ((event.target === event.currentTarget) && 
  (popupAddImage.classList.contains('popup_opened'))) {
    return; // необходимо вписать функцию закрытия 
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



//Вызывает функцию открытия popup profile при прослушивании click
profileEditButton.addEventListener("click", openPopupProfile);

//Вызывает функцию закрытия popup profile при прослушивании click
closeButtonProfilePopup.addEventListener("click", closePopupProfile);

// Будет следить за событием “submit” - «отправка» формы редактирования профиля
popupEditProfile.addEventListener("submit", handleFormSubmirProfile);

// Будет следить за нажатием на внешнюю область popup
popupEditProfile.addEventListener('click', closePopupByClickOverlay);







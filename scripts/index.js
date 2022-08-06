// Cелекторы
const selectors = {
  profile: ".profile",
  profileName: ".profile__name",
  profilejob: ".profile__job",
  profileEditButton: ".profile__edit-button",
  popupEditProfile: ".popup_edit_profile",
  popupProfileNameInput: ".popup__name_value",
  popupProfileJobInput: ".popup__job_value",
  popupCloseButton: ".popup__close-icon",
  listCardPhotoGrid: ".cards__photo-grid",
  popupAddImage: ".popup_add_image",
  popupImageNameInput: ".popup__name-image",
  popupImageLinkInput: ".popup__link-image",
  imageAddButton: ".profile__add-button",
  template: ".template-list",
  templateElement: ".element",
  templateTitleImageCard: ".element__title",
  temlateLinkImageCard: ".element__mask-group",
  templateElementButtonRemove: ".element__button-remove",
  templateLikeButton: ".element__like-button",
  popupViewImage: ".popup_view_image",
  popupImage: ".popup__image",
  popupImageName: ".popup__image-title",
  popup: ".popup",
  popupForm: ".popup__container",
  popupFormAddImage: ".popup__container_add-image",
  popupFormEditProfile: ".popup__container_edit-profile",
  popupFieldError: "popup__field_error",
  popupSubmitButton: ".popup__submit-button",
};

// Поиск элементов в документе
const profile = document.querySelector(selectors.profile);
const profileName = profile.querySelector(selectors.profileName);
const profilejob = profile.querySelector(selectors.profilejob);
const profileEditButton = profile.querySelector(selectors.profileEditButton);
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupProfileNameInput = popupEditProfile.querySelector(selectors.popupProfileNameInput);
const popupProfileJobInput = popupEditProfile.querySelector(selectors.popupProfileJobInput);
const listCardPhotoGrid = document.querySelector(selectors.listCardPhotoGrid);
const popupAddImage = document.querySelector(selectors.popupAddImage);
const imageAddButton = profile.querySelector(selectors.imageAddButton);
const popupImageNameInput = popupAddImage.querySelector(selectors.popupImageNameInput);
const popupImageLinkInput = popupAddImage.querySelector(selectors.popupImageLinkInput);
const template = document.querySelector(selectors.template);
const templateElement = document.querySelector(selectors.templateElement);
const templateTitleImageCard = template.querySelector(selectors.templateTitleImageCard);
const temlateLinkImageCard = template.querySelector(selectors.temlateLinkImageCard);
const popupViewImage = document.querySelector(selectors.popupViewImage);
const popupImage = popupViewImage.querySelector(selectors.popupImage);
const popupImageName = popupViewImage.querySelector(selectors.popupImageName);
const popupFormAddImage = popupAddImage.querySelector(selectors.popupFormAddImage);
const popupFormEditProfile = popupEditProfile.querySelector(selectors.popupFormEditProfile);

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
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

// Функция закрытия попап при нажатии escape
function closePopupByPressEsc(event) {
  if (event.key === "Escape") {
    closePopup(event.currentTarget);
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

  popupImage.src = item.link;
  popupImage.alt = item.name;

  popupImageName.textContent = popupImage.alt;
}

// Функция закрытия popup view image
function closePopupViewImage() {
  closePopup(popupViewImage);
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

// Функция обработки всех popup, вызова функций анимации и закрития при нажатии на внешнюю область
function sortPopup() {
  const popupList = document.querySelectorAll(selectors.popup);
  popupList.forEach((popup) => {
    const buttonClosePopup = popup.querySelector(selectors.popupCloseButton);
    buttonClosePopup.addEventListener("click", () => closePopup(popup));
    popup.addEventListener("keydown", closePopupByPressEsc);
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
cloneArrayPhotoCards();

// Вызывает функцию обработки popup
sortPopup();

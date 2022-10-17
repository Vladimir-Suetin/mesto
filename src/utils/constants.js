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
  templateCard: ".template-list",
  templateCardElement: ".element",
  templateTitleImageCard: ".element__title",
  templateLinkImageCard: ".element__mask-group",
  templateElementButtonRemove: ".element__button-remove",
  templateLikeButton: ".element__like-button",
  popup: ".popup",
  popupFormAddImage: ".popup__container_add-image",
  popupFormEditProfile: ".popup__container_edit-profile",
  popupFieldError: "popup__field_error",
  popupSubmitButton: ".popup__submit-button",
};

// Поиск элементов в документе
const profile = document.querySelector(selectors.profile);
const profileEditButton = profile.querySelector(selectors.profileEditButton);
const popupEditProfile = document.querySelector(selectors.popupEditProfile);
const popupAddImage = document.querySelector(selectors.popupAddImage);
const imageAddButton = profile.querySelector(selectors.imageAddButton);
const popupFormAddImage = popupAddImage.querySelector(selectors.popupFormAddImage);
const popupFormEditProfile = popupEditProfile.querySelector(selectors.popupFormEditProfile);

const objectValidation = {
  formSelector: ".popup__container",
  inputSelector: ".popup__field",
  errorSelector: ".popup__error",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_disabled",
  inputErrorClass: "popup__field_type_error",
};

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

export {
  selectors,
  objectValidation,
  profileEditButton,
  popupEditProfile,
  imageAddButton,
  popupFormAddImage,
  popupFormEditProfile,
  initialCards,
};

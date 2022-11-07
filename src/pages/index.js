import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  selectors,
  objectValidation,
  profileEditButton,
  imageAddButton,
  popupFormAddImage,
  popupFormEditProfile,
  popupFormEditAvatar,
  editAvatarButton,
} from '../utils/constants.js';

// Id пользователя
let userId;

const cardElementFormValidator = new FormValidator(objectValidation, popupFormAddImage);
const profileElementFormValidator = new FormValidator(objectValidation, popupFormEditProfile);
const avatarFormValidator = new FormValidator(objectValidation, popupFormEditAvatar);
const popupAddImage = new PopupWithForm({
  selector: '.popup_add_image',
  submitForm: handleSubmitAddImage,
});
const popupViewImage = new PopupWithImage({ selector: '.popup_view_image' });
const popupWithConfirmation = new PopupWithConfirmation({ selector: '.popup_delete_card' });
const popupEditProfile = new PopupWithForm({
  selector: '.popup_edit_profile',
  submitForm: handleSubmitFormProfile,
});
const popupEditAvatar = new PopupWithForm({
  selector: '.popup_avatar',
  submitForm: handleSubmitFormEditAvatar,
});
const profileInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorInfo: '.profile__job',
  selectorAvatar: '.profile__avatar',
});
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: { authorization: '6692dfb4-7777-450f-b6ba-68fb20b8c9ff', 'Content-Type': 'application/json' },
});
const cardSection = new Section(
  {
    renderer: createCard,
  },
  '.cards__photo-grid'
);

// Промис рендеринга карточек и данных пользователя
Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cardsData, userData]) => {
    const { name, about: job, avatar, _id } = userData;

    userId = _id;

    profileInfo.setUserInfo({ name, job, avatar });

    // Вызывает метод сортировки карточек
    cardSection.renderItems(cardsData);
  })
  .catch((err) => api.serverResponseError(err));

// Функция открытия popup profile
function openPopupProfile() {
  const profileData = profileInfo.getUserInfo();

  popupEditProfile.setInputValues(profileData);

  popupEditProfile.open();

  popupEditProfile.editSubmitButtonText(submitButtonLoading);
}

// Функция открытия popup add image
function openPopupAddImage() {
  popupAddImage.open();

  popupAddImage.editSubmitButtonText(submitButtonLoading);
}

// Функция закрытия popup add image
function closePopupAddImage() {
  popupAddImage.close();

  cardElementFormValidator.resetValidation();
}

function openPopupEditAvatar() {
  popupEditAvatar.open();
  popupEditAvatar.setEventListeners();
  popupEditAvatar.editSubmitButtonText(submitButtonLoading);
}

function closePopupEditAvatar() {
  avatarFormValidator.resetValidation();
  popupEditAvatar.close();
}

// Функция открытия popup view image
function handleCardClick(data) {
  popupViewImage.open(data);
}

// Функция открытия popup с подтверждением удаления карточки
function confirmsDeletion(data) {
  popupWithConfirmation.open();
  popupWithConfirmation.setEventListeners(data);
  popupWithConfirmation.setCallback(handleDeleteCard);
  popupWithConfirmation.editSubmitButtonText(submitButtonLoading);
}

function handleSubmitFormProfile({ evt, objectValue, submitButton, popup }) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  api
    .editUserInfo(objectValue)
    .then(() => {
      profileInfo.setUserInfo(objectValue);

      popupEditProfile.close();

      profileElementFormValidator.resetValidation();
    })
    .catch((err) => api.serverResponseError(err))
    .finally(() => removesubmitButtonLoading(submitButton, popup));
}

function setLikes(idCard, cards) {
  return api
    .setLikes(idCard)
    .then((res) => {
      const dataLikes = res.likes;
      cards.handleLikeButton(dataLikes);
    })
    .catch((err) => api.serverResponseError(err));
}

function deleteLikes(idCard, cards) {
  return api
    .deleteLikes(idCard)
    .then((res) => {
      const dataLikes = res.likes;
      cards.handleLikeButton(dataLikes);
    })
    .catch((err) => api.serverResponseError(err));
}

function handleDeleteCard({ data, submitButton, popup }) {
  const { idCard, card } = data;
  return api
    .deleteCard(idCard)
    .then(() => {
      popupWithConfirmation.close();
      card.deleteCard();
    })
    .catch((err) => api.serverResponseError(err))
    .finally(() => removesubmitButtonLoading(submitButton, popup));
}

function submitButtonLoading(submitButton) {
  //const button = element.querySelector('.popup__submit-button');
  // const aaa = button.textContent;
  // console.log(aaa)
  submitButton.textContent = 'Сохранение...';
}

function removesubmitButtonLoading(submitButton, popup) {
  setTimeout(() => {
    if (popup.classList.contains('popup_delete_card')) {
      submitButton.textContent = 'Да';
    } else {
      submitButton.textContent = 'Сохранить';
    }
  }, 600);
}

function handleSubmitFormEditAvatar({ evt, objectValue, submitButton, popup }) {
  evt.preventDefault();
  return api
    .changeAvatar(objectValue)
    .then((res) => {
      profileInfo.setAvatar(res.avatar);
      closePopupEditAvatar();
    })
    .catch((err) => api.serverResponseError(err))
    .finally(() => removesubmitButtonLoading(submitButton, popup));
}

// Функция создания карточки
function createCard(element) {
  const cardElement = new Card({
    card: element,
    cardSelector: selectors.templateCard,
    handleCardClick,
    confirmsDeletion,
    setLikes,
    deleteLikes,
    userId,
  });

  const result = cardElement.generateCard();

  return result;
}

// Функция обработчик события при создании новой карточки
function handleSubmitAddImage({ evt, objectValue, submitButton, popup }) {
  evt.preventDefault();

  const { name_image: name, link_image: link } = objectValue;

  api
    .addNewCard({ name, link })
    .then((res) => {
      cardSection.addItem(res);

      closePopupAddImage();
    })
    .catch((err) => api.serverResponseError(err))
    .finally(() => removesubmitButtonLoading(submitButton, popup));
}

// Вызывает метод валидации профиля
profileElementFormValidator.enableValidation();

// Вызывает метод валидации карточки
cardElementFormValidator.enableValidation();

// Вызывает метод валидации аватара
avatarFormValidator.enableValidation();

// Вызывает метод прослушивания событий для popupEditProfile
popupEditProfile.setEventListeners();

// Вызывает метод прослушивания событий для popupAddImage
popupAddImage.setEventListeners();

// Вызывает метод прослушивания событий для popupViewImage
popupViewImage.setEventListeners();

// Вызывает функцию открытия popup profile при прослушивании click
profileEditButton.addEventListener('click', openPopupProfile);

// Вызывает функцию открытия popup add image при прослушивании click
imageAddButton.addEventListener('click', openPopupAddImage);

// Вызывает функцию открытия popup edit avatar при прослушивании click
editAvatarButton.addEventListener('click', openPopupEditAvatar);

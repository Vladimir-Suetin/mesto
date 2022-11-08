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
  .catch((err) => api.logResponseError(err));

// Функция открытия popup profile
function openPopupProfile() {
  const profileData = profileInfo.getUserInfo();

  popupEditProfile.setInputValues(profileData);

  popupEditProfile.open();
}

// Функция открытия popup add image
function openPopupAddImage() {
  popupAddImage.open();
}

// Функция закрытия popup add image
function closePopupAddImage() {
  popupAddImage.close();

  cardElementFormValidator.resetValidation();
}

// Функция открытия popup avatar
function openPopupEditAvatar() {
  popupEditAvatar.open();
}

// Функция закрытия popup avatar
function closePopupEditAvatar() {
  avatarFormValidator.resetValidation();

  popupEditAvatar.close();
}

// Функция открытия popup view image
function handleCardClick(data) {
  popupViewImage.open(data);
}

// Функция открытия popup с подтверждением удаления карточки
function confirmsDeletion(dataCard) {
  popupWithConfirmation.open();
  popupWithConfirmation.setCallback(() => {
    handleDeleteCard(dataCard);
  });
}

// Функция обработчик сабмита формы профиля
function handleSubmitFormProfile({ objectValue }) {
  const { name, job: about } = objectValue;

  renameButtonSaving(popupEditProfile);

  api
    .editUserInfo({ name, about })
    .then((res) => {
      const { name, about: job, avatar } = res;
      profileInfo.setUserInfo({ name, job, avatar });

      popupEditProfile.close();

      profileElementFormValidator.resetValidation();
    })
    .catch((err) => api.logResponseError(err))
    .finally(() => renameButtonSave(popupEditProfile));
}

// Функция обработчик клика формы удаления карточки
function handleDeleteCard(dataCard) {
  const idCard = dataCard.getIdCard();
  renameButtonSaving(popupWithConfirmation);
  return api
    .deleteCard(idCard)
    .then(() => {
      popupWithConfirmation.close();
      dataCard.deleteCard();
    })
    .catch((err) => api.logResponseError(err))
    .finally(() => renameButtonYes(popupWithConfirmation));
}

// Функция обработчик сабмита формы изменения аватара
function handleSubmitFormEditAvatar({ objectValue }) {
  renameButtonSaving(popupEditAvatar);

  return api
    .changeAvatar(objectValue)
    .then((res) => {
      const { name, about: job, avatar } = res;
      profileInfo.setUserInfo({ name, job, avatar });
      closePopupEditAvatar();
    })
    .catch((err) => api.logResponseError(err))
    .finally(() => renameButtonSave(popupEditAvatar));
}

// Функция обработчик события при создании новой карточки
function handleSubmitAddImage({ objectValue }) {
  const { image: name, link } = objectValue;

  renameButtonSaving(popupAddImage);

  api
    .addNewCard({ name, link })
    .then((res) => {
      cardSection.addItem(res);

      closePopupAddImage();
    })
    .catch((err) => api.logResponseError(err))
    .finally(() => renameButtonSave(popupAddImage));
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

// Функция установки лайка
function setLikes(dataCard) {
  const idCard = dataCard.getIdCard();
  return api
    .setLikes(idCard)
    .then((res) => {
      const dataLikes = res.likes;
      dataCard.updateLikes(dataLikes);
    })
    .catch((err) => api.logResponseError(err));
}

// Функция удаления лайка
function deleteLikes(dataCard) {
  const idCard = dataCard.getIdCard();
  return api
    .deleteLikes(idCard)
    .then((res) => {
      const dataLikes = res.likes;
      dataCard.updateLikes(dataLikes);
    })
    .catch((err) => api.logResponseError(err));
}

// Функция изменения текста кнопки
function renameButtonSave(instance) {
  setTimeout(() => {
    instance.setSubmitButtonText('Сохранить');
  }, 600);
}

// Функция изменения текста кнопки
function renameButtonSaving(instance) {
  instance.setSubmitButtonText('Сохранение...');
}

// Функция изменения текста кнопки
function renameButtonYes(instance) {
  setTimeout(() => {
    instance.setSubmitButtonText('Да');
  }, 600);
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

// Вызывает метод прослушивания событий для редактирования аватара
popupEditAvatar.setEventListeners();

// Вызывает метод прослушивания событий для подтверждения удаления
popupWithConfirmation.setEventListeners();

// Вызывает функцию открытия popup profile при прослушивании click
profileEditButton.addEventListener('click', openPopupProfile);

// Вызывает функцию открытия popup add image при прослушивании click
imageAddButton.addEventListener('click', openPopupAddImage);

// Вызывает функцию открытия popup edit avatar при прослушивании click
editAvatarButton.addEventListener('click', openPopupEditAvatar);

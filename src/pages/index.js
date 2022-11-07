import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupEditAvatar from '../components/PopupEditAvatar.js';
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
let mainId;

const cardElementFormValidator = new FormValidator(objectValidation, popupFormAddImage);
const profileElementFormValidator = new FormValidator(objectValidation, popupFormEditProfile);
const avatarFormValidator = new FormValidator(objectValidation, popupFormEditAvatar)
const popupEditImage = new PopupWithForm({ selector: '.popup_add_image', submitForm: handleSubmitAddImage }); // отредактировать наименование !!!
const popupViewImage = new PopupWithImage({ selector: '.popup_view_image' });
const popupWithConfirmation = new PopupWithConfirmation('.popup_delete_card', deleteCard);
const popupEditProfile = new PopupWithForm({ selector: '.popup_edit_profile', submitForm: handleSubmitFormProfile });
const popupEditAvatar = new PopupWithForm({ selector: '.popup_avatar', submitForm: handleSubmitFormEditAvatar});
const profileInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorInfo: '.profile__job',
  selectorAvatar: '.profile__avatar',
});
const api = new Api({
  cohortId: 'cohort-52',
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
    const { name: profile_name, about: profile_job, avatar, _id } = userData;
     profileInfo.getAvatar(avatar);
    mainId = _id;
    // const { name: nameCard, link: linkCard, _id: cardId } = cardsData;
    profileInfo.setUserInfo({ profile_name, profile_job });
    // Вызывает метод сортировки карточек
    cardSection.renderItems(cardsData);
  })
  .catch((err) => api.serverResponseError(err));

// Функция открытия popup profile
function openPopupProfile() {
  const profileData = profileInfo.getUserInfo();

  popupEditProfile.setInputValues(profileData);

  popupEditProfile.open();
}

// Функция открытия popup add image
function openPopupAddImage() {
  popupEditImage.open();
}

// Функция закрытия popup add image
function closePopupAddImage() {
  popupEditImage.close();

  cardElementFormValidator.resetValidation();
}

function openPopupEditAvatar() {
  popupEditAvatar.open();
  popupEditAvatar.setEventListeners();
}

function closePopupEditAvatar() {
  avatarFormValidator.resetValidation()
  popupEditAvatar.close()
}

// Функция открытия popup view image
function handleCardClick(name, link) {
  popupViewImage.open(name, link);
}

// Функция открытия popup с подтверждением удаления карточки
function confirmsDeletion(data) {
  popupWithConfirmation.open();
  popupWithConfirmation.setEventListeners(data);
}

function handleSubmitFormProfile(evt, objectValue) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  api
    .editUserInfo(objectValue)
    .then(() => {
      profileInfo.setUserInfo(objectValue);

      popupEditProfile.close();

      profileElementFormValidator.resetValidation();
    })
    .catch((err) => api.serverResponseError(err));
}

function setLikes(idCard, cards) {
  return api
    .setLikes(idCard)
    .then((res) => {
      cards.resultClickLike(res);
    })
    .catch((err) => api.serverResponseError(err));
}

function deleteLikes(idCard, cards) {
  return api
    .deleteLikes(idCard)
    .then((res) => {
      cards.resultClickLike(res);
    })
    .catch((err) => api.serverResponseError(err));
}

function deleteCard(data) {
  const { idCard, card } = data;
  return api
    .deleteCard(idCard)
    .then(() => {
      card.resultClickDeleteCard();
    })
    .catch((err) => api.serverResponseError(err));
}

function handleSubmitFormEditAvatar(evt, objectValue) {
  evt.preventDefault()
  return api
    .changeAvatar(objectValue)
    .then((res) => {
      profileInfo.getAvatar(res.avatar);
      closePopupEditAvatar();
    })
    .catch((err) => api.serverResponseError(err));
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
    mainId,
  });

  const result = cardElement.generateCard();

  return result;
}

// Функция обработчик события при создании новой карточки
function handleSubmitAddImage(evt, objectValue) {
  evt.preventDefault();

  const { name_image: name, link_image: link } = objectValue;

  api
    .addNewCard({ name, link })
    .then((res) => {
      cardSection.addItem(res);

      closePopupAddImage();
    })
    .catch((err) => api.serverResponseError(err));
}

// Вызывает метод валидации профиля
profileElementFormValidator.enableValidation();

// Вызывает метод валидации карточки
cardElementFormValidator.enableValidation();

// Вызывает метод валидации аватара
avatarFormValidator.enableValidation();

// Вызывает метод прослушивания событий для popupEditProfile
popupEditProfile.setEventListeners();

// Вызывает метод прослушивания событий для popupEditImage
popupEditImage.setEventListeners();

// Вызывает метод прослушивания событий для popupViewImage
popupViewImage.setEventListeners();

// Вызывает функцию открытия popup profile при прослушивании click
profileEditButton.addEventListener('click', openPopupProfile);

// Вызывает функцию открытия popup add image при прослушивании click
imageAddButton.addEventListener('click', openPopupAddImage);

// Вызывает функцию открытия popup edit avatar при прослушивании click
editAvatarButton.addEventListener('click', openPopupEditAvatar);

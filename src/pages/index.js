import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  selectors,
  objectValidation,
  profileEditButton,
  imageAddButton,
  popupFormAddImage,
  popupFormEditProfile,
} from '../utils/constants.js';

const cardElementFormValidator = new FormValidator(objectValidation, popupFormAddImage);
const profileElementFormValidator = new FormValidator(objectValidation, popupFormEditProfile);
const popupEditImage = new PopupWithForm({ selector: '.popup_add_image', submitForm: handleSubmitAddImage }); // отредактировать наименование !!!
const popupViewImage = new PopupWithImage({ selector: '.popup_view_image' });
const popupWithConfirmation = new PopupWithConfirmation('.popup_delete_card');
const popupEditProfile = new PopupWithForm({ selector: '.popup_edit_profile', submitForm: handleSubmitFormProfile });
const profileInfo = new UserInfo({ selectorName: '.profile__name', selectorInfo: '.profile__job' });
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
const renderData = Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cardsData, userData]) => {
    const { name: profile_name, about: profile_job, avatar, _id } = userData;
    // const { name: nameCard, link: linkCard, _id: cardId } = cardsData;
    profileInfo.setUserInfo({ profile_name, profile_job });
    // Вызывает метод сортировки карточек
    cardSection.renderItems(cardsData);
  })
  .catch((err) => api.serverResponseError(err));

// api.deleteCard('636542164b3e610f8081b92a')

// api.setLikes(cardId)

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

// Функция открытия popup view image
function handleCardClick(name, link) {
  popupViewImage.open(name, link);
}

// Функция открытия popup с подтверждением удаления карточки
function confirmsDeletion() {
  popupWithConfirmation.open();
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


// api.setLikes("63665b3700d1bc1004af45c4")
// .then((qty) => {
//   console.log(qty)
// }) 
// .catch((err) => api.serverResponseError(err));


// Функция создания карточки
function createCard(element) {
  const cardElement = new Card(element, selectors.templateCard, handleCardClick, confirmsDeletion);

  const result = cardElement.generateCard();

  return result;
}

// Функция обработчик события при создании новой карточки
function handleSubmitAddImage(evt, objectValue) {
  evt.preventDefault();

  const { name_image: name, link_image: link } = objectValue;

  api
    .addNewCard({ name, link })
    .then(({ name, link }) => {
      cardSection.addItem({ name, link });

      closePopupAddImage();
    })
    .catch((err) => api.serverResponseError(err));
}

// Вызывает метод валидации профиля
profileElementFormValidator.enableValidation();

// Вызывает метод валидации карточки
cardElementFormValidator.enableValidation();

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

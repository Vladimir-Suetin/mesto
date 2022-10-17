import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  selectors,
  objectValidation,
  profileEditButton,
  popupProfileNameInput,
  popupProfileJobInput,
  imageAddButton,
  popupFormAddImage,
  popupFormEditProfile,
  initialCards,
} from '../utils/constants.js';

const cardElementFormValidator = new FormValidator(objectValidation, popupFormAddImage);
const profileElementFormValidator = new FormValidator(objectValidation, popupFormEditProfile);
const popupEditImage = new PopupWithForm({ selector: '.popup_add_image', submitForm: handleSubmitAddImage }); // отредактировать наименование !!!
const popupViewImage = new PopupWithImage({ selector: '.popup_view_image' });
const popupEditProfile = new PopupWithForm({ selector: '.popup_edit_profile', submitForm: handleSubmitFormProfile });
const profileInfo = new UserInfo({ selectorName: '.profile__name', selectorInfo: '.profile__job' });
const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  '.cards__photo-grid'
);

// Функция открытия popup profile
function openPopupProfile() {
  const { userName, userInfo } = profileInfo.getUserInfo();

  popupProfileNameInput.value = userName;
  popupProfileJobInput.value = userInfo;

  popupEditProfile.open();

  profileElementFormValidator.enableValidation();
}

// Функция открытия popup add image
function openPopupAddImage() {
  popupEditImage.open();

  cardElementFormValidator.enableValidation();
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

function handleSubmitFormProfile(evt, objectValue) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileInfo.setUserInfo(objectValue);

  popupEditProfile.close();

  profileElementFormValidator.resetValidation();
}

// Функция создания карточки
function createCard(element) {
  const cardElement = new Card(element, selectors.templateCard, handleCardClick);

  const result = cardElement.generateCard();

  cardSection.addItem(result);
}

// Функция обработчик события при создании новой карточки
function handleSubmitAddImage(evt, objectValue) {
  evt.preventDefault();

  const { name_image: name, link_image: link } = objectValue;

  createCard({ name, link });

  popupFormAddImage.reset();

  closePopupAddImage();
}

// Вызывает метод сортировки карточек
cardSection.renderItems();

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

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
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
  // popupViewImage,
  // popupImage,
  // popupImageName,
  popupFormAddImage,
  popupFormEditProfile,
  initialCards,
} from '../utils/constants.js';

const cardElementFormValidator = new FormValidator(objectValidation, popupFormAddImage);
const profileElementFormValidator = new FormValidator(objectValidation, popupFormEditProfile);
const popupProfile = new Popup('.popup_edit_profile');
const popupImageClass = new Popup('.popup_add_image'); // отредактировать наименование !!!
const popupViewImage = new PopupWithImage('.popup_view_image');
const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  '.cards__photo-grid'
);

// Функция открытия popup
// function openPopup(item) {
//   item.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape);
// }

// Функция закрытия popup
// function closePopup(item) {
//   item.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape);
// }

// Функция закрытия popup при нажатии на внешнюю область
// function closePopupByClickOverlay(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.currentTarget);
//   }
// }

// Функция закрытия попап при нажатии escape
// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }

// Функция открытия popup profile
function openPopupProfile() {
  // openPopup(popupEditProfile);
  popupProfileNameInput.value = profileName.textContent;
  popupProfileJobInput.value = profilejob.textContent;
  popupProfile.open();
  profileElementFormValidator.enableValidation();
}

// Функция закрытия popup profile
function closePopupProfile() {
  // closePopup(popupEditProfile);
  popupProfile.close();
  profileElementFormValidator.resetValidation();
}

// Функция открытия popup add image
function openPopupAddImage() {
  // openPopup(popupAddImage);
  popupImageClass.open();
  cardElementFormValidator.enableValidation();
}

// Функция закрытия popup add image
function closePopupAddImage() {
  // closePopup(popupAddImage);
  popupImageClass.close();
  cardElementFormValidator.resetValidation();
}

// Функция открытия popup view image
 function handleCardClick(name, link) {
  popupViewImage.open(name, link);
//   openPopup(popupViewImage);

//   popupImage.src = link;
//   popupImage.alt = name;

//   popupImageName.textContent = popupImage.alt;
}

// Функция обработки всех popup, вызова функций анимации и закрытия при нажатии на внешнюю область
// function sortPopup() {
//   const popupList = document.querySelectorAll(selectors.popup);
//   popupList.forEach((popup) => {
//     const buttonClosePopup = popup.querySelector(selectors.popupCloseButton);
//     buttonClosePopup.addEventListener('click', () => closePopup(popup));
//     popup.addEventListener('mousedown', closePopupByClickOverlay);
//   });
// }

// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function handleSubmitFormProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Вставляем новые значения с помощью textContent
  profileName.textContent = popupProfileNameInput.value;
  profilejob.textContent = popupProfileJobInput.value;

  closePopupProfile();
}

// Функция обработки карточек из массива
// function sortCards(cards) {
//   cards.forEach((element) => {
//     addCards(element);
//   });
// }

// Функция создания карточки
function createCard(element) {
  const cardElement = new Card(element, selectors.templateCard, handleCardClick);
  const result = cardElement.generateCard();
  cardSection.addItem(result);
  
}

// Функция добавления карточек
// function addCards(element) {
//   const result = createCard(element);
//   listCardPhotoGrid.prepend(result);
// }

// Функция обработчик события при создании новой карточки
function handleSubmitAddImage(evt) {
  evt.preventDefault();

  addNewCard();

  popupFormAddImage.reset();

  closePopupAddImage();
}

// Функция добавления новой карточки
function addNewCard() {
  const nameValue = popupImageNameInput.value;
  const linkValue = popupImageLinkInput.value;
  const cardValue = { name: nameValue, link: linkValue };

  createCard(cardValue);
}

// Вызывает функцию обработки popup
// sortPopup();

// Вызывает функцию сортировки карточек
// sortCards(initialCards);

// Вызывает метод сортировки карточек
cardSection.renderItems();

// Вызывает метод прослушивания событий для popupProfile
popupProfile.setEventListeners();

// Вызывает метод прослушивания событий для popupImageClass
popupImageClass.setEventListeners();

// Вызывает функцию редактирования popup
 popupFormEditProfile.addEventListener('submit', handleSubmitFormProfile);
// popupFormEditProfile.addEventListener('submit', () => {
//   const 
// });

// Вызывает функцию добавления карточки
popupAddImage.addEventListener('submit', handleSubmitAddImage);

// Вызывает функцию открытия popup profile при прослушивании click
profileEditButton.addEventListener('click', openPopupProfile);

// Вызывает функцию открытия popup add image при прослушивании click
imageAddButton.addEventListener('click', openPopupAddImage);

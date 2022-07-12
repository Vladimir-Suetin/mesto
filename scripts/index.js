// Находим профиль
const profile = document.querySelector('.profile');
// Находим поля профиля
const profileName = profile.querySelector('.profile__name');
const profilejob = profile.querySelector('.profile__job');
// Находим кнопку редактирования формы
const profileEditButton = profile.querySelector('.profile__edit-button');
// Находим форму popup edit profile
const formElement = document.querySelector('#popup-edit-profile');
// Находим поля формы
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__job');
// Находим кнопку закрытия popup
const closeButton = formElement.querySelector('.popup__close-icon');
// Находим куда вставлять temlate
const listCardPhotoGrid = document.querySelector('.cards__photo-grid');
// Находим форму popup add image
const formAddPopup = document.querySelector('#popup-add-image');
// Находим поля формы popup add image
const imageNameInput = formAddPopup.querySelector('.popup__name-image');
const imageLinkInput = formAddPopup.querySelector('.popup__link-image');
// Находим кнопку закрытия popup
const closeButtonImagePopup = formAddPopup.querySelector('.popup__close-icon');
// Находим кнопку добавления изображения
const openButtonImagePopup = profile.querySelector('.profile__add-button')

// Массив с карточками
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Создаем общую функцию открытия popup
function openPopup(item) {
  item.classList.add('popup_opened');
}

// Создаем общую функцию закрытия popup
function closePopup(item) {
  item.classList.remove('popup_opened');
}
//создаем функцию открытия popup profile
function openPopupProfile() {
  openPopup(formElement);
  nameInput.value = profileName.textContent;
  jobInput.value = profilejob.textContent;
}

//создаем функцию закрытия popup profile
function closePopupProfile() {
  closePopup(formElement);
}

// Создаем функцию открытия popup add image
function openPopupAddImage() {
  openPopup(formAddPopup);
}

// Создаем функцию закрытия popup add image
function closePopupAddImage() {
  closePopup(formAddPopup);
}

// Обработчик «отправки» формы редактирования профиля, хотя пока
// она никуда отправляться не будет
function formSubmitHandlerProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Вставляем новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;

  closePopupProfile();
}
// Обработчик «отправки» формы добавления фотографии, хотя пока
// она никуда отправляться не будет
function formSubmitHandlerImage(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // imageNameInput.textContent =
  // imageLinkInput.textContent =
}

function createInitialCards() {
  initialCards.forEach((card) => createCard(card));
}

function createCard(titleValue) {
// Находим элемент template и со всеми вложенными элементами
const listTemlate = document.querySelector('.temlate-list').content;
// Находим и копируем содержимое element в temlate 
const itemTemlate = listTemlate.querySelector('.element').cloneNode(true);
// Подставляем значения заголовка
itemTemlate.querySelector('.element__title').textContent = titleValue.name;
// Находим элемент img
const image = itemTemlate.querySelector('.element__mask-group');
// Подставляем значение атрибута src
image.setAttribute('src', `${titleValue.link}`);
// Подставляем значение атрибута alt
image.setAttribute('alt', `${titleValue.name}`);

listCardPhotoGrid.appendChild(itemTemlate);
}
createInitialCards();


// Вызываем функию открытия при прослушивании click
openButtonImagePopup.addEventListener('click', openPopupAddImage);

// Вызываем функию закрытия при прослушивании click
closeButtonImagePopup.addEventListener('click', closePopupAddImage);

//вызываем функцию закрытия при прослушивании click
closeButton.addEventListener('click', closePopupProfile);

//вызываем функцию открытия при прослушивании click
profileEditButton.addEventListener('click', openPopupProfile);

// он будет следить за событием “submit” - «отправка» формы редактирования профиля
formElement.addEventListener('submit', formSubmitHandlerProfile);

// Он будет следить за событием “submit” - «отправка» формы добавления фотографии
formAddPopup.addEventListener('submit', formSubmitHandlerImage);

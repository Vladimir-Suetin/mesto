// Находим профиль
const profile = document.querySelector('.profile');
// Находим поля профиля
const profileName = profile.querySelector('.profile__name');
const profilejob = profile.querySelector('.profile__job');
// Находим кнопку редактирования формы
const profileEditButton = profile.querySelector('.profile__edit-button');
// Находим форму
const formElement = document.querySelector('#popup-edit-profile');
// Находим поля формы
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__job');
// Находим кнопку закрытия popup
const closeButton = formElement.querySelector('.popup__close-icon');
// Находим куда вставлять temlate
const listCardPhotoGrid = document.querySelector('.cards__photo-grid');
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

//создаем функцию открытия popup
function openPopup() {
  formElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profilejob.textContent;
}

//создаем функцию закрытия popup
function closePopup() {
  formElement.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Вставляем новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;

  closePopup();
}

function createInitialCards() {
  initialCards.forEach((card) => createCard(card));
}

function createCard(titleValue) {
// Находим элемент template и со всеми вложенными элементами
const listTemlate = document.querySelector('.temlate-list').content;
// Находим и копируем содержимое element в temlate 
const item = listTemlate.querySelector('.element').cloneNode(true);
// Подставляем значения заголовка
item.querySelector('.element__title').textContent = titleValue.name;
// Находим элемент img
const image = item.querySelector('.element__mask-group');

image.setAttribute('src', `${titleValue.link}`);

listCardPhotoGrid.appendChild(item);
}
createInitialCards();



//вызываем функцию закрытия при прослушивании click
closeButton.addEventListener('click', closePopup);

//вызываем функцию открытия при прослушивании click
profileEditButton.addEventListener('click', openPopup);

// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

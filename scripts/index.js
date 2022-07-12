// Находим профиль
const profile = document.querySelector(".profile");
// Находим поля профиля
const profileName = profile.querySelector(".profile__name");
const profilejob = profile.querySelector(".profile__job");
// Находим кнопку редактирования формы
const profileEditButton = profile.querySelector(".profile__edit-button");
// Находим форму popup edit profile
const formElement = document.querySelector("#popup-edit-profile");
// Находим поля формы
const nameInput = formElement.querySelector(".popup__name");
const jobInput = formElement.querySelector(".popup__job");
// Находим кнопку закрытия popup
const closeButton = formElement.querySelector(".popup__close-icon");
// Находим куда вставлять template
const listCardPhotoGrid = document.querySelector(".cards__photo-grid");
// Находим форму popup add image
const formAddPopup = document.querySelector("#popup-add-image");
// Находим поля формы popup add image
const imageNameInput = formAddPopup.querySelector(".popup__name-image");
const imageLinkInput = formAddPopup.querySelector(".popup__link-image");
// Находим кнопку закрытия popup
const closeButtonImagePopup = formAddPopup.querySelector(".popup__close-icon");
// Находим кнопку добавления изображения
const openButtonImagePopup = profile.querySelector(".profile__add-button");

const listTemplate = document.querySelector(".template-list");

const itemTemplate = listTemplate.querySelector(".element");

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

// Создаем общую функцию открытия popup
function openPopup(item) {
  item.classList.add("popup_opened");
}

// Создаем общую функцию закрытия popup
function closePopup(item) {
  item.classList.remove("popup_opened");
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

  // Запускает функцию создания новой карточки
  addImage();

  // Запускает функцию закрытия popup
  closePopupAddImage();
}

// Функция перебора массива
function createInitialCards() {
  initialCards.forEach((card) => createCard(card));
}

// Находим и клонируем темплейт
function cloneTemplateCard() {
  // Находим элемент template и со всеми вложенными элементами
  const item = listTemplate.content;
  // Находим и копируем содержимое element в template
  const copyItemTemplate = item.cloneNode(true);
  // Возвращаем значение
  return copyItemTemplate;
}

// Функция создания новой карточки
function addImage() {

  // получаем копию template
  const item = cloneTemplateCard();
  // получаем значения введенных полей
  const nameValue = imageNameInput.value;
  const linkValue = imageLinkInput.value;

  // Находим название карточки и присваиваем ей значение поля name
  item.querySelector(".element__title").textContent = nameValue;
  // Находим элемент изображения
  const image = item.querySelector(".element__mask-group");
  // Подставляем значение ссылки
  image.setAttribute("src", `${linkValue}`);
  // Подставляем значение alt
  image.setAttribute("alt", `${nameValue}`);

  // Добавляем в начало списка
   listCardPhotoGrid.prepend(item);

}

function createCard(titleValue) {
  // вызываем функцию клонирования template
  const item = cloneTemplateCard();
  // Подставляем значения заголовка
  item.querySelector(".element__title").textContent = titleValue.name;
  // Находим элемент img
  const image = item.querySelector(".element__mask-group");
  // Подставляем значение атрибута src
  image.setAttribute("src", `${titleValue.link}`);
  // Подставляем значение атрибута alt
  image.setAttribute("alt", `${titleValue.name}`);

  listCardPhotoGrid.prepend(item);
}
createInitialCards();

// Функция кнопки лайк
function clickLikeButton() {
  // ищем кнопку 
  const elements = document.querySelectorAll('.element__like-button');

  // функция изменения класса элемента на котором произошел клик
  const likeElement = (event) => {
    event.currentTarget.classList.toggle('element__like-button_active');
  }

  // перебираем элементы и навешиваем слушатель клика
  elements.forEach((element) => {
    element.addEventListener('click', likeElement);
 });

}

// Вызываем функцию кнопки лайк
clickLikeButton();

// Вызываем функию открытия при прослушивании click
openButtonImagePopup.addEventListener("click", openPopupAddImage);

// Вызываем функию закрытия при прослушивании click
closeButtonImagePopup.addEventListener("click", closePopupAddImage);

//вызываем функцию закрытия при прослушивании click
closeButton.addEventListener("click", closePopupProfile);

//вызываем функцию открытия при прослушивании click
profileEditButton.addEventListener("click", openPopupProfile);

// он будет следить за событием “submit” - «отправка» формы редактирования профиля
formElement.addEventListener("submit", formSubmitHandlerProfile);

// Он будет следить за событием “submit” - «отправка» формы добавления фотографии
formAddPopup.addEventListener("submit", formSubmitHandlerImage);


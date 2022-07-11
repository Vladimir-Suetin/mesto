// Находим профиль
const profile = document.querySelector(".profile");
// Находим поля профиля
const profileName = profile.querySelector(".profile__name");
const profilejob = profile.querySelector(".profile__job");
// Находим кнопку редактирования формы
const profileEditButton = profile.querySelector(".profile__edit-button");
// Находим форму
const formElement = document.querySelector(".popup");
// Находим поля формы
const nameInput = formElement.querySelector(".popup__name");
const jobInput = formElement.querySelector(".popup__job");
// Находим кнопку закрытия popup
const closeButton = formElement.querySelector(".popup__close-icon");


//создаем функцию открытия popup
function openPopup() {
  formElement.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profilejob.textContent;
}

//создаем функцию закрытия popup
function closePopup() {
  formElement.classList.remove("popup_opened");
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Вставляем новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profilejob.textContent = jobInput.value;

  closePopup()
}

//вызываем функцию закрытия при прослушивании click
closeButton.addEventListener("click", closePopup);

//вызываем функцию открытия при прослушивании click
profileEditButton.addEventListener("click", openPopup);

// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);

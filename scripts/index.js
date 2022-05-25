// Находим профиль в DOM
let profile = document.querySelector('.profile');
// Находим поля профиля в DOM
let profileName = profile.querySelector('.profile__name');
let profilejob = profile.querySelector('.profile__job');

// Находим форму в DOM
let formElement = document.querySelector('.popup'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__job'); // Воспользуйтесь инструментом .querySelector()

// Находим кнопку редактирования формы
let profileEditButton = document.querySelector('.profile__edit-button');
//создаем функцию открытия popup
function popupOpened() {
  formElement.classList.toggle('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profilejob.textContent;
}
//вызываем функцию при прослушивании click
profileEditButton.addEventListener('click', popupOpened);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
// Вставьте новые значения с помощью textContent
profileName.textContent = nameInput.value;
profilejob.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// Находим кнопку закрытия popup
let closeButton = document.querySelector('.popup__close-icon');
//создаем функцию закрытия
function closeFormButton() {
  formElement.classList.remove('popup_opened');
}
//вызываем функцию при прослушивании click
closeButton.addEventListener('click', closeFormButton);

// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
// при прослушивании события submit вызывает функцию закрытия
formElement.addEventListener('submit', closeFormButton);

const selectorsValidation = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error',
};

// Функция находит форму в документе и вешает слушатель на input
function enableValidation(config) {
  const form = document.querySelectorAll(config.formSelector);
  form.forEach((formElement) => {
    formElement.addEventListener("input", (event) => handleFormInput(event));
  })
}

// Функция работы с input
function handleFormInput(event) {
  // определить форму
  const form = event.currentTarget;
  // найдем активный инпут
  const input = event.target;

  //важен порядок вызова ошибок !!!
  // устанавливаем кастомный текст ошибок
  setCustomError(input);
  // подсветка input invalid
  accentInputInvalid(input);
  // показать ошибки в контейнере под полем
  showFieldError(input);
  // включить или отключить кнопку отправки формы
  setSubmitButtonState(form);
}

// Функция кастомного текста ошибок
function setCustomError(input) {
  // создаем переменную проверки валидности
  const validity = input.validity;


  // Функция установки кастомной ошибки
  input.setCustomValidity("");

  if (validity.tooShort) {
    input.setCustomValidity("Минимальное количество символов = 2");
  }

  if (validity.tooLong) {
    input.setCustomValidity("Ввод слишком длинный");
  }

  if (validity.typeMismatch && input.type === "url") {
    input.setCustomValidity("Введите ссылку на картинку");
  }

  if (validity.valueMissing) {
    input.setCustomValidity("пустое поле не допускается");
  }
}

// функция показа ошибки
function showFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;
}

// Функция подсветки input invalid
function accentInputInvalid(input) {
  const isValid = input.checkValidity();

  if (isValid) {
    input.classList.remove(selectorsValidation.inputErrorClass);
  } else {
    input.classList.add(selectorsValidation.inputErrorClass);
  }
}

// функция включения кнопки отправки
function setSubmitButtonState(form) {
  const button = form.querySelector(selectorsValidation.submitButtonSelector);

  const isValid = form.checkValidity();

  if (isValid) {
    button.removeAttribute("disabled");
    button.classList.remove(selectorsValidation.inactiveButtonClass);
    //button.classList.add(selectorsValidation.popupSubmitButtonActive);
  } else {
    button.setAttribute("disabled", true);
    //button.classList.remove(selectorsValidation.popupSubmitButtonActive);
    button.classList.add(selectorsValidation.inactiveButtonClass);
  }
}

enableValidation(selectorsValidation);
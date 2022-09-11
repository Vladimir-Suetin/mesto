export default class FormValidator {
  _selectors;
  _form;
  _input;
  _validity;
  _span;
  _isValid;
  _button;

  constructor(selectors) {
    this._selectors = selectors;
  }

  // Функция находит форму в документе и вешает слушатели
  enableValidation = () => {
    this._form = document.querySelectorAll(this._selectors.popupForm);
    this._form.forEach((formElement) => {
      formElement.addEventListener("input", (evt) => this._handleFormInput(evt));
      formElement.addEventListener("submit", (evt) => this._handleFormSubmit(evt));
    });
  };

  _handleFormSubmit = (evt) => {
    evt.preventDefault();

    this._form = evt.currentTarget;

    this._setSubmitButtonState(this._form);
  };

  // Функция работы с input
  _handleFormInput = (evt) => {
    // определить форму
    this._form = evt.currentTarget;
    // найдем активный инпут
    this._input = evt.target;

    //важен порядок вызова ошибок !!!
    // устанавливаем кастомный текст ошибок
    this._setCustomError(this._input);
    // подсветка input invalid
    this._accentInputInvalid(this._input);
    // показать ошибки в контейнере под полем
    this._showFieldError(this._input);
    // включить или отключить кнопку отправки формы
    this._setSubmitButtonState(this._form);
  };

  // Функция кастомного текста ошибок
  _setCustomError = (input) => {
    // создаем переменную проверки валидности
    this._validity = input.validity;

    // Функция установки кастомной ошибки
    input.setCustomValidity("");

    if (this._validity.tooShort) {
      input.setCustomValidity("Минимальное количество символов = 2");
    }

    if (this._validity.tooLong) {
      input.setCustomValidity("Ввод слишком длинный");
    }

    if (this._validity.typeMismatch && input.type === "url") {
      input.setCustomValidity("Введите ссылку на картинку");
    }

    if (this._validity.valueMissing) {
      input.setCustomValidity("пустое поле не допускается");
    }
  };

  // функция показа ошибки
  _showFieldError = (input) => {
    this._span = input.nextElementSibling;
    this._span.textContent = input.validationMessage;
  };

  // Функция подсветки input invalid
  _accentInputInvalid = (input) => {
    this._isValid = input.checkValidity();

    if (this._isValid) {
      input.classList.remove(this._selectors.inputErrorClass);
    } else {
      input.classList.add(this._selectors.inputErrorClass);
    }
  };

  // функция включения кнопки отправки
  _setSubmitButtonState = (form) => {
    this._button = form.querySelector(this._selectors.popupSubmitButton);

    this._isValid = form.checkValidity();

    if (this._isValid) {
      this._button.removeAttribute("disabled");
      this._button.classList.remove(this._selectors.inactiveButtonClass);
    } else {
      this._button.setAttribute("disabled", true);
      this._button.classList.add(this._selectors.inactiveButtonClass);
    }
  };
}

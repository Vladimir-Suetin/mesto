export default class FormValidator {
  _objectValidation;
  _elementValidation;
  _form;
  _button;
  _inputElements;
  _input;
  _textError;
  _isValid;

  constructor(objectValidation, elementValidation) {
    this._objectValidation = objectValidation;
    this._elementValidation = elementValidation;
    this._form = this._elementValidation.querySelector(this._objectValidation.formSelector);
    this._button = this._form.querySelector(this._objectValidation.submitButtonSelector);
    this._inputElements = Array.from(this._elementValidation.querySelectorAll(this._objectValidation.inputSelector));
  }

  // Метод находит форму в документе и вешает слушатели
  enableValidation = () => {
    this._inputElements.forEach((formElement) => {
      formElement.addEventListener("input", (evt) => this._handleFormInput(evt));
    });
  };

  resetValidation = () => {
    this._inputElements.forEach((formElement) => {
      this._textError = this._form.querySelector(`${this._objectValidation.errorSelector}_${formElement.name}`);
      this._textError.textContent = "";
      formElement.classList.remove(this._objectValidation.inputErrorClass);
    });

    this._button.setAttribute("disabled", true);
    this._button.classList.add(this._objectValidation.inactiveButtonClass);
  };

  // Метод работы с input
  _handleFormInput = (evt) => {
    // найдем активный инпут
    this._input = evt.target;
    
    //важен порядок вызова ошибок !!!
    // устанавливаем кастомный текст ошибок
    //    this._setCustomError(this._input);
    // подсветка input invalid
    this._accentInputInvalid(this._input);
    // показать ошибки в контейнере под полем
    this._showFieldError(this._input);
    // включить или отключить кнопку отправки формы
    this._setSubmitButtonState();
  };

  // Функция кастомного текста ошибок
  // _setCustomError = (input) => {
  //   // создаем переменную проверки валидности
  //   this._validity = input.validity;

  //   // Функция установки кастомной ошибки
  //   input.setCustomValidity("");

  //   if (this._validity.tooShort) {
  //     input.setCustomValidity("Минимальное количество символов = 2");
  //   }

  //   if (this._validity.tooLong) {
  //     input.setCustomValidity("Ввод слишком длинный");
  //   }

  //   if (this._validity.typeMismatch && input.type === "url") {
  //     input.setCustomValidity("Введите ссылку на картинку");
  //   }

  //   if (this._validity.valueMissing) {
  //     input.setCustomValidity("пустое поле не допускается");
  //   }
  // };

  // функция показа ошибки
  _showFieldError = (input) => {
    //this.textError = input.nextElementSibling; выбирает соседний елемент за input
    this._textError = this._form.querySelector(`${this._objectValidation.errorSelector}_${input.name}`);
    this._textError.textContent = input.validationMessage;
  };

  // Функция подсветки input invalid
  _accentInputInvalid = (input) => {
    this._isValid = input.checkValidity();

    if (this._isValid) {
      input.classList.remove(this._objectValidation.inputErrorClass);
    } else {
      input.classList.add(this._objectValidation.inputErrorClass);
    }
  };

  // Метод включения кнопки отправки
  _setSubmitButtonState = () => {
    this._isValid = this._form.checkValidity();

    if (this._isValid) {
      this._button.removeAttribute("disabled");
      this._button.classList.remove(this._objectValidation.inactiveButtonClass);
    } else {
      this._button.setAttribute("disabled", true);
      this._button.classList.add(this._objectValidation.inactiveButtonClass);
    }
  };
}

export default class FormValidator {
  _objectValidation;
  _form;
  _button;
  _inputElements;
  _input;
  _textError;
  _isValid;

  constructor(objectValidation, formValidation) {
    this._objectValidation = objectValidation;
    this._form = formValidation;
    this._button = this._form.querySelector(this._objectValidation.submitButtonSelector);
    this._inputElements = Array.from(this._form.querySelectorAll(this._objectValidation.inputSelector));
  }

  // Метод находит форму в документе и вешает слушатели
  enableValidation() {
    this._form.addEventListener("input", (evt) => this._handleFormInput(evt));
  };

  _disableButton() {
    this._button.setAttribute("disabled", true);
    this._button.classList.add(this._objectValidation.inactiveButtonClass);
  }

  resetValidation() {
    this._inputElements.forEach((formElement) => {
      this._textError = this._form.querySelector(`${this._objectValidation.errorSelector}_${formElement.name}`);
      this._textError.textContent = "";
      formElement.classList.remove(this._objectValidation.inputErrorClass);
    });
    this._disableButton();
  };

  // Метод работы с input
  _handleFormInput(evt) {
    // найдем активный инпут
    this._input = evt.target;

    // подсветка input invalid
    this._checkInputValidity(this._input);

    // показать ошибки в контейнере под полем
    this._showFieldError(this._input);

    // включить или отключить кнопку отправки формы
    this._setSubmitButtonState();
  };

  // функция показа ошибки
  _showFieldError(input) {
    this._textError = this._form.querySelector(`${this._objectValidation.errorSelector}_${input.name}`);
    this._textError.textContent = input.validationMessage;
  };

  // Функция подсветки input invalid
  _checkInputValidity(input) {
    this._isValid = input.checkValidity();

    if (this._isValid) {
      input.classList.remove(this._objectValidation.inputErrorClass);
    } else {
      input.classList.add(this._objectValidation.inputErrorClass);
    }
  };

  // Метод включения кнопки отправки
  _setSubmitButtonState() {
    this._isValid = this._form.checkValidity();

    if (this._isValid) {
      this._button.removeAttribute("disabled");
      this._button.classList.remove(this._objectValidation.inactiveButtonClass);
    } else {
      this._disableButton();
    }
  };
}

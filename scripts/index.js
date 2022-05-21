console.log(2 + 1);
console.log(2 + 1);
// Находим форму в DOM
let formElement = document.querySelector(".popup");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__name");
let jobInput = document.querySelector(".popup__job");
let submitButton = document.querySelector(".popup__submit-button");
let closeButton = document.querySelector(".popup__close-icon");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  let name = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
  let job = jobInput.value;
  // document.querySelector(".popup__name") = "";
  // document.querySelector(".popup__job") = "";

  let profileName = document.querySelector(".profile__name");// Выберите элементы, куда должны быть вставлены значения полей

  let profileJob = document.querySelector(".profile__job"); 
  
  profileName.textContent = name; // Вставьте новые значения с помощью textContent
  profileJob.textContent = job;
  console.log(name)
  
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);

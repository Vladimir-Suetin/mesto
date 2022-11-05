export default class Api {
  constructor({ cohortId, headers }) {
    this._cohortId = cohortId;
    this._headers = headers;
  }

  _serverResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
  }

  serverResponseError(err) {
    return console.log(`Запрос не выполнен. ${err}`);
  }

  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
      headers: this._headers,
    }).then((res) => this._serverResponse(res));
    // .catch((err) => this._serverResponseError(err))
  }

  getCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      headers: this._headers,
    }).then((res) => this._serverResponse(res));
  }

  editUserInfo(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.profile_name,
        about: data.profile_job,
      }),
    }).then((res) => this._serverResponse(res));
  }

  addNewCard(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._serverResponse(res));
  }

  deleteCard(idCard) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${idCard}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._serverResponse(res));
  }

  setLikes(idCard) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohortId}/cards/${idCard}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._serverResponse(res));
  }
}

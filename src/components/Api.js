export default class Api {
  constructor({ serverUrl, headers }) {
    this._serverUrl = serverUrl;
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
    return fetch(this._serverUrl, {
      headers: this._headers,
    })
    .then((res) => this._serverResponse(res))
    // .catch((err) => this._serverResponseError(err))
  }
}

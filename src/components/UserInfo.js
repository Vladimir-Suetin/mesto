export default class UserInfo {
  constructor({ selectorName, selectorInfo, selectorAvatar }) {
    this._profileUserName = document.querySelector(selectorName);
    this._profileUserInfo = document.querySelector(selectorInfo);
    this._profileUserAvatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileUserName.textContent,
      job: this._profileUserInfo.textContent,
      avatar: this._profileUserAvatar,
    };
  }

  setUserInfo(data) {
    const { name = 'Имя не определено', job = 'Деятельность не определена', avatar} = data;

    this._profileUserName.textContent = name;
    this._profileUserInfo.textContent = job;
    this._profileUserAvatar.src = avatar
  }
}

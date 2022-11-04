export default class UserInfo {
  constructor({ selectorName, selectorInfo }) {
    this._profileUserName = document.querySelector(selectorName);
    this._profileUserInfo = document.querySelector(selectorInfo);
  }

  getUserInfo() {
    return {
      profile_name: this._profileUserName.textContent,
      profile_job: this._profileUserInfo.textContent,
    };
  }

  setUserInfo(data) {
    console.log(data)
    const { profile_name = 'Имя не определено', profile_job = 'Деятельность не определена' } = data;

    this._profileUserName.textContent = profile_name;
    this._profileUserInfo.textContent = profile_job;
  }
}

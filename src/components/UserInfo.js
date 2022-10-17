export default class UserInfo {
  constructor({ selectorName, selectorInfo }) {
    this._profileUserName = document.querySelector(selectorName);
    this._profileUserInfo = document.querySelector(selectorInfo);
  }

  getUserInfo() {
    return {
      userName: this._profileUserName.textContent,
      userInfo: this._profileUserInfo.textContent,
    };
  }

  setUserInfo(data) {
    const { profile_name, profile_job } = data;

    this._profileUserName.textContent = profile_name;
    this._profileUserInfo.textContent = profile_job;
  }
}

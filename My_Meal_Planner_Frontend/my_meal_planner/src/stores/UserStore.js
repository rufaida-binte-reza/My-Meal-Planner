import { makeAutoObservable } from 'mobx';

class UserStore {
  username = '';
  isLoggedIn = false;
  token = '';

  constructor() {
    makeAutoObservable(this);
  }

  login(user) {
    this.username = user.username;
    this.isLoggedIn = true;
    this.token = user.token;
  }

  logout() {
    this.username = '';
    this.isLoggedIn = false;
  }
}

export default new UserStore();

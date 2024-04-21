import AppModel, { pb } from "./app_model";

class AuthModel extends AppModel {
  async login(user, pass) {
    const authData = await pb
      .collection(this.collection)
      .authWithPassword(user, pass);
    return authData;
  }
}

const Auth = new AuthModel("users");

export default Auth;

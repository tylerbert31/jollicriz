import AppModel, { pb } from "./app_model";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import BrowserModel from "./browser_model";

class AuthModel extends AppModel {
  async login(user, pass) {
    const authData = await pb
      .collection(this.collection)
      .authWithPassword(user, pass);
    return authData;
  }
  isLogged() {
    if (cookies().get(BrowserModel.authCookieName)) {
      redirect("/home");
    }
  }
  isNotLogged() {
    if (!cookies().get(BrowserModel.authCookieName)) {
      redirect("/");
    }
  }

  getId() {
    const id = cookies().get(BrowserModel.authCookieName);
    return id.value;
  }
}

const Auth = new AuthModel("users");

export default Auth;

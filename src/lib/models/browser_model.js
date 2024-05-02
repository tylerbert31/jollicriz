// Client Side Model

import AppModel from "./app_model";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class BrowsersModel extends AppModel {
  getId() {
    return cookies.get(this.authCookieName);
  }
}

const BrowserModel = new BrowsersModel("users");

export default BrowserModel;

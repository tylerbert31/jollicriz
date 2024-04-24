import AppModel, { pb } from "./app_model";
import memcache from "@/util/node-cache/node-cache";
import { cookies } from "next/headers";

class UserModel extends AppModel {
  buildProfileURL(data, fieldName) {
    const pb_url = process.env.PB_URL;
    if (data.length > 0 && Array.isArray(data)) {
      const newData = [];
      data.forEach((item) => {
        const newItem = {
          ...item,
          image: `${pb_url}api/files/${item.collectionId}/${item.id}/${item[fieldName]}`,
        };
        newData.push(newItem);
      });
      return newData;
    } else {
      return [];
    }
  }

  async userExist(token) {
    token = token.value;
    const cachedUser = memcache.get(token);
    if (cachedUser) {
      return cachedUser;
    }

    try {
      const res = await pb.collection(this.collection).getOne(token);
      memcache.set(token, res, 3600);
      return res;
    } catch (error) {
      return false;
    }
  }

  async getUserData() {
    const token = cookies().get(this.authCookieName);
    const cachedUser = memcache.get(token.value);
    if (cachedUser) {
      return cachedUser;
    }
    const user = await pb.collection(this.collection).getOne(token.value);

    memcache.set(token.value, user, 3600);
    return user;
  }
}

const User = new UserModel("users");

export default User;

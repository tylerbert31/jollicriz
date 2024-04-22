import AppModel, { pb } from "./app_model";
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
}

const User = new UserModel("users");

export default User;

import PocketBase from "pocketbase";
import NodeCache from "node-cache";

export const pb = new PocketBase(process.env.PB_URL);
pb.autoCancellation(false);

export default class AppModel {
  constructor(collection_name) {
    this.collection = collection_name;
    this.memcache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
    this.pb_url = process.env.PB_URL;
    this.authCookieName = "_PBLog";

    switch (process.env.ENVIRONMENT ?? "LOCAL") {
      case "LOCAL":
        this.baseURL = "http://localhost:3000";
        break;
      case "STAGING":
        this.baseURL = "https://jollicriz-stg.vercel.app";
        break;
      case "PRODUCTION":
        this.baseURL = "https://jollicriz.vercel.app";
        break;
      default:
        this.baseURL = "http://localhost:3000";
        break;
    }
  }

  getCookieName() {
    return this.authCookieName;
  }

  async findById(id, conditions = null) {
    const res = await pb.collection(this.collection).getOne(id, conditions);
    return res;
  }

  async findAll() {
    const res = await pb.collection(this.collection).getFullList();
    return res;
  }

  async findAllWhere(condition) {
    const res = await pb.collection(this.collection).getFullList(condition);
    return res;
  }

  async findCouple(limit, conditions = null) {
    limit = limit ?? 10;
    const res = await pb
      .collection(this.collection)
      .getList(1, limit, conditions);
    return res;
  }

  getImage(data, fileName) {
    const pb_url = process.env.PB_URL;
    return `${pb_url}api/files/${data.collectionId}/${data.id}/${data[fileName]}`;
  }

  async save(data) {
    try {
      const res = await pb.collection(this.collection).create(data);
      return res;
    } catch (error) {
      return error;
    }
  }
}

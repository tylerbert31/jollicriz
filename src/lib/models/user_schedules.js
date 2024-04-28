import AppModel, { pb } from "./app_model";
import { format } from "date-fns";
import memcache from "@/util/node-cache/node-cache";

class UsersScheduleModel extends AppModel {
  async getAllScheds() {
    const cachedScheds = memcache.get("users_schedule");
    if (cachedScheds) {
      return cachedScheds;
    }

    const currentDay = format(new Date(), "i");
    const scheds = await this.findAllWhere({ filter: `day = ${currentDay}` });
    const user_scheds = [];
    scheds.forEach((sched) => {
      user_scheds[sched.user_id] = sched.available;
    });

    memcache.set("users_schedule", user_scheds, 3600 * 3);
    return user_scheds;
  }

  async mySchedules(id) {
    const myScheds = await this.findAllWhere({
      filter: `user_id='${id}'`,
      sort: "day",
    });
    return myScheds;
  }

  async mySchedToday(id) {
    const cache = memcache.get(`${id}-status`);
    if (cache) {
      return cache;
    }

    const mySched = await pb
      .collection(this.collection)
      .getFirstListItem(`user_id='${id}' && day="${format(new Date(), "i")}"`);
    memcache.set(`${id}-status`, mySched, 1800);
    return mySched;
  }

  async updateSched(id, data) {
    await pb.collection(this.collection).update(id, data);
  }
}

const UserSchedule = new UsersScheduleModel("user_scheds");
export default UserSchedule;

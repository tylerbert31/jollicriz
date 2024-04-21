import AppModel, { pb } from "./app_model";
import { format } from "date-fns";

class UsersScheduleModel extends AppModel {
  async getAllScheds() {
    const currentDay = format(new Date(), "i");
    const scheds = await this.findAllWhere({ filter: `day = ${currentDay}` });
    const user_scheds = [];
    scheds.forEach((sched) => {
      user_scheds[sched.user_id] = sched.available;
    });
    return user_scheds;
  }
}

const UserSchedule = new UsersScheduleModel("user_scheds");
export default UserSchedule;

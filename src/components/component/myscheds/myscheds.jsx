import React from "react";
import UserSchedule from "../../../lib/models/user_schedules";
import Auth from "../../../lib/models/auth";

const days = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};

const MySchedules = async () => {
  const myId = Auth.getId();
  const myScheds = await UserSchedule.mySchedules(myId);
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {myScheds ? (
        myScheds.map((sched, index) => (
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
            key={index}
          >
            <div className="flex items-center p-4 space-x-4">
              {days[sched.day]}
            </div>
          </div>
        ))
      ) : (
        <SchedPlaceholder />
      )}
    </section>
  );
};

function SchedPlaceholder() {
  return (
    <>
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
          key={index}
        >
          <div className="flex items-center p-4 space-x-4">
            {days[index + 1]}
          </div>
        </div>
      ))}
    </>
  );
}

export default MySchedules;

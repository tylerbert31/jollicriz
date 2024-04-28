import UserSchedule from "../../../lib/models/user_schedules";
import React, { Suspense } from "react";
import { SchedCard } from "../sched-card";

const days = {
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY",
  7: "SUNDAY",
};

const MySchedules = async ({ userId }) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <Suspense fallback={<SchedPlaceholder />}>
        <ActualScheds userId={userId} />
      </Suspense>
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

async function ActualScheds({ userId }) {
  const myScheds = await UserSchedule.mySchedules(userId);
  return (
    <>
      {myScheds.map((sched, index) => (
        <div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
          key={index}
        >
          <SchedCard day={days[sched.day]} sched={sched} />
        </div>
      ))}
    </>
  );
}

export default MySchedules;

import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import User from "@/lib/models/users";
import UserSchedule from "@/lib/models/user_schedules";
import Auth from "@/lib/models/auth";

const ProfileCards = async () => {
  const users = await User.findAll().then((e) =>
    User.buildProfileURL(e, "profile_pic")
  );
  const schedules = await UserSchedule.getAllScheds();
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {users.map((user, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
        >
          <div className="flex items-center p-4 space-x-4">
            <Avatar>
              <AvatarImage
                alt={user.username}
                src={`${user.image}?thumb=0x40`}
              />
              <AvatarFallback>
                <AvatarImage alt={user.username} src="/img/cuby_rizal.png" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-sans font-semibold">
                {user.id == Auth.getId() ? "Me" : user.username}
              </h4>
              {schedules[user.id] && schedules[user.id] == true ? (
                <p className="text-xs text-green-500 dark:text-green-400">
                  Available
                </p>
              ) : (
                <p className="text-xs text-red-500 dark:text-red-400">
                  Not Available
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProfileCards;

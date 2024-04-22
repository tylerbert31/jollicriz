import React from "react";
import Header from "@/components/component/header/header";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Auth from "@/lib/models/auth";

async function Profile() {
  Auth.isNotLogged();
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 min-w-[420px]">
      <Header />
      <main className="flex-1 overflow-auto p-4">
        <section className="grid grid-cols-1 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="flex items-center p-4 space-x-4">
              <Avatar>
                <AvatarImage alt="Avatar" src="/img/cuby_rizal.png" />
                <AvatarFallback>
                  <AvatarImage alt="Avatar" src="/img/cuby_rizal.png" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-sm font-sans font-semibold">Name</h4>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;

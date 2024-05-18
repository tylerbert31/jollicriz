import React from "react";
import Header from "@/components/component/header/header";
import Comment from "@/lib/models/comments";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import CommentImg from "@/components/component/comment/comment_image";
import { formatDistance } from "date-fns";

const Thread = async ({ params }) => {
  var thread = [];
  try {
    thread = await Comment.findById(params.id, { expand: "user_id" });
  } catch (error) {
    redirect("/home");
  }
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 min-h-dvh min-w-[420px]">
      <Header />
      <main className="overflow-auto p-4 flex justify-center">
        <div className="p-4 space-y-4 flex flex-col bg-gray-800 rounded-md min-w-[400px] max-w-[400px]">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage
                alt={thread.expand.user_id.username}
                src={Comment.getImage(thread.expand.user_id, "profile_pic")}
              />
              <AvatarFallback>
                <AvatarImage
                  alt={thread.expand.user_id.username}
                  src="/img/cuby_rizal.png"
                />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-sans">
                {thread.expand.user_id.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-sans">
                {formatDistance(thread.created, new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <div className="min-w-[90%]">{thread.comment}</div>
          {thread.image && (
            <img
              src={Comment.getImage(thread, "image")}
              alt="image"
              className=" min-w-[90%] rounded-sm"
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default Thread;

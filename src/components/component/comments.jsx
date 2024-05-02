import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Comment from "@/lib/models/comments";
import { formatDistance } from "date-fns";
import CommentInput from "./comment/comment_input";
import { unstable_noStore as noStore } from "next/cache";

const CommentSection = async () => {
  noStore();
  const comments = await Comment.findCouple(7, {
    expand: "user_id",
    sort: "-created",
  }).then((data) => data.items);
  return (
    <section className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 space-y-4">
        {comments.map((user, index) => (
          <div className="flex items-start space-x-4" key={index}>
            <Avatar>
              <AvatarImage
                alt={user.expand.user_id.username}
                src={Comment.getImage(user.expand.user_id, "profile_pic")}
              />
              <AvatarFallback>
                <AvatarImage alt={user.username} src="/img/cuby_rizal.png" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-sans">{user.comment}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-sans">
                {formatDistance(user.created, new Date(), { addSuffix: true })}
              </p>
            </div>
            {user.image && (
              <img
                alt="Image preview"
                className="w-12 h-12 rounded-md object-cover cursor-pointer hover:scale-105 transition-all"
                height="40"
                src={`${Comment.getImage(user, "image")}?thumb=0x48`}
                style={{
                  aspectRatio: "50/50",
                  objectFit: "cover",
                }}
                width="40"
              />
            )}
          </div>
        ))}
        {/* Comment End */}
      </div>
      <CommentInput />
    </section>
  );
};

export default CommentSection;

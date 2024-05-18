import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Comment from "@/lib/models/comments";
import { formatDistance } from "date-fns";
import CommentInput from "./comment/comment_input";
import { unstable_noStore as noStore } from "next/cache";
import CommentImg from "./comment/comment_image";
import Link from "next/link";

const CommentSection = async () => {
  noStore();
  const comments = await Comment.findCouple(10, {
    expand: "user_id",
    sort: "-created",
  }).then((data) => data.items);
  return (
    <section className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-32">
      <div className="p-4 space-y-4">
        {comments.map((user, index) => (
          <Link
            className="flex items-start space-x-4  active:bg-gray-900 transition-all hover:bg-gray-900"
            key={index}
            href={`/threads/${user.id}`}
          >
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
              <CommentImg img_url={Comment.getImage(user, "image")} />
            )}
          </Link>
        ))}
        {/* Comment End */}
      </div>
      <CommentInput />
    </section>
  );
};

export default CommentSection;

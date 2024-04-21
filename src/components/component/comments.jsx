import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Comment from "@/lib/models/comments";
import { formatDistance } from "date-fns";

const CommentSection = async () => {
  const comments = await Comment.findCouple(5, {
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
                className="w-12 h-12 rounded-md object-cover"
                height="50"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "50/50",
                  objectFit: "cover",
                }}
                width="50"
              />
            )}
          </div>
        ))}
        {/* Comment End */}
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <Input
            className="flex-1 font-sans"
            placeholder="Type your message..."
          />
          <Button size="icon" variant="ghost">
            <PaperclipIcon className="w-5 h-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button size="icon" variant="ghost">
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

function PaperclipIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export default CommentSection;

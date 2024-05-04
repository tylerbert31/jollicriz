"use client";
import React from "react";
import Comment from "@/lib/models/comments";

function CommentImg({ img_url }) {
  return (
    <img
      alt="Image preview"
      onClick={() => {
        Comment.preview(img_url);
      }}
      className="w-12 h-12 rounded-md object-cover cursor-pointer hover:scale-105 transition-all"
      height="40"
      src={`${img_url}?thumb=0x48`}
      style={{
        aspectRatio: "50/50",
        objectFit: "cover",
      }}
      width="40"
    />
  );
}

export default CommentImg;

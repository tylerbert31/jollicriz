"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BrowserModel from "@/lib/models/browser_model";
import axios from "axios";
import { useRouter } from "next/navigation";

const CommentInput = () => {
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [img_src, setImageSrc] = useState(null);
  const [sending, setSending] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault;
    const form = new FormData();
    form.append("image", image);
    form.append("user_id", BrowserModel.getId());
    form.append("comment", comment);
    try {
      await axios
        .post("/api/comment", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setComment("");
          setImage(null);
          setImageSrc(null);
          setSending(false);
          router.refresh();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
      <form
        action={submit}
        onSubmit={() => setSending(true)}
        className="flex items-center space-x-2"
      >
        <Input
          className="flex-1 font-sans"
          placeholder="Type your message..."
          name="message"
          minLength={3}
          maxLength={100}
          required
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        {img_src && (
          <img
            src={img_src}
            alt="preview"
            onClick={() => {
              setImage(null);
              setImageSrc(null);
            }}
            className="max-h-10 rounded-md hover:opacity-50 transition-all cursor-pointer"
          />
        )}
        <input
          type="file"
          name="image"
          accept="image/jpeg, image/png, image/webp"
          id="image"
          className="hidden"
          onChange={handleFileChange}
        />
        {!img_src && (
          <label htmlFor="image">
            <span>
              <PaperclipIcon className="w-5 h-5 cursor-pointer" />
              <span className="sr-only">Attach file</span>
            </span>
          </label>
        )}
        {!sending ? (
          <Button size="icon" variant="ghost" type="submit">
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send message</span>
          </Button>
        ) : null}
      </form>
    </div>
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

export default CommentInput;

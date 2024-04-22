"use client";
import React from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import BrowserModel from "@/lib/models/browser_model";

const cookies = new Cookies();

function Logout({ children }) {
  const router = useRouter();
  const delCookie = () => {
    cookies.remove(BrowserModel.authCookieName);
    router.push("/");
  };
  return <div onClick={delCookie}>{children}</div>;
}

export default Logout;

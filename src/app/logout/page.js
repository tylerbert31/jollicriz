"use client";
import React, { useLayoutEffect } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import BrowserModel from "@/lib/models/browser_model";

const cookies = new Cookies();

const Logout = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    cookies.remove(BrowserModel.authCookieName);
    router.push("/");
  }, []);
  return <div></div>;
};

export default Logout;

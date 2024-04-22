import { Home } from "@/components/component/home";
import React from "react";
import Auth from "@/lib/models/auth";

const page = async () => {
  Auth.isNotLogged();
  Auth.getAuthData();
  return (
    <>
      <Home />
    </>
  );
};

export default page;

import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  redirect("/home");
  return <></>;
};

export default Page;

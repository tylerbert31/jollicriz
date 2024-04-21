import { Home } from "@/components/component/home";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

const page = () => {
  noStore();
  return (
    <>
      <Home />
    </>
  );
};

export default page;

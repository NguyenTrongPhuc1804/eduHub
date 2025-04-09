import SideBar from "@/components/layout/side-bar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" grid grid-cols-[300px_1fr]">
      <SideBar />
      <main className="flex-1 p-5 ">{children}</main>
    </div>
  );
};

export default Layout;

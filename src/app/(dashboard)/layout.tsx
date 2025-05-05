import SideBar from "@/components/layout/side-bar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper lg:grid lg:grid-cols-[300px_1fr]">
      <SideBar />
      <div></div>
      <main className="p-5 bg-gray-200 dark:bg-dark-2 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;

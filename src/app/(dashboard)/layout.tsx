import { MenuItem } from "@/components/common";
import SideBar from "@/components/layout/side-bar";
import { MENU_ITEMS } from "@/constants";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrapper lg:grid lg:grid-cols-[300px_1fr]">
      <SideBar />
      <ul className="flex p-3 bgDarkMod border-t borderDarkMod lg:hidden z-50 fixed bottom-0 left-0 w-full justify-center gap-5">
        {MENU_ITEMS.map((item, idx) => (
          <MenuItem
            key={idx}
            href={item.href}
            label={item.label}
            icon={item.icon}
            onlyIcon
          />
        ))}
      </ul>
      <div className=""></div>
      <main className="p-5 bg-gray-200 dark:bg-dark-2 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default Layout;

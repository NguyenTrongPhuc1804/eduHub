import React from "react";
import MenuItem from "../common/menu-item";
import { MENU_ITEMS } from "@/constants";
import { ModeToggle } from "../common/mod-toggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="p-5 border-r border-gray-200 dark:border-gray-200/25 bg-white dark:bg-dark-2 dark:text-white h-screen sticky top-0 ">
      <Link
        href="/"
        className="logo font-bold text-3xl mb-5 inline-flex items-center"
      >
        <p className="text-second">U</p>
        <span className=" ">cademy</span>
      </Link>
      <div className="text-black dark:text-white mb-5">
        <ModeToggle />
        <UserButton />
        <SignedIn>
          <SignedOut />
        </SignedIn>
      </div>
      <ul className="flex flex-col gap-2 ">
        {MENU_ITEMS.map((item) => (
          <MenuItem key={item.href} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;

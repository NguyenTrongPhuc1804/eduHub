"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

interface MenuItemProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  onlyIcon?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, label, icon, onlyIcon }) => {
  const pathName = usePathname();
  const isActive = pathName === href;

  return (
    <li className="w-full">
      <div
        className={`  rounded-md pl-2 p-3 w-full ${
          isActive
            ? "text-white bg-second svg-animation"
            : "hover:text-second hover:bg-second/10 text-black dark:text-white transition-all"
        }`}
      >
        <Link
          href={href}
          className="w-full flex items-center justify-center lg:justify-start"
        >
          {icon && <span className="lg:mr-2 ">{icon}</span>}

          {onlyIcon ?? label}
        </Link>
      </div>
    </li>
  );
};

export default MenuItem;

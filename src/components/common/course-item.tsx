import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconClock, IconEye, IconStar } from "../icons";

const CourseItem = () => {
  return (
    <div className="bg-white dark:bg-dark-2 dark:border-gray-200/10 border border-gray-300 p-4 rounded-2xl text-black">
      <Link href={"/"} className="h-[180px] block relative">
        <span className="absolute  inline-block px-3 py-1 rounded-full top-3 right-3 text-white  font-medium bg-green-500 text-xs">
          New
        </span>
        <Image
          alt="course"
          src={
            "https://images.unsplash.com/photo-1743041095820-3e09632071e1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          width={600}
          height={400}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width: 640px) 300vw, 100vw "
          priority
        />
      </Link>

      <div className="pt-4">
        <h3 className="text-lg font-bold  mb-5 text-dark-2 dark:text-white">
          Khoá học Nextjs pro xây dựng E-Learning system hoàn chỉnh
        </h3>
      </div>

      <div className="flex items-center gap-3 mb-5 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <IconEye className="size-4" />
          <span>1000</span>
        </div>

        <div className="flex items-center gap-1">
          <IconStar className="size-4" />
          <span>5.0</span>
        </div>

        <div className="flex items-center gap-1">
          <IconClock className="size-4" />
          <span>3h25</span>
        </div>

        <div className="ml-auto text-base text-second font-bold">
          <span>700.000</span>
        </div>
      </div>

      <Link
        href={"/"}
        className="flex justify-center items-center mt-10 rounded-lg bg-second text-white h-12 font-semibold"
      >
        Xem chi tiết
      </Link>
    </div>
  );
};

export default CourseItem;

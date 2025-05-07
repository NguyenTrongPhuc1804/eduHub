import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IconClock, IconEye, IconStar } from "../icons";
import { ICourse } from "@/database/course.model";

const CourseItem = ({ data }: { data: ICourse }) => {
  const { slug, title, image, views, rating, price } = data;

  return (
    <div className="bg-white relative dark:bg-dark-2 dark:border-gray-200/10 border border-gray-300 p-4 rounded-2xl text-black flex flex-col h-full">
      <Link href={"/"} className="h-[180px] block relative">
        <span className="absolute inline-block px-3 py-1 rounded-full top-3 right-3 text-white font-medium bg-green-500 text-xs">
          New
        </span>
        <Image
          alt="course"
          src={image || "/Defult_avatar.png"}
          width={600}
          height={400}
          className="w-full h-full object-cover rounded-lg"
          sizes="@media (min-width: 640px) 300vw, 100vw "
          priority
        />
      </Link>

      <div className="pt-4">
        <h3 className="text-lg font-bold mb-5 text-dark-2 dark:text-white line-clamp-2">
          {title}
        </h3>
      </div>

      <div className="flex items-center gap-3 mb-5 mt-auto text-sm text-gray-500 dark:text-gray-300">
        <div className="flex items-center gap-1">
          <IconEye className="size-4" />
          <span>{views}</span>
        </div>

        <div className="flex items-center gap-1">
          <IconStar className="size-4" />
          <span>{rating}</span>
        </div>

        <div className="flex items-center gap-1">
          <IconClock className="size-4" />
          <span>3h25</span>
        </div>

        <div className="ml-auto text-base text-second font-bold line-clamp-1">
          <span>{price?.toLocaleString() ?? 0} đ</span>
        </div>
      </div>
      <Link
        href={`/course/${slug}`}
        className="flex justify-center items-center rounded-lg bg-second text-white h-12 font-semibold w-full"
      >
        Xem chi tiết
      </Link>
    </div>
  );
};

export default CourseItem;

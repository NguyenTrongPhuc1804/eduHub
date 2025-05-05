import CourseUpdate from "@/components/course/course-update";
import Heading from "@/components/typography/heading";
import { SearchParams } from "@/interfaces/common/common.interface";
import { getCourseBySlug } from "@/lib/action/course.action";
import React from "react";

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = await searchParams;

  const findCourse = await getCourseBySlug({ slug: params.slug as string });

  return (
    <>
      <Heading className="">Cập nhật khoá học</Heading>
      {findCourse && <CourseUpdate data={findCourse} />}
    </>
  );
};

export default Page;

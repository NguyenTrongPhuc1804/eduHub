import PageNotFound from "@/app/not-found";
import CourseUpdate from "@/components/course/course-update";
import Heading from "@/components/typography/heading";
import { SearchParams } from "@/interfaces/common/common.interface";
import { getCourseBySlug } from "@/lib/action/course.action";
import React from "react";

const page = async (props: { searchParams: SearchParams }) => {
  const params = await props.searchParams;

  const findCourse = await getCourseBySlug({ slug: params.slug as string });

  if (!findCourse) return <PageNotFound />;
  return (
    <div>
      <Heading>Cập nhật khoá học</Heading>
      <CourseUpdate data={findCourse} />
    </div>
  );
};

export default page;
